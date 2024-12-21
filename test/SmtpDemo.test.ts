import nodemailer from "nodemailer";
import { testMailCredentials } from "./TestMailCredentials.ts";
import { createImapConnection } from "../src/Mail/Imap/ImapSimple.ts";

jest.setTimeout(60000);
describe("SMTP demo", () => {
    test("send and receive email", async () => {
        // Настройка SMTP-транспорта
        const transporter = nodemailer.createTransport({
            host: testMailCredentials.smtpCredentials.host,
            port: testMailCredentials.smtpCredentials.port,
            secure: testMailCredentials.smtpCredentials.secure,
            auth: {
                user: testMailCredentials.smtpCredentials.auth.user,
                pass: testMailCredentials.smtpCredentials.auth.password,
            },
        });

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

        // Ожидание получения письма
        const connection = await createImapConnection(testMailCredentials.imapCredentials);
        await connection.openBox("INBOX");

        const searchCriteria = ["UNSEEN"];
        const fetchOptions = { bodies: ["HEADER", "TEXT"], struct: true };

        const messages = await connection.search(searchCriteria, fetchOptions);
        const latestMessage = messages[messages.length - 1];
        console.log(latestMessage);

        expect(latestMessage.parts[0].body.subject[0]).toBe("Test Email");
        connection.end();
    });
});
