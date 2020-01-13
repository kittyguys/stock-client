import * as React from "react";
import styled from "styled-components";
import marked from "marked";

type Props = {
  className?: string;
  data: string;
};

const Marked: React.FC<Props> = ({ className, data }) => {
  return (
    <Contents
      dangerouslySetInnerHTML={{ __html: marked(data) }}
      className={className}
    ></Contents>
  );
};

export default Marked;

const Contents = styled.div`
  /* codeタグ */
  code {
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    font-size: 85%;
    margin: 0;
    padding: 0.2em 0.4em;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
    color: #111;
    line-height: 1em;
  }

  h4,
  h5,
  h6 {
    font-weight: bold;
  }

  h1 {
    font-size: 2.5em;
  }

  h2 {
    font-size: 2em;
  }

  h3 {
    font-size: 1.5em;
  }

  h4 {
    font-size: 1.2em;
  }

  h5 {
    font-size: 1em;
  }

  h6 {
    font-size: 0.9em;
  }

  em {
    font-weight: bold;
  }

  blockquote {
    position: relative;
    padding-left: 16px;
    :before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      display: block;
      width: 4px;
      border-radius: 8px;
      background: #ddd;
      content: "";
    }
  }
`;
