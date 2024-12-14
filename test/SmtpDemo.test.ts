import nodemailer from "nodemailer";
import imaps from "imap-simple";
import { testMailCredentials } from "./TestMailCredentials.ts";

test("send and receive email", async () => {
    jest.setTimeout(60000);

    // Настройка SMTP-транспорта
    const transporter = nodemailer.createTransport(testMailCredentials.smtpCredentials);

    // Определение письма
    const mailOptions = {
        from: `"${testMailCredentials.testerMailAddress.name}" <${testMailCredentials.testerMailAddress.address}>`,
        to: testMailCredentials.testerMailAddress.address,
        subject: "Test Email",
        text: "Hello, this is a test email!",
        html: "<b>Hello, this is a test email!</b>",
    };

    // Отправка письма
    await transporter.sendMail(mailOptions);

    // Настройка IMAP для получения почты
    const imapConfig = {
        imap: {
            user: testMailCredentials.imapCredentials.auth.user,
            password: testMailCredentials.imapCredentials.auth.pass,
            host: testMailCredentials.imapCredentials.host,
            port: testMailCredentials.imapCredentials.port,
            tls: testMailCredentials.imapCredentials.secure,
            authTimeout: 3000,
        },
    };

    // Ожидание получения письма
    const connection = await imaps.connect(imapConfig);
    await connection.openBox("INBOX");

    const searchCriteria = ["UNSEEN"];
    const fetchOptions = { bodies: ["HEADER", "TEXT"], struct: true };

    const messages = await connection.search(searchCriteria, fetchOptions);
    const latestMessage = messages[messages.length - 1];
    console.log(latestMessage);

    expect(latestMessage.parts[0].body.subject[0]).toBe("Test Email");
    connection.end();
});
