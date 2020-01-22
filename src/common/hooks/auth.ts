import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// hooksを使った非同期処理のサンプル
export const useSignUp = (params: any) => {
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function signUp() {
      await axios
        .post(`${process.env.API_PATH}:${process.env.API_PORT}/signup`, params)
        .then(res => {
          setData(res.data.token);
          dispatch({ type: "SIGNUP_SUCCESS", payload: { status: true } });
        })
        .catch(err => {
          setError(err);
          dispatch({ type: "SIGNUP_FAIL", payload: { status: false } });
        });
    }
    signUp();
  }, []);
  return [data, error];
};
