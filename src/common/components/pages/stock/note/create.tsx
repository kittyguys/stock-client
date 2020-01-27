import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  DragDropContext,
  DropResult,
  resetServerContext
} from "react-beautiful-dnd";
import { States } from "@src/app/types";
import { Stock, StockLists } from "@src/common/components/pages/stock/types";
import { move, reorder } from "@src/common/components/pages/stock/funcs";
import Color from "@src/common/constants/color";
import StockNote from "@src/common/components/shared/StockNote";
import {
  getStocksAsync,
  createStockAsync,
  reorderStocksAsync
} from "@src/features/stocks/operations";
import { getNoteAsync, createNoteAsync } from "@src/features/notes/operations";
import Drawer from "./_drawer";

const Editor = dynamic(() => import("@src/common/components/shared/Editor"), {
  ssr: false
});

// TODO Redux データの配列を map する予定
const initialStockLists: StockLists = {
  stocks: [],
  noteStocks: []
  // noteStocks: Array.from({ length: 10 }, (v, k) => k).map(k => ({
  //   id: `id-${k}`,
  //   content: `Stock ${k}`,
  //   created_at: new Date()
  // }))
};

const StockNoteCreate: React.FC = () => {
  // SSR の場合にこの関数を使用する必要がある
  resetServerContext();

  const [stockLists, setStockLists] = useState(initialStockLists);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const stocks = useSelector((state: States) => state.stocks.stocks);

  const id2List: {
    [index: string]: string;
  } = {
    droppable2: "stocks",
    droppable: "noteStocks"
  };

  const getList = (id: string) => stockLists[id2List[id]];

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      if (result.destination.index === result.source.index) {
        return;
      }
      const stocks = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      const state: { [index: string]: Stock[] } = {};
      state[id2List[source.droppableId]] = stocks;
      setStockLists({
        ...stockLists,
        ...state
      });
    } else {
      const preDroppedStocks = getList(destination.droppableId);
      if (preDroppedStocks.length < 1) {
        dispatch(createNoteAsync("untitled"));
      }
      const result = move(stocks, preDroppedStocks, source, destination);
      console.log(stocks[source.index].content);

      // dispatch(createStockAsync({ content: "" }));

      setStockLists({
        stocks: stocks,
        noteStocks: result.droppable
      });
    }
  };

  useEffect(() => {
    if (stocks.length < 1) {
      dispatch(getStocksAsync());
    }
  }, []);

  const [editorWrapHeight, setEditorWrapHeight] = useState(121);
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

  return (
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

          <NoteContainer editorWrapHeight={editorWrapHeight}>
            <StockNote
              noteName="Your Group Name"
              noteID="droppable"
              stocks={stockLists.noteStocks}
              editorWrapHeight={editorWrapHeight}
              note
            />
          </NoteContainer>
        </DragDropContext>
        <Drawer />
      </StockWrap>
      <div ref={editorWrap}>
        <Editor
          onClickSubmit={e => {
            e.preventDefault();
          }}
          handleSubmit={e => e.preventDefault}
          value={inputValue}
          setValue={setInputValue}
        />
      </div>
    </>
  );
};

const StockWrap = styled.div`
  display: flex;
  position: relative;
  max-width: 1440px;
  overflow: hidden;
`;

const Container = styled.div<{ editorWrapHeight: number }>`
  width: 50%;
  padding: 24px 0;
  background-color: #f7f7f7;
  transition-duration: 1000;
  .scrollArea {
    height: ${({ editorWrapHeight }) =>
      `calc(100vh - ${editorWrapHeight}px - 84px - 84px)`};
    padding: 0 24px;
    margin-top: 6px;
    overflow: auto;
  }
`;

const NoteContainer = styled(Container)`
  background-color: ${Color.Brand[500]};
`;

export default StockNoteCreate;
