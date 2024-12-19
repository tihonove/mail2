import { styled } from "styled-components";
import { TitleBar } from "./TitleBar.tsx";
import { AccountTree } from "./AccountTree.tsx";
import { step } from "../Styles/Themes.ts";

interface MainWindowProps {
    onMinimize: () => void;
    onMaximize: () => void;
    onClose: () => void;
}

export function MainWindow(props: MainWindowProps): React.JSX.Element {
    const { onMinimize, onMaximize, onClose } = props;

    return (
        <Root>
            <TitleBar onMinimize={onMinimize} onMaximize={onMaximize} onClose={onClose} />
            <TransparentOverlay />
            <Content>
                <AccountTreeColumn>
                    <AccountTree
                        accounts={[
                            {
                                id: "1",
                                name: "Kontur",
                                folders: [
                                    { id: "Inbox", name: "Inbox", unreadMessageCount: 1 },
                                    { id: "Sent", name: "Sent", unreadMessageCount: 0 },
                                ],
                            },
                            {
                                id: "2",
                                name: "Hotmail",
                                folders: [
                                    { id: "Inbox", name: "Inbox", unreadMessageCount: 0 },
                                    { id: "Sent", name: "Sent", unreadMessageCount: 0 },
                                ],
                            },
                        ]}
                    />
                </AccountTreeColumn>
                <Column2>Column 2</Column2>
                <Column3>Column 3</Column3>
            </Content>
        </Root>
    );
}

const Root = styled.div`
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const TransparentOverlay = styled.div`
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.4);
`;

const Content = styled.div`
    display: flex;
`;

const AccountTreeColumn = styled.div`
    flex: 0 1 200px;
    padding: ${step(2)};
`;

const Column2 = styled.div`
    flex: 0 1 200px;
`;

const Column3 = styled.div`
    flex: 1 1 auto;
`;
