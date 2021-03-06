import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IoMdClose as BaseIconDrawerClose } from "react-icons/io";
import { toggleDrawer } from "@src/features/stocks/actions";
import { switchActiveId } from "@src/features/notes/actions";
import Color from "@src/common/constants/color";
import { States } from "@src/app/types";
import { State as StocksState } from "@src/features/stocks/types";
import { State as NotesState } from "@src/features/notes/types";

type Props = {};

const Drawer: FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector<States, StocksState["isDrawerOpen"]>(
    ({ stocks }) => stocks.isDrawerOpen
  );
  const activeId = useSelector<States, NotesState["activeId"]>(
    ({ notes }) => notes.activeId
  );
  // TODO notes一覧完成後削除
  const tmpList = [
    {
      id: "1",
      title: "general"
    },
    {
      id: "2",
      title: "random"
    },
    {
      id: "3",
      title: "times_orita"
    }
  ];
  return (
    <Root isDrawerOpen={isDrawerOpen}>
      <Title>
        Select a Note
        <IconDrawerClose
          size={28}
          color="#555"
          onClick={() => {
            dispatch(toggleDrawer());
          }}
        />
      </Title>
      <DrawerWrapper>
        {tmpList.map(item => (
          <DrawerItems isCurrent={item.id === activeId} key={item.id}>
            <Anchor
              onClick={() => {
                dispatch(switchActiveId(item.id));
              }}
            >
              <Span>#</Span>
              {item.title}
            </Anchor>
          </DrawerItems>
        ))}
      </DrawerWrapper>
    </Root>
  );
};

const Root = styled.div<{ isDrawerOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  transition: 0.3s ease;
  transform: translate(
    ${({ isDrawerOpen }) => (isDrawerOpen ? "0%" : "100%")},
    0
  );
  width: 300px;
  height: 100%;
  padding: 24px 0;
  background-color: ${Color.Brand[700]};
  box-shadow: -1px 0 2px rgba(0, 0, 0, 0.16);
`;

const Title = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #555;
  font-weight: bold;
  font-size: 2rem;
  margin: 0 24px;
`;

const IconDrawerClose = styled(BaseIconDrawerClose)`
  cursor: pointer;
  transition: 0.16s ease;
  :hover {
    transform: scale(1.12);
  }
  :active {
    transform: scale(0.92);
    transition: 0.04s ease;
  }
`;

const DrawerWrapper = styled.ul`
  margin-top: 16px;
  list-style: none;
`;

const DrawerItems = styled.li<{ isCurrent: Boolean }>`
  line-height: 1.4;
  background-color: ${({ isCurrent }) => (isCurrent ? `aqua` : ``)};
`;

const Span = styled.span`
  padding-right: 8px;
`;

const Anchor = styled.a`
  font-size: 2rem;
  font-weight: 100;
  display: block;
  padding: 2px 24px;
  text-decoration: inherit;
`;

export default Drawer;
