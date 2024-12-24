import * as React from "react";
import { styled } from "styled-components";

interface Message {
    id: string;
    addressTitle: string;
    subject: string;
    date: Date;
    body: string;
    unread: boolean;
}

interface MessageViewerProps {
    value: Message;
}

export function MessageViewer({ value }: MessageViewerProps): React.JSX.Element {
    return (
        <Root>
            <Header>
                <Subject>{value.subject}</Subject>
                <Date>{value.date.toLocaleDateString()}</Date>
            </Header>
            <Body>{value.body}</Body>
        </Root>
    );
}

const Root = styled.div`
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Subject = styled.h1`
    font-size: 1.5em;
    margin: 0;
`;

const Date = styled.div`
    font-size: 0.9em;
    color: #999;
`;

const Body = styled.div`
    font-size: 1em;
    line-height: 1.5;
    color: #333;
`;
