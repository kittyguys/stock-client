import React, { useState } from "react";
import ReactDomServer from "react-dom/server";
import BaseReactQuill, { Quill } from "react-quill";
import styled from "styled-components";
import { IoMdCodeWorking, IoMdCode } from "react-icons/io";
import Color from "@src/common/constants/color";
import BaseMainInputForm from "@src/common/components/shared/StockInput";

// QuillEditorでMarkdownを使えるようにするモジュール
const MarkdownShortcuts = require("quill-markdown-shortcuts");
Quill.register("modules/markdownShortcuts", MarkdownShortcuts);

const icons = Quill.import("ui/icons");
icons["code-block"] = ReactDomServer.renderToString(
  <IoMdCodeWorking size="20px" />
);
icons["code"] = ReactDomServer.renderToString(<IoMdCode size="20px" />);

const modules = {
  keyboard: {
    bindings: {
      exitCode: {
        format: ["code"],
        key: 39, // Arrow right key
        handler: function(this: { quill: Quill }, _range: any, context: any) {
          const quill = this.quill;
          if (!quill.getSelection()) return; // for strict mode

          // code の中でカーソル位置が右端じゃなければ、通常の→キーを押した挙動
          if (context.suffix !== "") return true;

          quill.format("code", false);
          const cursorPosition = quill.getSelection()!.index;
          const isExistChars = /./.test(
            quill.getText(cursorPosition, cursorPosition + 2)
          );
          if (isExistChars) return true;

          // code の右端で→キーを押したら半角スペースを挿入する
          quill.insertText(cursorPosition, " ");
        }
      },
      exitCodeBlockUpward: {
        format: ["code-block"],
        key: 38, // Arrow up key
        handler: function(this: { quill: any }, _range: any, context: any) {
          const quill = this.quill;
          if (!/^(|\n)$/.test(context.prefix)) {
            return true;
          }
          const cursorPosition = quill.getSelection().index;
          if (cursorPosition === 0) {
            quill.setContents([{ insert: "\n" }, ...quill.getContents().ops]);
          }
          return true;
        }
      },
      exitCodeBlockDownward: {
        format: ["code-block"],
        key: 40, // Arrow down key
        handler: function(this: { quill: Quill }, _range: any, context: any) {
          const quill = this.quill;
          if (!quill.getSelection()) return; // for strict mode

          if (!/^(|\n)$/.test(context.suffix)) {
            return true;
          }
          const cursorPosition = quill.getSelection()!.index;
          if (
            quill.getLine(cursorPosition + 1)[0].statics.name ===
            "SyntaxCodeBlock"
          ) {
            quill.insertText(cursorPosition + 1, "\n");
          }
          return true;
        }
      }
    }
  },
  toolbar: {
    container: [
      { header: [1, 2, 3, 4, 5, 6] },
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "code-block",
      "code",
      { list: "ordered" },
      { list: "bullet" }
    ]
  },
  markdownShortcuts: {}
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code-block",
  "code"
];

type Props = {
  onClickSubmit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  setValue: (value: string) => any;
};

const Editor: React.FC<Props> = ({
  onClickSubmit,
  handleSubmit,
  value,
  setValue
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const handleChange = (
    value: string,
    _delta: any, // ReactQuill で型定義が export されていなかった
    _source: any,
    editor: any
  ) => {
    setValue(value);
    setIsDisabled(
      // 全ての行が空文字の時に true
      editor.getContents().ops.every((op: any) =>
        // 何も入力していなくても改行コードが挿入されるので以下のコードで対応
        /^(|\n*)$/.test(op.insert)
      )
    );
  };
  return (
    <MainInputForm handleSubmit={handleSubmit}>
      <ReactQuill
        className="markdown forStyle forStyle2"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
      <SubmitButtonWrap>
        <SubmitButton onClick={onClickSubmit} disabled={isDisabled}>
          送信
        </SubmitButton>
      </SubmitButtonWrap>
    </MainInputForm>
  );
};

const MainInputForm = styled(BaseMainInputForm)`
  display: flex;
  font-size: 1.4rem;
  padding: 16px 24px;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.16);
  position: relative;
  z-index: 2;
`;

const SubmitButtonWrap = styled.div`
  display: flex;
`;

const SubmitButton = styled.button`
  color: #fff;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);
  background-color: ${Color.Brand.default};
  border-radius: 4px;
  white-space: nowrap;
  width: 64px;
  height: 44px;
  font-size: 1.6rem;
  align-self: flex-end;
  margin-left: 4px;
  outline: none;
  transition: 0.3s ease;
  &:hover {
    background-color: ${Color.Brand[300]};
  }
  &:active {
    box-shadow: none;
    background-color: ${Color.Brand[200]};
  }
  &:disabled {
    box-shadow: none;
    background-color: ${Color.Gray};
    cursor: auto;
  }
`;

const ReactQuill = styled(BaseReactQuill)`
  width: 100%;
  height: 100%;
`;

export default Editor;
