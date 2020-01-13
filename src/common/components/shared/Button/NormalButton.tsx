import * as React from "react";
import styled from "styled-components";

type Props = {
  className?: string;
  content: string;
  handleClick?: () => void;
};

const NormalButton: React.FC<Props> = ({ className, content, handleClick }) => {
  return (
    <Button className={className} onClick={handleClick}>
      {content}
    </Button>
  );
};

const Button = styled.div`
  display: inline-block;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  max-width: 300px;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default NormalButton;
