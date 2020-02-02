import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getNotesAsync, createNoteAsync } from "@src/features/notes/operations";

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

  const onSubmit = ({ target, keyCode }: any) => {
    if (keyCode === 13) {
      dispatch(createNoteAsync(target.value));
    }
  };

  useEffect(() => {
    dispatch(getNotesAsync());
  }, []);

  return (
    <NoteWrapper>
      <Form>
        <Input
          placeholder="新しく作成するノートの名前を入力する"
          onKeyUp={onSubmit}
        />
      </Form>
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
  transition: 0.3s width;
  margin-bottom: 16px;
`;

const LinkStyle = styled.a`
  color: #333;
  text-decoration: none;
`;

const Form = styled.div`
  margin-bottom: 32px;
`;

const Input = styled.input`
  font-size: 1.8rem;
  width: 100%;
  height: 100%;
  padding: 8px 20px;
  background: #fff;
  display: flex;
  border: 1px solid #dfe1e5;
  box-shadow: none;
  border-radius: 4px;
  outline: none;
  z-index: 3;
  :hover {
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    border-color: rgba(223, 225, 229, 0);
  }
`;

export default Notes;
