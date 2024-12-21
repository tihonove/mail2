import type { ImapSimple } from "imap-simple";
import { createImapConnection } from "../src/Mail/Imap/ImapSimple.ts";
import { testMailCredentials } from "./TestMailCredentials.ts";
import type { MailBoxes } from "imap";
import { AsyncIter } from "../src/Common/AsyncIter.tsx";

jest.setTimeout(30000);

describe("Imap syncronization", () => {
    test("List folders", async () => {
        const connection = await createImapConnection(testMailCredentials.imapCredentials);
        const folders = await AsyncIter.toArray(AsyncIter.from(getAllFolders(connection)));
        console.log(folders);
        expect(folders.length).toBeGreaterThan(0);
    });
});

export async function* getAllFolders(connection: ImapSimple): AsyncGenerator<string> {
    const boxes = await connection.getBoxes();
    const allFolders: string[] = [];

    for (const boxName in boxes) {
        yield boxName;
    }

    connection.end();
    return allFolders;
}
