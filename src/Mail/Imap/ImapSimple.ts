import { ImapSimple, connect } from "imap-simple";
import { ImapCredentials } from "./ImapCredentials.ts";

export async function createImapConnection(credentials: ImapCredentials): Promise<ImapSimple> {
    const config = {
        imap: {
            user: credentials.auth.user,
            password: credentials.auth.password,
            host: credentials.host,
            port: credentials.port,
            tls: credentials.secure,
            authTimeout: 3000,
        },
    };
    return await connect(config);
}
