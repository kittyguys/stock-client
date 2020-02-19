import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Toggle from "react-toggle";
import { IoIosList as BaseIconDrawerOpen } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import StockList from "@src/common/components/shared/StockList";
import { toggleDraggable } from "@src/features/stocks/actions";
import { Stock } from "@src/features/stocks/types";

type Props = {
  stocks: Stock[];
  noteName: string;
  noteID: string;
  editorWrapHeight?: number;
  editorHeightDiff?: number;
  note?: boolean;
};

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
  const [message, setMessage] = useState("");
  const [initialMsg, setInitialMsg] = useState("");
  const [isDragDisabled, isFetching] = useSelector(({ stocks }: any) => [
    stocks.isDragDisabled,
    stocks.isFetching
  ]);

  useEffect(() => {
    if (scrollArea.current !== null) {
      setScrollAreaHeight(prevHeight => {
        if (prevHeight === 0) {
          setIsInitialRendering(true);
        }
        return scrollArea.current!.clientHeight;
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

  const handleBaconChange = () => {
    dispatch(toggleDraggable());
  };

  useEffect(() => {
    if (isDragDisabled) {
      setMessage("ドラッグ・アンド・ドロップで並び替えがオフです");
    } else {
      setMessage("ドラッグ・アンド・ドロップで並び替えがオンです");
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [isDragDisabled]);

  useEffect(() => {
    setInitialMsg(
      "メモがありません！下の入力フォームからメモを送信してみましょう！"
    );
  }, []);

  return (
    <>
      <SwitchContainer>
        <Message>{message}</Message>
        <Toggle defaultChecked={!isDragDisabled} onChange={handleBaconChange} />
      </SwitchContainer>
      {stocks.length === 0 && !isFetching ? (
        <div className="scrollArea" ref={scrollArea}>
          <EmptyMessage>{initialMsg}</EmptyMessage>
        </div>
      ) : (
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
      )}
    </>
  );
};

const EmptyMessage = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const SwitchContainer = styled.div`
  display: flex;
  color: #555;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 12px;
  justify-content: flex-end;
  padding: 0 6% 0 5%;
`;

const Message = styled.span`
  font-size: 1.6rem;
  padding-right: 24px;
`;

const DroppableInner = styled.div`
  min-height: 100%;
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
