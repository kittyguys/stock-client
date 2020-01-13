import * as React from "react";
import { Fragment } from "react";

import styled from "styled-components";
import Tag from "./index";

type WrapperProps = {
  className?: string;
};
export const Wrapper: React.FC<WrapperProps> = ({ className, children }) => {
  return <TagWrapper className={className}>{children}</TagWrapper>;
};

type Props = {
  className?: string;
  tags: string[];
  matching?: boolean;
};

export const Box: React.FC<Props> = ({
  className,
  tags,
  matching,
  children
}) => {
  if (tags.length === 0) {
    return <Fragment />;
  }
  return (
    <Tag className={className} tags={tags} matching={matching}>
      {children}
    </Tag>
  );
};

const TagWrapper = styled.div``;
