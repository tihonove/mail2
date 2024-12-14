export const testMailCredentials = {
    testerMailAddress: {
        name: "Tester",
        address: "testermailnew@yandex.ru",
    },

    smtpCredentials: {
        host: "smtp.yandex.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "testermailnew",
            pass: "rxpxwtypkcbldobx",
        },
    },

    imapCredentials: {
        host: "imap.ya.ru",
        port: 993,
        secure: true, // true for 993, false for other ports
        auth: {
            user: "testermailnew",
            pass: "rxpxwtypkcbldobx",
        },
    },
};

