import * as React from "react";
import { styled } from "styled-components";

interface Message {
    id: string;
    addressTitle: string;
    subject: string;
    date: Date;
    preview: string;
    unread: boolean;
}

interface MessageListProps {
    value: Message[];
    onClick?: () => void;
}

export function MessageList({ value, onClick }: MessageListProps): React.JSX.Element {
    return (
        <Root onClick={onClick}>
            {value.map((message) => (
                <MessageItem key={message.id} unread={message.unread}>
                    <Subject>{message.subject}</Subject>
                    <Preview>{message.preview}</Preview>
                    <Date>{message.date.toLocaleDateString()}</Date>
                </MessageItem>
            ))}
        </Root>
    );
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
`;

const MessageItem = styled.div<{ unread: boolean }>`
    padding: 10px;
    border-bottom: 1px solid #ccc;
    background-color: ${({ unread }) => (unread ? "#f5f5f5" : "#fff")};
`;

const Subject = styled.div`
    font-weight: bold;
`;

const Preview = styled.div`
    color: #666;
`;

const Date = styled.div`
    font-size: 0.8em;
    color: #999;
    text-align: right;
`;
