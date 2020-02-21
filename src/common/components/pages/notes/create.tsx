import dynamic from "next/dynamic";
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
import Drawer from "@src/common/components/pages/notes/_drawer";
import { Stock } from "@src/common/components/pages/stock/types";
import { States } from "@src/app/types";
import { State as StocksState } from "@src/features/stocks/types";
import { State as NotesState } from "@src/features/notes/types";

const Editor = dynamic(() => import("@src/common/components/shared/Editor"), {
  ssr: false
});

const StockNoteCreate: React.FC = () => {
  // SSR の場合にこの関数を使用する必要がある
  resetServerContext();

  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const stocks = useSelector<States, StocksState["stocks"]>(
    ({ stocks }) => stocks.stocks
  );
  const notes = useSelector<States, NotesState["notes"]>(
    ({ notes }) => notes.notes
  );
  const note = useSelector<States, NotesState["note"]>(
    ({ notes }) => notes.note
  );

  const isNote = (id: string) => id === "note";
  const getList = (id: string) => (isNote(id) ? note.stocks : stocks);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceStocks = getList(source.droppableId);
    const destinationStocks = getList(destination.droppableId);

    if (source.droppableId === destination.droppableId) {
      if (source.index === destination?.index) {
        return;
      }

      const reorderedStocks = reorder(
        sourceStocks,
        source.index,
        destination.index
      );

      if (isNote(source.droppableId)) {
        dispatch(
          reorderNoteAsync({
            note_id: note.id,
            stocks: reorderedStocks
          })
        );
      } else {
        dispatch(reorderStocksAsync(reorderedStocks));
        dispatch(reorderStocks(reorderedStocks));
      }
      return;
    } else {
      // 他のカラムへ移動した時
      if (isNote(source.droppableId)) {
        return;
      }

      if (destinationStocks.length < 1) {
        // 移動先のカラムに stock が一つもなかったら
        dispatch(
          createNoteAndAddStockAsync({
            title: "untitled",
            stock: sourceStocks[source.index]
          })
        );
        return;
      } else {
        const isDuplicate = note.stocks.some(({ id }: { id: Stock["id"] }) => {
          return id.toString() === sourceStocks[source.index].id.toString();
        });
        if (isDuplicate) {
          return;
        }
      }

      const result = move(sourceStocks, destinationStocks, source, destination);

      dispatch(
        addStockToNoteAsync({
          note_id: note.id,
          stock_id: sourceStocks[source.index].id
        })
      );

      dispatch(
        reorderNoteAsync({
          note_id: note.id,
          stocks: result.note
        })
      );

      dispatch(getNoteAsync(note.id));
    }
  };

  useEffect(() => {
    dispatch(getNotesAsync());
    dispatch(getStocksAsync());
  }, []);

  useEffect(() => {
    if (notes.length && note.id === "") {
      dispatch(getNoteAsync(notes[0].id));
    }
  }, [notes]);

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

  return (
    <>
      <StockWrap>
        <DragDropContext onDragEnd={onDragEnd}>
          <Container editorWrapHeight={editorWrapHeight}>
            <StockNote
              noteName="Your Stocks"
              noteID="stocks"
              stocks={stocks}
              editorWrapHeight={editorWrapHeight}
            />
          </Container>

          <NoteContainer editorWrapHeight={editorWrapHeight}>
            <StockNote
              noteName="Your Group Name"
              noteID="note"
              stocks={note.stocks}
              editorWrapHeight={editorWrapHeight}
              note
            />
          </NoteContainer>
        </DragDropContext>
        <Drawer />
      </StockWrap>
      <div ref={editorWrap}>
        <Editor
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
    margin-top: 6px;
    overflow: hidden;
    padding: 0 5%;
  }
`;

const NoteContainer = styled(Container)`
  background-color: ${Color.Brand[500]};
`;

export default StockNoteCreate;
