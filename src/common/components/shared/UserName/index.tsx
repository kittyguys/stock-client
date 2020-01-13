import * as React from "react";
import styled from "styled-components";

type Props = {
  className?: string;
  userName: string;
};

const UserName: React.FC<Props> = ({ className, userName }) => {
  return (
    <Wrapper className={className}>
      <Text>{userName}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Text = styled.span``;

export default UserName;
