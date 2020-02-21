import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { updatedDiff } from "deep-object-diff";
import BaseAvatar from "@src/common/components/shared/Avatar";
import { updateProfile } from "@src/features/settings/operations";
import { States } from "@src/app/types";
import { State } from "@src/features/profile/types";

const ProfileEditor = () => {
  const dispatch = useDispatch();
  const profile = useSelector<States, State>(({ profile }) => profile);
  const [imgURL, setImgURL] = useState<string | undefined>(undefined);
  const { register, handleSubmit, errors } = useForm();
  const formData: any = {
    profile_image_url: null,
    user_name: "",
    display_name: "",
    email: ""
  };
  const onSubmit = (data: any) => {
    const diff = updatedDiff(formData, data);
    dispatch(updateProfile(diff));
  };
  const changeAvatar = (e: any) => {
    const files = e.target.files;
    setImgURL(URL.createObjectURL(files[0]));
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelBlock>
          <label htmlFor="profile_image_url">
            <Avatar imageSrc={imgURL} editable />
          </label>
        </LabelBlock>
        <InputAvatar
          onChange={e => changeAvatar(e)}
          name="profile_image_url"
          ref={register}
          type="file"
          id="profile_image_url"
        />
        <Label>id</Label>
        <InputUserName
          name="user_name"
          placeholder={profile.userName}
          ref={register}
        />
        <Label>名前</Label>
        <InputUserName
          name="display_name"
          placeholder={profile.displayName}
          ref={register}
        />
        <Label>メールアドレス</Label>
        <InputEmail name="email" placeholder={profile.email} ref={register} />
        <SaveButton type="submit" value="保存" />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const LabelBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
`;

const Avatar = styled(BaseAvatar)`
  width: 120px;
  height: 120px;
`;

const SaveButton = styled.input`
  display: block;
  background-color: #6b52ae;
  color: #fff;
  width: 320px;
  height: 38px;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 1.6rem;
  margin: 0 auto 48px;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const InputAvatar = styled.input`
  display: none;
`;

const Label = styled.label`
  width: 320px;
  font-size: 1.4rem;
  border-radius: 4px;
  display: block;
  margin: 0 auto 4px;
`;

const InputUserName = styled.input`
  width: 320px;
  height: 38px;
  color: #555;
  font-size: 1.6rem;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: block;
  margin: 0 auto 32px;
  padding: 8px;
`;

const InputEmail = styled.input`
  width: 320px;
  height: 38px;
  color: #555;
  font-size: 1.6rem;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: block;
  margin: 0 auto 32px;
  padding: 8px;
`;

export default ProfileEditor;
