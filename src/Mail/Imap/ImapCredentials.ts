export type ImapCredentials = {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        password: string;
    };
};
