import { styled } from "styled-components";
import { HiMinus, HiSquare2Stack, HiXMark } from "react-icons/hi2";
import { step, theme } from "../Styles/Themes.ts";

interface Props {
    onMinimize: () => void;
    onMaximize: () => void;
    onClose: () => void;
}

export function TitleBar({ onMinimize, onMaximize, onClose }: Props): React.JSX.Element {
    return (
        <TitleBarContainer>
            <Title>Mail2</Title>
            <TitlebarSpacer />
            <TitleBarWindowButtons>
                <TitleBarButton onClick={onMinimize}>
                    <HiMinus size={18} />
                </TitleBarButton>
                <TitleBarButton onClick={onMaximize}>
                    <HiSquare2Stack size={18} />
                </TitleBarButton>
                <TitleBarButton onClick={onClose}>
                    <HiXMark size={18} />
                </TitleBarButton>
            </TitleBarWindowButtons>
        </TitleBarContainer>
    );
}

const TitlebarSpacer = styled.div`
    flex: 1 1 100%;
`;

const TitleBarWindowButtons = styled.div`
    flex-shrink: 0;
    -webkit-app-region: no-drag;
`;

const TitleBarButton = styled.button`
    height: ${step(8)};
    width: ${step(8)};
    border: 0;
    background-color: transparent;
    color: ${theme.titleBar.color};

    &:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }

    &:active {
        background-color: rgba(255, 255, 255, 0.25);
    }
`;

const TitleBarContainer = styled.div`
    height: 40px;
    background-color: ${theme.titleBar.background};
    color: ${theme.titleBar.color};
    display: flex;
    align-items: center;
    -webkit-app-region: drag;
    user-select: none;
`;

const Title = styled.h1`
    flex-shrink: 0;
    padding-left: ${step(2)};
`;
