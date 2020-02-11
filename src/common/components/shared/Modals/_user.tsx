import Router from "next/router";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Cookies from "js-cookie";
import { signout } from "@src/features//auth/actions";
import BaseAvatar from "../Avatar";
import { States } from "@src/app/types";
import { State } from "@src/features/profile/types";

type Props = {};

const UserModal: FC<Props> = () => {
  const dispatch = useDispatch();
  const profile = useSelector<States, State>(({ profile }) => profile);
  const handleClick = (e: any) => {
    e.stopPropagation();
  };
  const handleSignout = () => {
    Cookies.remove("jwt");
    dispatch(signout());
  };
  const handleRoute = (route: any) => {
    Router.push(`/${route}`);
  };
  return (
    <Modal
      onClick={e => {
        handleClick(e);
      }}
    >
      <Avatar iconSize="96px" />
      <UserName>{profile.userName}</UserName>
      <Email>{profile.email}</Email>
      <Block>
        <ProfileButton onClick={() => handleRoute(profile.userName)}>
          プロフィール
        </ProfileButton>
      </Block>
      <Block>
        <ProfileButton onClick={() => handleRoute("notes")}>
          ノート
        </ProfileButton>
      </Block>
      <Block>
        <ProfileButton onClick={() => handleRoute("settings/profile")}>
          設定
        </ProfileButton>
      </Block>
      <Block>
        <Button onClick={handleSignout}>ログアウト</Button>
      </Block>
    </Modal>
  );
};

const Modal = styled.div`
  position: absolute;
  top: 92px;
  right: 28px;
  width: 280px;
  background-color: #fff;
  border-radius: 8px;
  padding: 28px;
  box-shadow: 0 1px 3px 0 rgba(32, 33, 36, 0.28);
`;

const Avatar = styled(BaseAvatar)`
  width: 96px;
  height: 96px;
  margin: 0 auto 16px;
`;

const UserName = styled.div`
  color: #555;
  font-size: 2rem;
  margin: 0 auto;
  text-align: center;
`;

const Email = styled.div`
  color: #777;
  font-size: 1.6rem;
  margin: 0 auto;
  text-align: center;
`;

const Block = styled.div`
  font-size: 2rem;
  margin: 0 auto;
  text-align: center;
`;

const ProfileButton = styled.button`
  display: block;
  background-color: #6b52ae;
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
  background-color: #ccc;
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

export default UserModal;
