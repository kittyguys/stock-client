import { FC } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleNote } from "@src/features/stock/actions";

type Props = {
  route: string
};

const Nav: FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const handleToggleNote = () => { // TOOD: 切り替えを廃止する場合は削除
    dispatch(toggleNote())
  }
  switch (route) {
    case "/stock": {
      return (
        <Link key="stocks" href="/stocks/notes/create">
          <NormalLink>ノートを作成</NormalLink>
        </Link>
      )
    }
    default: {
      return (
        <Link key="stocks" href="/stocks">
          <NormalLink>Stocks</NormalLink>
        </Link>
      )
    }
  }
};

const NormalLink = styled.a`
  font-size: 1.6rem;
  white-space: nowrap;
  padding: 0 16px;
  &:hover {
    text-decoration: underline;
  }
`;

export default Nav;
