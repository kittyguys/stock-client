import * as React from "react";
import styled from "styled-components";

type TextProps = {
  className: string;
  searchWord: string;
  targetField: string;
};

export const NoDataText: React.FC<TextProps> = ({
  className,
  searchWord,
  targetField
}) => {
  return (
    <Text className={className}>
      {searchWord}
      に一致する
      {targetField}
      は今はまだないようです。
    </Text>
  );
};

type WrapperProps = {
  className: string;
};

export const NoData: React.FC<WrapperProps> = ({ children, className }) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  margin: 30px 0;
`;

const Text = styled.p`
  max-width: 900px;
  padding: 10px 20px;
  margin: 0 auto;
`;
