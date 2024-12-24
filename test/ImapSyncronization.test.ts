import type { ImapSimple } from "imap-simple";
import { createImapConnection } from "../src/Mail/Imap/ImapSimple.ts";
import { testMailCredentials } from "./TestMailCredentials.ts";
import { AsyncIter } from "../src/Common/AsyncIter.tsx";
import type { ImapCredentials } from "../src/Mail/Imap/ImapCredentials.ts";
import * as os from "os";
import { mkdtemp, rmdir, readdir, mkdir } from "fs/promises";
import * as path from "path";

jest.setTimeout(30000);

async function createTempDir(): Promise<[string, () => Promise<void>]> {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "test-"));
    return [
        tempDir,
        async () => {
            await rmdir(tempDir, { recursive: true });
        },
    ];
}

describe("Imap syncronization", () => {
    test("Sync with empty folder", async () => {
        const [tempAccountDir, dropTempAccountDir] = await createTempDir();
        console.log(tempAccountDir);
        const storageDir = path.join(tempAccountDir, "storage");
        await mkdir(storageDir, { recursive: true });
        const syncStateDir = path.join(tempAccountDir, "sync");
        await mkdir(syncStateDir, { recursive: true });

        const imapCredentials = testMailCredentials.imapCredentials;
        const synchronizer = new ImapSynchronizer(storageDir, syncStateDir, imapCredentials);
        const changes = await AsyncIter.toArray(AsyncIter.from(synchronizer.synchronizeAccount()));
        console.log(changes);

        await dropTempAccountDir();
    });
});

type AccountChange = {
    type: "added" | "removed";
    folder: string;
};

class ImapSynchronizer {
    private storageDir: string;
    private syncStateDir: string;
    private imapCredentials: ImapCredentials;

    constructor(storageDir: string, syncStateDir: string, imapCredentials: ImapCredentials) {
        this.storageDir = storageDir;
        this.syncStateDir = syncStateDir;
        this.imapCredentials = imapCredentials;
    }

    public async *synchronizeAccount(): AsyncGenerator<AccountChange> {
        const connection = await createImapConnection(this.imapCredentials);
        const remoteFolders = await AsyncIter.toArray(AsyncIter.from(this.getImapFolders(connection)));
        const localFolders = await this.getLocalFolders();

        const addedFolders = remoteFolders.filter((folder) => !localFolders.includes(folder));
        const removedFolders = localFolders.filter((folder) => !remoteFolders.includes(folder));

        for (const folder of addedFolders) {
            yield { type: "added", folder };
        }

        for (const folder of removedFolders) {
            yield { type: "removed", folder };
        }
    }

    private async getLocalFolders(): Promise<string[]> {
        const folders = await readdir(this.storageDir, { withFileTypes: true });
        return folders.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
    }

    private async *getImapFolders(connection: ImapSimple): AsyncGenerator<string> {
        const boxes = await connection.getBoxes();
        const allFolders: string[] = [];

        for (const boxName in boxes) {
            yield boxName;
        }

        connection.end();
        return allFolders;
    }
}
