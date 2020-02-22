import * as React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { States } from "@src/app/types";
import { State } from "@src/features/profile/types";

type Props = {
  className?: string;
  imageSrc?: string;
  editable?: boolean;
  iconSize?: string;
};

const Avatar: React.FC<Props> = ({
  className,
  imageSrc,
  editable,
  iconSize
}) => {
  const profile_image = useSelector<States, State["profile_image_url"]>(
    ({ profile }) => profile.profile_image_url
  );
  const src = imageSrc || profile_image;
  const size = iconSize || "28px";
  const overlay = editable ? (
    <Overlay>
      <Text>変更</Text>
      {src ? <Image src={src} /> : <AiOutlineUser size="120px" />}
    </Overlay>
  ) : (
    <>
      {src ? (
        <Image src={src} />
      ) : (
        <Overlay>
          <AiOutlineUser size={size} />
        </Overlay>
      )}
    </>
  );
  return <Wrapper className={className}>{overlay}</Wrapper>;
};

export const Wrapper = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
`;

const Overlay = styled.div`
  cursor: pointer;
  background-color: rgba(1, 1, 1, 0.2);
  &:hover {
    background-color: rgba(1, 1, 1, 0.4);
  }
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 1.6rem;
`;

const Image = styled.img`
  width: 100%;
  outline: none;
`;

export default Avatar;
