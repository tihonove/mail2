import { styled } from "styled-components";
import { TitleBar } from "./TitleBar.tsx";

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
                <Column1>Column 1</Column1>
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

const Column1 = styled.div`
    flex: 0 1 200px;
`;

const Column2 = styled.div`
    flex: 0 1 200px;
`;

const Column3 = styled.div`
    flex: 1 1 auto;
`;
