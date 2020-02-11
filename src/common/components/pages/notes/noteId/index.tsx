import dynamic from "next/dynamic";
import { useRouter } from "next/router";
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
import { States } from "@src/app/types";
import { State } from "@src/features/notes/types";

const Editor = dynamic(() => import("@src/common/components/shared/Editor"), {
  ssr: false
});

const Notes: React.FC = () => {
  // SSR の場合にこの関数を使用する必要がある
  resetServerContext();

  const [isSignin, setIsSignin] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const note = useSelector<States, State["note"]>(({ notes }) => notes.note);
  const router = useRouter();
  const stocks = note.stocks;

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.index === destination.index) {
      return;
    }

    const reorderedStocks = reorder(stocks, source.index, destination.index);

    dispatch(reorderStocks(reorderedStocks));
    dispatch(reorderStocksAsync(reorderedStocks));
  };

  useEffect(() => {
    if (stocks.length < 1) {
      dispatch(getStocksAsync());
    }
  }, []);

  const [editorWrapHeight, setEditorWrapHeight] = useState(0);
  const editorWrap = useCallback(
    node => {
      if (node !== null) {
        const _editorWrapHeight = node.getBoundingClientRect().height;
        if (_editorWrapHeight > 0) {
          setEditorWrapHeight(_editorWrapHeight);
        }
      }
    },
    [inputValue]
  );

  const onSubmit = (e: any) => {
    const data = { content: inputValue };
    e.preventDefault();
    setInputValue("");
    dispatch(createStockAsync(data));
  };

  useEffect(() => {
    dispatch(getNoteAsync("" + router.query.noteId));
  }, []);

  return (
    <>
      {isSignin ? (
        <>
          <StockWrap>
            <DragDropContext onDragEnd={onDragEnd}>
              <Container editorWrapHeight={editorWrapHeight}>
                <StockNote
                  noteName="Your Stocks"
                  noteID="droppable2"
                  stocks={stocks}
                  editorWrapHeight={editorWrapHeight}
                />
              </Container>
            </DragDropContext>
          </StockWrap>
        </>
      ) : (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Container editorWrapHeight={editorWrapHeight}>
              <StockNote
                noteName="Your Stocks"
                noteID="droppable2"
                stocks={stocks}
                editorWrapHeight={editorWrapHeight}
              />
            </Container>
          </DragDropContext>
        </>
      )}
    </>
  );
};

const StockWrap = styled.div`
  display: flex;
`;

const Container = styled.div<{
  editorWrapHeight: number;
}>`
  width: 100%;
  padding: 24px 0;
  background-color: #f7f7f7;
  .scrollArea {
    height: ${({ editorWrapHeight }) =>
      `calc(100vh - ${editorWrapHeight}px - 84px - 84px)`};
    margin-top: 6px;
    overflow: auto;
    padding: 0 5%;
  }
`;

export default Notes;
