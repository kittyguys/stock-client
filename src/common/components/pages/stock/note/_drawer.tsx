import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IoMdClose as BaseIconDrawerClose } from "react-icons/io";
import { toggleDrawer, changeActiveId } from "@src/features/stocks/actions";
import Color from "@src/common/constants/color";

type Props = {};

const Drawer: FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state: any) => state.stocks.isDrawerOpen);
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
        <DrawerItems isCurrent={true}>
          <Anchor
            onClick={() => {
              dispatch(changeActiveId());
            }}
          >
            <Span>#</Span>general
          </Anchor>
        </DrawerItems>
        <DrawerItems isCurrent={false}>
          <Anchor>
            <Span>#</Span>yasuda thread
          </Anchor>
        </DrawerItems>
        <DrawerItems isCurrent={false}>
          <Anchor>
            <Span>#</Span>karube thread
          </Anchor>
        </DrawerItems>
        <DrawerItems isCurrent={false}>
          <Anchor>
            <Span>#</Span>tokunaga thread
          </Anchor>
        </DrawerItems>
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
