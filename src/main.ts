import { app, BrowserWindow } from "electron";
import { runAsyncAction } from "./Utils/AsyncUtils.ts";

runAsyncAction(async function () {
    const createWindow = async () => {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
            },
        });

        win.setMenu(null);
        await win.loadFile("dist/index.html");
    };

    await app.whenReady();
    await createWindow();
});
