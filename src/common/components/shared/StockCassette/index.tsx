import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";
import Color from "@src/common/constants/color";

type Props = {
  className?: string;
  // TODO 型定義を types ファイルにまとめたい
  stock: {
    id: string;
    content: string;
    created_at?: Date | string;
  };
  note?: boolean;
  index: number;
};

const StockCassette: React.FC<Props> = ({
  className,
  stock,
  note,
  index
}: Props) => {
  const isDragDisabled = useSelector(
    ({ stocks }: any) => stocks.isDragDisabled
  );
  return (
    <Draggable
      draggableId={note ? "note_" + stock.id : stock.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => {
        return (
          <Wrapper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Box className={className} snapshot={snapshot} note={note}>
              <ContentHead>
                <DateText>
                  {stock.created_at === "now"
                    ? "now"
                    : // TODO サーバー側で SELECT して正規の created_at を返却するようにリファクタする
                      format(new Date(stock.created_at!), "M/d hh:mma")}
                </DateText>
                {/* <TimeText>更新日時: {stock.updated_at}</TimeText> */}
              </ContentHead>
              <Content>
                <Text dangerouslySetInnerHTML={{ __html: stock.content }} />
              </Content>
            </Box>
          </Wrapper>
        );
      }}
    </Draggable>
  );
};

type BoxProps = {
  snapshot?: { isDragging: boolean };
  note?: boolean;
};

const Wrapper = styled.div`
  padding: 6px 0;
  margin: 0 auto;
`;

const Box = styled.div<BoxProps>`
  padding: 8px 12px 12px 12px;
  border-radius: 8px;
  box-shadow: ${({ snapshot }) =>
    snapshot?.isDragging
      ? "0 3px 9px 0 rgba(0, 0, 0, 0.15)"
      : "0 1px 3px 0 rgba(0, 0, 0, 0.15)"};
  background-color: ${({ snapshot }) =>
    snapshot?.isDragging ? Color.HoverGray : "#fff"};
  transition: 0.3s width;
  &:hover {
    background-color: ${Color.HoverGray};
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.13);
    cursor: pointer;
  }
`;

const ContentHead = styled.div`
  display: flex;
  flex-wrap: nowrap;
  color: #616061;
  font-size: 1.3rem;
  margin-top: 4px;
`;

const DateText = styled.span`
  flex-shrink: 0;
  font-size: 1.2rem;
`;

const TimeText = styled.span`
  flex-shrink: 0;
  font-size: 1.2rem;
  margin-left: 4px;
`;

const Content = styled.div`
  margin-top: 12px;
`;

const Text = styled.div`
  margin-top: 4px;
  font-size: 1.6rem;
`;

export default StockCassette;
