import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

type Props = {
  className?: string;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const MainInputForm: React.FC<Props> = ({
  className,
  handleSubmit,
  children
}) => {
  return (
    <InputForm className={className} onSubmit={handleSubmit}>
      {children}
    </InputForm>
  );
};

const InputForm = styled.form`
  display: block;
  background-color: #fff;
`;

export default MainInputForm;

type InputProps = {
  className?: string;
  id?: string;
  inputValue?: string;
  handleChange?: (inputValue: string) => void;
};

export const MainInput: React.FC<InputProps> = ({
  className,
  id,
  inputValue,
  handleChange
}) => {
  return (
    <Input
      className={className}
      id={id}
      value={inputValue}
      onChange={e => handleChange(e.target.value)}
    />
  );
};

const Input = styled.input`
  color: #555;
  font-size: 16px;
  padding: 16px;
  border-radius: 24px;
  border: 1px solid #dfe1e5;
  outline: none;
`;
