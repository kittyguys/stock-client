import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  DragDropContext,
  DropResult,
  resetServerContext
} from "react-beautiful-dnd";
import { move, reorder } from "@src/common/components/pages/stock/funcs";
import Color from "@src/common/constants/color";
import StockNote from "@src/common/components/shared/StockNote";
import {
  getStocksAsync,
  createStockAsync,
  reorderStocksAsync
} from "@src/features/stocks/operations";
import { reorderStocks } from "@src/features/stocks/actions";
import {
  getNotesAsync,
  getNoteAsync,
  createNoteAsync,
  addStockToNoteAsync,
  createNoteAndAddStockAsync,
  reorderNoteAsync
} from "@src/features/notes/operations";

const Notes: React.FC = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ notes }: any) => notes.notes);

  const noteList = notes.map((item: any) => {
    return (
      <Link href={`/notes/${item.id}`} key={item.id}>
        <LinkStyle>
          <Item>{item.title} </Item>
        </LinkStyle>
      </Link>
    );
  });
  useEffect(() => {
    dispatch(getNotesAsync());
  }, []);

  return (
    <NoteWrapper>
      <NoteList>{noteList}</NoteList>
    </NoteWrapper>
  );
};

const NoteWrapper = styled.div`
  width: 1080px;
  margin: 16px auto;
`;

const NoteList = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  font-size: 2rem;
  width: 100%;
  padding: 8px 12px 12px 12px;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  background-color: #fff;
  -webkit-transition: 0.3s width;
  transition: 0.3s width;
  margin-bottom: 16px;
`;

const LinkStyle = styled.a`
  color: #333;
  text-decoration: none;
`;

export default Notes;
