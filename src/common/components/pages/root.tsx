import dynamic from "next/dynamic";
import { useState, useEffect, useCallback, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  DragDropContext,
  DropResult,
  resetServerContext
} from "react-beautiful-dnd";
import { reorder } from "@src/common/components/pages/stock/funcs";
import StockNote from "@src/common/components/shared/StockNote";
import { DeleteStockModal } from "@src/common/components/shared/Modals/deleteStock";
import {
  getStocksAsync,
  createStockAsync,
  reorderStocksAsync
} from "@src/features/stocks/operations";
import { reorderStocks } from "@src/features/stocks/actions";
import { States } from "@src/app/types";
import { State } from "@src/features/stocks/types";

const Editor = dynamic(() => import("@src/common/components/shared/Editor"), {
  ssr: false
});

const StockNoteCreate: React.FC = () => {
  // SSR の場合にこの関数を使用する必要がある
  resetServerContext();

  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const stocks = useSelector<States, State["stocks"]>(
    ({ stocks }) => stocks.stocks
  );
  const isDeleteModelOpen = useSelector<States, State["isDeleteModalOpen"]>(
    ({ stocks }) => stocks.isDeleteModalOpen
  );

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

  const [editorWrapHeight, setEditorWrapHeight] = useState(117);
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const data = { content: inputValue };
    e.preventDefault();
    setInputValue("");
    dispatch(createStockAsync(data));
  };

  return (
    <Root>
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
      <div ref={editorWrap}>
        <Editor
          handleSubmit={onSubmit}
          value={inputValue}
          setValue={setInputValue}
        />
      </div>
      {isDeleteModelOpen && <DeleteStockModal />}
    </Root>
  );
};

const Root = styled.div`
  position: relative;
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

export default StockNoteCreate;
