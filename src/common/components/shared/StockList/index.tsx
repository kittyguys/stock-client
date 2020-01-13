import * as React from "react";
import styled from "styled-components";
import StockCassette from "../StockCassette";

// TODO 型定義を types ファイルにまとめたい
type Stock = { id: string; content: string; created_at: Date | string };

type Props = {
  stocks: Stock[];
  note?: boolean;
  className?: string;
};

const StockList = React.memo(({ stocks, note, className }: Props) => (
  <List className={className}>
    {stocks.map((stock: Stock, index: number) => (
      <StockCassette stock={stock} index={index} key={stock.id} note={note} />
    ))}
  </List>
));

const List = styled.div``;

export default StockList;
