import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import Overlay from "./_overlay";
import User from "./_user";
import { States } from "@src/app/types";

type Props = {
  isOpen: Boolean;
  setIsOpen: any;
};

export const UserModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const isSignin = useSelector((state: States) => state.auth.isSignin);
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
