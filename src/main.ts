import { app, BrowserWindow } from "electron";
import { runAsyncAction } from "./Utils/AsyncUtils.ts";
import * as remote from "@electron/remote/main";

runAsyncAction(async function () {
    const createWindow = async () => {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            titleBarStyle: "hidden",
            // titleBarOverlay: true,
            webPreferences: {
                // sandbox: false,
                nodeIntegration: true,
                contextIsolation: false,
            },
        });

        remote.initialize();
        remote.enable(win.webContents);

        win.webContents.openDevTools();

        // win.setMenu(null);
        await win.loadFile("dist/index.html");
    };

    await app.whenReady();
    await createWindow();
});
