import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import BaseLogo from "@src/common/components/shared/Logo";
import { signin } from "@src/features/auth/operations";
import { FormValues } from "./types";
import { States } from "@src/app/types";
import { State } from "@src/features/auth/types";

const schema = yup.object().shape({
  signinID: yup.string().required("idは必須項目です。"),
  password: yup.string().required("パスワードは必須項目です。")
});

const SigninForm = () => {
  const { register, handleSubmit, errors } = useForm<FormValues>({
    validationSchema: schema
  });
  const error = useSelector<States, State["error"]>(({ auth }) => auth.error);
  const dispatch = useDispatch();
  const onSubmit = (values: FormValues) => {
    dispatch(signin(values));
  };
  return (
    <Wrapper>
      <Logo />
      <Title>ログイン</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormBlock>
          <Input
            name="signinID"
            ref={register({ required: true })}
            placeholder="id"
          />
        </FormBlock>
        <Error>{errors.signinID && errors.signinID.message}</Error>
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
          <SubmitButton type="submit" value="ログイン" formNoValidate />
        </FormBlock>
        <Error>{error.message}</Error>
        <Border>
          <Span>or</Span>
        </Border>
      </form>
      <FormBlock>
        <Button onClick={() => Router.push("/signup")}>
          アカウント作成はこちら
        </Button>
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

export default SigninForm;
