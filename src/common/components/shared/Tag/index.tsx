import * as React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

type Props = {
  className?: string;
  tags: any;
  styledTag?: any;
  matching?: boolean;
};

const Tags: React.FC<Props> = ({ className, tags, matching, styledTag }) => {
  const myData = useSelector((state: any) => state.myData);
  const myTags = myData.tags.map((tag: any) => tag.name);
  const tagComponents = tags.map((tag: any, i: number) => {
    const tagComponent = styledTag || <Tag tagName={tag.name} />;
    if (matching) {
      if (myTags.includes(tag.name)) {
        return React.cloneElement(tagComponent, {
          tagName: tag.name,
          match: true
        });
      }
    }
    return React.cloneElement(tagComponent, { tagName: tag.name });
  });
  return <TagWrapper className={className}>{tagComponents}</TagWrapper>;
};

const TagWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export default Tags;

type TagProps = {
  className?: string;
  tagName: string;
  match?: boolean;
};

export const Tag: React.FC<TagProps> = ({ className, tagName, match }) => {
  return (
    <Text className={className} onClick={() => pickColor()} match={match}>
      #{tagName}
    </Text>
  );
};

type TextType = {
  match?: boolean;
};

const Text = styled.span<TextType>`
  margin: 4px 8px;
  color: ${({ match }) => (match ? "#fff" : "#777")};
  padding: 6px 12px;
  border-radius: 6px;
  background-color: ${({ match }) => (match ? "blue" : "#ffe5e5")};
  cursor: pointer;
  display: inline-block;
`;

const pickColor = () => {
  const defaultColor = ["ff7722", "f92772"];
};
