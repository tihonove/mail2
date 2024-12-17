import { styled } from "styled-components";

export function MainWindow(): React.JSX.Element {
    return (
        <Root>
            <TitleBar></TitleBar>
            <Content>
                <Column1>Column 1</Column1>
                <Column2>Column 2</Column2>
                <Column3>Column 3</Column3>
            </Content>
        </Root>
    );
}

function TitleBar(): React.JSX.Element {
    return (
        <TitleBarContainer>
            <Title>My Application</Title>
        </TitleBarContainer>
    );
}

const TitleBarContainer = styled.div`
    height: 30px;
    background-color: ${(props) => props.theme.titleBar.background};
    color: ${(props) => props.theme.titleBar.color};
    display: flex;
    align-items: center;
    padding: 0 20px;
`;

const Title = styled.h1`
    margin: 0;
`;

const Root = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
