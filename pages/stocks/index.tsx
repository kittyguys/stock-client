import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  DragDropContext,
  DropResult,
  DraggableLocation,
  resetServerContext
} from "react-beautiful-dnd";
import cookies from "next-cookies";
import jwt_decode from "jwt-decode";
import { signinSuccess } from "@src/features/auth/actions";
import { updateProfileSuccess } from "@src/features/profile/actions";
import Header from "@src/common/components/shared/Header";
import Color from "@src/common/constants/color";
import StockNote from "@src/common/components/shared/StockNote";
import { reorderStocks } from "@src/features/stocks/actions";
import { getStocksAsync, addStockAsync } from "@src/features/stocks/operations";

const Editor = dynamic(() => import("@src/common/components/shared/Editor"), {
  ssr: false
});

type Props = {};

type Stock = { id: string; content: string };

// TODO 型定義を types ファイルにまとめたい
type StockLists = {
  [stocks: string]: Stock[];
};

// TODO Redux データの配列を map する予定
const initialStockLists: StockLists = {
  stocks: Array.from({ length: 10 }, (v, k) => k).map(k => ({
    id: `id-${k}`,
    content: `Stock ${k}`
  })),
  noteStocks: []
};

type Reorder = (
  list: Stock[],
  startIndex: number,
  endIndex: number
) => {
  id: string;
  content: string;
}[];

const reorder: Reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: Stock[],
  destination: Stock[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [index: string]: Stock[] } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

const Stock: NextPage<Props> = () => {
  // SSR の場合にこの関数を使用する必要がある
  resetServerContext();

  const [stockLists, setStockLists] = useState(initialStockLists);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const isNoteOpen = useSelector((state: any) => state.stocks.isNoteEditing);
  const initialStocks = useSelector((state: any) => state.stocks.stocks);
  const [stocks, setStocks] = useState(
    initialStocks.map((v: any) => ({ id: "" + v.id, content: v.content }))
  );
  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  const id2List: {
    [index: string]: string;
  } = {
    droppable: "stocks",
    droppable2: "noteStocks"
  };

  const getList = (id: string) => stockLists[id2List[id]];

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const stocks = reorder(initialStocks, source.index, destination.index);
      const state: { [index: string]: Stock[] } = {};
      state[id2List[source.droppableId]] = stocks;
      setStockLists({
        ...stockLists,
        ...state
      });
      dispatch(reorderStocks(stocks));
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setStockLists({
        stocks: result.droppable,
        noteStocks: result.droppable2
      });
    }
  };

  useEffect(() => {
    if (initialStocks.length > 0) {
      setStocks(
        initialStocks.map((v: any) => ({ id: "" + v.id, content: v.content }))
      );
    }
  }, [initialStocks]);

  useEffect(() => {
    dispatch(getStocksAsync());
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

  const onSubmit = (e: any) => {
    const data = { content: inputValue };
    e.preventDefault();
    setInputValue("");
    dispatch(addStockAsync(data));
  };

  return (
    <>
      <Header route="/stock" />
      <StockWrap>
        <DragDropContext onDragEnd={onDragEnd}>
          {isNoteOpen && (
            <NoteContainer isNoteOpen editorWrapHeight={editorWrapHeight}>
              <StockNote
                noteName="Your Group Name"
                noteID="droppable"
                stocks={stocks}
                note
              />
            </NoteContainer>
          )}
          {stocks.length > 0 && (
            <Container
              isNoteOpen={isNoteOpen}
              editorWrapHeight={editorWrapHeight}
            >
              <StockNote
                noteName="Your Stocks"
                noteID="droppable2"
                stocks={stocks}
              />
            </Container>
          )}
        </DragDropContext>
      </StockWrap>
      <div ref={editorWrap}>
        <Editor
          handleSubmit={onSubmit}
          value={inputValue}
          setValue={setInputValue}
        />
      </div>
    </>
  );
};

Stock.getInitialProps = async (ctx: any) => {
  const allCookies = cookies(ctx);
  const token = allCookies.jwt;
  if (typeof token === "string") {
    const profile = jwt_decode(token);
    ctx.store.dispatch(signinSuccess());
    ctx.store.dispatch(updateProfileSuccess(profile));
  }
  return { store: ctx.store };
};

const StockWrap = styled.div`
  display: flex;
`;

const Container = styled.div<{
  editorWrapHeight: number;
  isNoteOpen: boolean;
}>`
  width: ${({ isNoteOpen }) => (isNoteOpen ? "50%" : "100%")};
  padding: 24px 0;
  background-color: #f7f7f7;
  [data-rbd-droppable-id] {
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

export default Stock;
