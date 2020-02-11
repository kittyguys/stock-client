import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import Overlay from "./_overlay";
import User from "./_user";
import { States } from "@src/app/types";
import { State } from "@src/features/auth/types";

type Props = {
  isOpen: any;
  setIsOpen: any;
};

export const UserModal: FC<Props> = ({ isOpen, setIsOpen }: any) => {
  const isSignin = useSelector<States, State["isSignin"]>(
    ({ auth }) => auth.isSignin
  );
  useEffect(() => {
    if (!isSignin) {
      setIsOpen(false);
    }
  }, [isSignin]);
  return (
    <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
      <User />
    </Overlay>
  );
};
