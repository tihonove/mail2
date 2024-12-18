import { MainWindow } from "./MainWindow.tsx";

export default { title: "MainWindow" };

export const Primary = () => (
    <MainWindow
        onMinimize={() => {
            console.log("Minimized");
        }}
        onMaximize={() => {
            console.log("Maximized");
        }}
        onClose={() => {
            console.log("Closed");
        }}
    />
);
