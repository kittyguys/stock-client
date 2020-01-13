export const MYPAGEINPUT_CHANGE = "MYPAGEINPUT_CHANGE";

export const mypageInputChange = (inputValue: string) => ({
  type: MYPAGEINPUT_CHANGE,
  payload: inputValue
});
