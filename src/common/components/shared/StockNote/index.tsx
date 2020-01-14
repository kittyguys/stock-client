import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { IoIosList as BaseIconDrawerOpen } from "react-icons/io";
import StockList from "@src/common/components/shared/StockList";
import { toggleDrawer } from "@src/features/stocks/actions";
import { useDispatch } from "react-redux";

type Props = {
  stocks: Stock[];
  noteName: string;
  noteID: string;
  editorWrapHeight?: number;
  editorHeightDiff?: number;
  note?: boolean;
};

type Stock = { id: string; content: string; created_at: Date | string };

const StockNote: React.FC<Props> = ({
  stocks,
  noteName,
  noteID,
  editorWrapHeight,
  note
}) => {
  const dispatch = useDispatch();
  const scrollArea = useRef<HTMLDivElement>(null);
  const scrolledArea = useRef<HTMLDivElement>(null);
  const [scrollAreaHeight, setScrollAreaHeight] = useState(0);
  const [scrolledAreaHeight, setScrolledAreaHeight] = useState(0);
  const [isInitialRendering, setIsInitialRendering] = useState(false);

  useEffect(() => {
    if (scrollArea.current !== null) {
      setScrollAreaHeight(prevHeight => {
        if (prevHeight === 0) {
          setIsInitialRendering(true);
        }
        return scrollArea.current.clientHeight;
      });
    }
    if (scrolledArea.current !== null) {
      setScrolledAreaHeight(scrolledArea.current.clientHeight);
    }
  }, [stocks, editorWrapHeight]);

  // 初回レンダリング時と新規投稿時に一番下にスクロールする
  useEffect(() => {
    if (scrollArea.current !== null) {
      scrollArea.current.scrollTo({
        top: scrolledAreaHeight,
        left: scrollArea.current.scrollLeft,
        // 初回レンダリング時はスムーズスクロールにしない
        behavior: isInitialRendering ? "auto" : "smooth"
      });
      if (scrolledAreaHeight > 0) {
        setIsInitialRendering(false);
      }
    }
  }, [scrolledAreaHeight]);

  // stock エリアを一番下にスクロールした状態で Editor の高さが変わっても
  // 常に一番下の状態にする
  useEffect(() => {
    if (scrollArea.current !== null) {
      const currentScrollBottom =
        scrollArea.current.scrollTop + scrollAreaHeight;
      if (currentScrollBottom >= scrolledAreaHeight) {
        scrollArea.current.scrollTo(0, scrolledAreaHeight);
      }
    }
  }, [editorWrapHeight]);

  return (
    <>
      <NoteName>
        {noteName}
        {note && (
          <IconDrawerOpen
            onClick={() => dispatch(toggleDrawer())}
            size={28}
            color="#fff"
          />
        )}
      </NoteName>
      <Droppable droppableId={noteID}>
        {provided => {
          return (
            <div className="scrollArea" ref={scrollArea}>
              <DroppableInner
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div ref={scrolledArea}>
                  <StockList stocks={stocks} note={note} />
                  {provided.placeholder}
                </div>
              </DroppableInner>
            </div>
          );
        }}
      </Droppable>
    </>
  );
};

const NoteName = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #555;
  font-weight: bold;
  font-size: 2rem;
  margin: 0 24px;
`;

const DroppableInner = styled.div`
  height: 100%;
`;

const IconDrawerOpen = styled(BaseIconDrawerOpen)`
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

export default StockNote;
