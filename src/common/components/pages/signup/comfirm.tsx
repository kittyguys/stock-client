import Router from "next/router";
import * as React from "react";
import styled from "styled-components";
import axios from "axios";

import BaseLogo from "@src/common/components/shared/Logo";
import BaseNormalButton from "@src/common/components/shared/Button/NormalButton";

type Props = {
  profile: any;
};

type UserData = {
  hashID: string;
  displayName: string;
  email: string;
  password: string;
};

const SignupFormConfirm: React.FC<Props> = ({ ...props }) => {
  const createUser = () => {
    const userData: UserData = {
      hashID: props.profile.userName,
      displayName: props.profile.userName,
      email: props.profile.email,
      password: props.profile.password
    };
    axios
      .post(
        `http://${process.env.API_PATH}:${process.env.API_PORT}/signup`,
        userData
      )
      .then(res => {
        localStorage.setItem("token", res.data.token);
        alert("アカウントの作成が成功しました。");
        Router.push("/");
      });
  };
  return (
    <Wrapper>
      <Logo />
      <Title>この内容でhashアカウントを作成する</Title>
      <Layout2>
        <Label>ユーザー名</Label>
        <Text>{props.profile.userName}</Text>
      </Layout2>
      <Layout2>
        <Label>メールアドレス</Label>
        <Text>{props.profile.email}</Text>
      </Layout2>
      <Layout1>
        <Label>パスワード</Label>
        <Text>{props.profile.password}</Text>
      </Layout1>
      <Layout3>
        <NormalButton content="登録する" handleClick={() => createUser()} />
      </Layout3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 486px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 24px 30px;
`;

const Logo = styled(BaseLogo)`
  font-size: 28px;
`;

const Layout1 = styled.div`
  margin: 10px 0;
  display: inline-block;
  margin-right: 10px;
`;

const Layout2 = styled.div`
  margin: 10px 0;
`;

const Layout3 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const NormalButton = styled(BaseNormalButton)`
  font-size: 20px;
  width: 180px;
  height: 40px;
  background-color: #4285f4;
`;

const Title = styled.div`
  font-size: 22px;
`;

const Label = styled.div`
  font-size: 16px;
  color: #999;
`;

const Text = styled.div`
  font-size: 20px;
`;

export default SignupFormConfirm;
