import Router from "next/router";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { withFormik, Form, Field, FormikProps } from "formik";
import BaseLogo from "@src/common/components/shared/Logo";
import { signin } from "@src/features/auth/operations";

type FormValues = {
  signinID: string;
  password: string;
};

const InnerForm = ({ values }: FormikProps<FormValues>) => {
  return (
    <Wrapper>
      <Logo />
      <Title>ログイン</Title>
      <Form>
        <FormBlock>
          <IDInput
            value={values.signinID}
            type="text"
            name="signinID"
            placeholder="ID または メールアドレス"
          />
        </FormBlock>
        <FormBlock>
          <InputStyle
            value={values.password}
            type="password"
            name="password"
            placeholder="パスワード"
          />
        </FormBlock>
        <FormBlock>
          <SubmitButton type="submit" value="ログイン" />
        </FormBlock>
        <Border>
          <Span>or</Span>
        </Border>
      </Form>
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
  padding: 32px 32px;
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

const InputStyle = styled(Field)`
  width: 100%;
  color: #555;
  font-size: 15px;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #dfe1e5;
  outline: none;
  background-color: #eee;
`;

const IDInput = styled(Field)`
  width: 100%;
  color: #555;
  font-size: 15px;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #dfe1e5;
  outline: none;
  background-color: #eee;
`;
const EmailInput = {
  color: "#555",
  fontSize: "16px",
  padding: "6px 10px",
  borderRadius: "4px",
  border: "1px solid #dfe1e5",
  outline: "none",
  width: "350px"
};

const LabelStyle = {
  display: "block",
  fontSize: "16px"
};

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

const SigninFormFormik = withFormik({
  mapPropsToValues: () => ({
    signinID: "",
    password: ""
  }),
  handleSubmit: (values: FormValues, { props }: any) => {
    const { signin } = props;
    const signinData: any = {
      signinID: values.signinID,
      password: values.password
    };
    signin(signinData);
  }
})(InnerForm);

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ signin: signin }, dispatch);
};

export default connect(null, mapDispatchToProps)(SigninFormFormik);
