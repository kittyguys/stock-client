import Router from "next/router";
import { FC } from "react";
import styled from "styled-components";
import Color from "@src/common/constants/color";

type Props = {
  className?: string;
};

const Logo: FC<Props> = ({ className }) => {
  return (
    <LogoWrapper className={className} onClick={() => Router.push("/")}>
      <Text>Stock</Text>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  cursor: pointer;
`;

const Text = styled.span`
  font-family: "Lato", cursive;
  color: ${Color.Black.default};
`;

export default Logo;
