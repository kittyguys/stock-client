import * as React from "react";
import styled from "styled-components";
import StockCassette from "../StockCassette";
import { Stock } from "@src/features/stocks/types";

type Props = {
  stocks: Stock[];
  note?: boolean;
  className?: string;
};

const StockList = React.memo(({ stocks, note, className }: Props) => (
  <List className={className}>
    {stocks.map((stock: Stock, index: number) => (
      <StockCassette
        stock={stock}
        index={index}
        key={note ? `note_${stock.id}` : stock.id}
        note={note}
      />
    ))}
  </List>
));

const List = styled.div``;

export default StockList;
