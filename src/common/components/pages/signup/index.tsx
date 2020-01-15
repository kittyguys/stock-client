import Router from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import BaseLogo from "@src/common/components/shared/Logo";
import { signup } from "@src/features/auth/operations";
import { FormValues } from "./types";

const schema = yup.object().shape({
  user_name: yup.string().required("IDは必須項目です。"),
  email: yup
    .string()
    .email("形式がメールアドレスではありません。")
    .required("メールアドレスは必須項目です。"),
  password: yup
    .string()
    .min(8, "パスワードは8文字以上で設定してください。")
    .required("パスワードは必須項目です。"),
  password_confirm: yup
    .string()
    .oneOf([yup.ref("password")], "パスワードが一致しません。")
    .required("パスワードの確認は必須項目です。")
});

const SignupForm = () => {
  const [isUnique, setIsUnique] = useState(false);
  const { register, handleSubmit, errors, setError, clearError } = useForm<
    FormValues
  >({
    validationSchema: schema
  });
  const dispatch = useDispatch();
  const onSubmit = (values: FormValues) => {
    if (isUnique) {
      delete values.password_confirm;
      dispatch(signup(values));
    } else {
      setError("user_name", "duplicated", "こちらのIDはお使いになれません。");
    }
  };
  const handleChange = async (e: any) => {
    const user_name = e.target.value;
    const result = await axios
      .post("http://localhost:8080/api/unique/username", { user_name })
      .then(res => {
        return res.data.isUnique;
      })
      .catch(err => {
        console.log(err);
      });
    setIsUnique(result);
    return result;
  };
  return (
    <Wrapper>
      <Logo />
      <Title>アカウントの作成</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormBlock>
          <Input
            name="user_name"
            ref={register({ required: true })}
            placeholder="ID"
            onChange={e => {
              (async function() {
                const result = await handleChange(e);
                if (!result) {
                  setError(
                    "user_name",
                    "duplicated",
                    "こちらのIDはお使いになれません。"
                  );
                } else {
                  clearError("user_name");
                }
              })();
            }}
          />
        </FormBlock>
        <Error>{errors.user_name && errors.user_name.message}</Error>
        <FormBlock>
          <Input
            name="email"
            type="email"
            ref={register}
            placeholder="メールアドレス"
          />
        </FormBlock>
        <Error>{errors.email && errors.email.message}</Error>
        <FormBlock>
          <Input
            name="password"
            type="password"
            ref={register}
            placeholder="パスワード"
          />
        </FormBlock>
        <Error>{errors.password && errors.password.message}</Error>
        <FormBlock>
          <Input
            name="password_confirm"
            type="password"
            ref={register}
            placeholder="パスワードの確認"
          />
        </FormBlock>
        <Error>
          {errors.password_confirm && errors.password_confirm.message}
        </Error>
        <FormBlock>
          <SubmitButton type="submit" value="登録" formNoValidate />
        </FormBlock>
        <Border>
          <Span>or</Span>
        </Border>
      </form>
      <FormBlock>
        <Button onClick={() => Router.push("/signin")}>ログインはこちら</Button>
      </FormBlock>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 360px;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  padding: 30px 30px;
`;

const Logo = styled(BaseLogo)`
  display: block;
  font-size: 24px;
  text-align: center;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 12px;
  text-align: center;
`;

const FormBlock = styled.div`
  display: block;
  margin: 16px 0 0;
`;

const SubmitButton = styled.input`
  display: block;
  background-color: #4285f4;
  color: #fff;
  width: 100%;
  height: 38px;
  margin: 12px auto 0;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 1.6rem;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const Button = styled.button`
  display: block;
  background-color: #4285f4;
  color: #fff;
  width: 100%;
  height: 38px;
  margin: 12px auto 0;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 1.6rem;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 100%;
  color: #555;
  font-size: 15px;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #dfe1e5;
  outline: none;
  background-color: #eee;
`;

const Border = styled.div`
  height: 12px;
  margin-top: 24px;
  border-top: 1px solid #cbd2d6;
  position: relative;
  text-align: center;
`;

const Span = styled.span`
  font-size: 1.6rem;
  background-color: #fff;
  padding: 0 8px;
  position: relative;
  color: #6c7378;
  top: -14px;
`;

const Error = styled.span`
  color: red;
  font-size: 1.4rem;
`;

export default SignupForm;
