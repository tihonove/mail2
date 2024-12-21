import * as React from "react";
import { HiInbox, HiMiniChevronRight, HiOutlineInbox } from "react-icons/hi2";
import { styled } from "styled-components";
import { theme } from "../Styles/Themes.ts";

interface FolderInfo {
    id: string;
    name: string;
    unreadMessageCount: number;
}

interface AccountInfo {
    id: string;
    name: string;
    folders: FolderInfo[];
}

interface AccountTreeProps {
    accounts: AccountInfo[];
}

export function AccountTree({ accounts }: AccountTreeProps) {
    return (
        <Root>
            {accounts.map((account) => (
                <Group key={account.id}>
                    <GroupTitle>
                        <GroupTitleChevron>
                            <HiMiniChevronRight />
                        </GroupTitleChevron>
                        {account.name}
                    </GroupTitle>
                    <GroupListRoot>
                        {account.folders.map((folder) => (
                            <Folder key={folder.id}>
                                <HiIcon icon={<HiOutlineInbox />} /> {folder.name} ({folder.unreadMessageCount})
                            </Folder>
                        ))}
                    </GroupListRoot>
                </Group>
            ))}
        </Root>
    );
}

function HiIcon({ icon }: { icon: React.JSX.Element }) {
    return <>{React.cloneElement(icon, { style: { marginBottom: -2 } })}</>;
}

const Root = styled.nav``;

const Group = styled.section``;

const GroupTitleChevron = styled.div`
    position: absolute;
    top: 0;
    left: 2px;
    bottom: 0;
    padding-top: 2px;
`;

const GroupTitle = styled.h3`
    position: relative;
    border-radius: 5px;
    font-size: 16px;
    line-height: 30px;
    padding-left: 20px;

    &:hover {
        background-color: ${theme.hoverBackground1};
    }
`;

const GroupListRoot = styled.ul``;

const Folder = styled.li`
    margin: 5px 0;
    font-size: 14px;
    border-radius: 5px;
    line-height: 30px;
    padding-left: 20px;

    &:hover {
        background-color: ${theme.hoverBackground1};
    }
`;
