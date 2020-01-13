import { NextPage } from "next";
import styled from "styled-components";
import BaseAvatar from "@src/common/components/shared/Avatar";
import BaseUserName from "@src/common/components/shared/UserName";

const User: NextPage = props => {
  return <></>;
};

const MypageWrapper = styled.div`
  width: 640px;
  margin: 120px auto 0;
  border: 1px solid #dbdbdb;
  padding: 30px;
  @media (max-width: 768px) {
    padding: 0 20px;
    width: auto;
    margin: 0;
    border: none;
  }
`;

const MainLayout = styled.div`
  display: flex;
`;

const Avatar = styled(BaseAvatar)`
  width: 90px;
  height: 90px;
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const SubLayout = styled.div`
  display: block;
  margin-left: 20px;
  margin-top: 20px;
`;

const UserName = styled(BaseUserName)`
  font-size: 30px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const TagBoxLayout = styled.div`
  margin-top: 20px;
`;

export default User;
