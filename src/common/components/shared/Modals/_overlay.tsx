import { FC, useState } from "react";
import styled from "styled-components";

type Props = {
  children: any,
  isOpen: any,
  setIsOpen: any
};

const Overlay: FC<Props> = ({ children, isOpen, setIsOpen }: any) => {
  const handleClose = () => {
    setIsOpen(!isOpen)
  }
  return (
    <Wrapper onClick={handleClose}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default Overlay;
