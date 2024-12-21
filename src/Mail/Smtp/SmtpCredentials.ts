export type SmtpCredentials = {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        password: string;
    };
};
