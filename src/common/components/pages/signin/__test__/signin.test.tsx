import renderWithRedux from "@src/utils/renderWithRedux";
import { fireEvent, queryByText } from "@testing-library/react";
import SigninForm from "../";

describe("SigninForm", () => {
  let { container } = renderWithRedux(<SigninForm />);

  afterEach(() => {
    container = renderWithRedux(<SigninForm />).container;
  });

  const [signinID, password, submitButton] = [
    container.querySelector<HTMLInputElement>("input[name='signinID']"),
    container.querySelector<HTMLInputElement>("input[name='password']"),
    container.querySelector<HTMLInputElement>("[type='submit']")
  ];

  it("Input: initial value", async () => {
    expect(signinID.value).toBe("");
    expect(password.value).toBe("");
  });

  it("Input signinID: value change", async () => {
    fireEvent.change(signinID, { target: { value: "a" } });
    expect(signinID.value).toBe("a");
  });

  it("Input password: value change", async () => {
    fireEvent.change(password, { target: { value: "a" } });
    expect(password.value).toBe("a");
  });

  it("Submit: invalid signinID", async () => {
    fireEvent.change(signinID, { target: { value: "" } });
    fireEvent.click(submitButton);
    expect(queryByText(container, /idは必須項目です。/)).toBeTruthy;
  });

  it("Submit: invalid password", async () => {
    fireEvent.change(password, { target: { value: "" } });
    fireEvent.click(submitButton);
    expect(queryByText(container, /パスワードは必須項目です。/)).toBeTruthy;
  });

  it("Submit: valid All inputs", async () => {
    fireEvent.change(signinID, { target: { value: "a" } });
    fireEvent.change(password, { target: { value: "a" } });
    fireEvent.click(submitButton);
    expect(queryByText(container, /idは必須項目です。/)).toBeFalsy;
    expect(queryByText(container, /パスワードは必須項目です。/)).toBeFalsy;
  });

  it("Submit: invalid all inputs", async () => {
    fireEvent.click(submitButton);
    expect(queryByText(container, /idは必須項目です。/)).toBeTruthy;
    expect(queryByText(container, /パスワードは必須項目です。/)).toBeTruthy;
  });
});
