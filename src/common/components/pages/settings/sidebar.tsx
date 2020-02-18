import styled from "styled-components";

const Sidebar = () => {
  return (
    <SideBar>
      <SettingItem active>プロフィール</SettingItem>
      <SettingItem>test</SettingItem>
      <SettingItem>test</SettingItem>
      <SettingItem>test</SettingItem>
      <SettingItem>test</SettingItem>
      <SettingItem>test</SettingItem>
      <SettingItem>test</SettingItem>
      <SettingItem>test</SettingItem>
      <SettingItem>test</SettingItem>
      <SettingItem>test</SettingItem>
    </SideBar>
  );
};

const SideBar = styled.div`
  width: 280px;
  height: 640px;
  box-shadow: 0 1px 3px 0 rgba(32, 33, 36, 0.28);
  border-radius: 8px;
  padding: 8px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const SettingItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ active }) => (active ? "#fff" : "#555")};
  font-size: 1.6rem;
  width: 100%;
  height: 48px;
  font-weight: ${({ active }) => (active ? "bold" : "none")};
  background-color: ${({ active }) => (active ? "#ce93d8" : "none")};
  border-radius: 4px;
  &:hover {
    color: #fff;
    background-color: #6b52ae;
  }
`;

export default Sidebar;
