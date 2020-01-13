import { NextPage } from "next";
import styled from "styled-components";
import SignupForm from "@src/common/components/pages/signup";

const Signup: NextPage = () => {
  return (
    <Layout>
      <SignupForm />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Signup;
