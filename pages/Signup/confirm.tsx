import * as React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { States } from "@src/app/types";
import SignupFormConfirm from "@src/common/components/pages/signup/comfirm";

const SignupConfirm = () => {
  const profile = useSelector((state: States) => state.profile);
  return (
    <Layout>
      <SignupFormConfirm profile={profile} />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SignupConfirm;
