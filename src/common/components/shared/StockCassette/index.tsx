import dynamic from "next/dynamic";
import { useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";
import {
  IoMdCreate as IconEdit,
  IoMdTrash as IconRemove
} from "react-icons/io";
import Color from "@src/common/constants/color";
import { selectStock, openDeleteModal } from "@src/features/stocks/actions";
import { updateStockAsync } from "@src/features/stocks/operations";

const Editor = dynamic(() => import("@src/common/components/shared/Editor"), {
  ssr: false
});

type Props = {
  className?: string;
  // TODO 型定義を types ファイルにまとめたい
  stock: {
    id: string;
    content: string;
    created_at?: Date | string;
    updated_at?: Date | string;
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
  const dispatch = useDispatch();
  const isDragDisabled = useSelector(
    ({ stocks }: any) => stocks.isDragDisabled
  );

  const removeStock = (id: string) => {
    dispatch(selectStock(id));
    dispatch(openDeleteModal());
  };

  const [isEditable, setIsEditable] = useState(false);

  const [inputValue, setInputValue] = useState(stock.content);

  const onSubmit = (e: FormEvent) => {
    const data = { stockId: stock.id, content: inputValue };
    e.preventDefault();
    setIsEditable(false);
    dispatch(updateStockAsync(data));
  };

  return (
    <Draggable
      draggableId={note ? "note_" + stock.id : stock.id.toString()}
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
                {stock?.updated_at && stock.created_at !== stock.updated_at && (
                  <TimeText>
                    更新日時:{" "}
                    {format(new Date(stock.updated_at), "M/d hh:mma")!}
                  </TimeText>
                )}
                <Buttons>
                  <Button
                    onClick={() => {
                      removeStock(stock.id);
                    }}
                  >
                    <IconRemove color="#6a6a6a" size={16} />
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditable(!isEditable);
                    }}
                  >
                    <IconEdit color="#6a6a6a" size={16} />
                  </Button>
                </Buttons>
              </ContentHead>
              {isEditable ? (
                <Editor
                  handleSubmit={onSubmit}
                  value={inputValue}
                  setValue={setInputValue}
                />
              ) : (
                <div className="ql-snow">
                  <Content className="markdown forStyle forStyle2">
                    <Text
                      className="ql-editor"
                      dangerouslySetInnerHTML={{ __html: stock.content }}
                    />
                  </Content>
                </div>
              )}
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
  position: relative;
  padding: 6px 0;
  margin: 0 auto;
  form {
    margin-top: 8px;
    padding: 0;
    box-shadow: none;
    background-color: transparent;
  }
`;

const Buttons = styled.div`
  display: none;
  align-items: center;
  margin-left: auto;
  line-height: 1;
`;

const Button = styled.button`
  border: none;
  outline: none;
  background: none;
  padding: 0;
  margin-left: 4px;
  :hover {
    opacity: 0.7;
  }
`;

const Box = styled.div<BoxProps>`
  position: relative;
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

    ${Buttons} {
      display: flex;
    }
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
  margin-left: 16px;
`;

const Content = styled.div`
  margin-top: 8px;
`;

const Text = styled.div`
  margin-top: 4px;
  font-size: 1.6rem;
  word-wrap: break-word;
  padding-right: 32px;
`;

export default StockCassette;
