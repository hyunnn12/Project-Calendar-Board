import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { projectTitleState } from "../recoil/atoms";

const TitleContainer = styled.div`
  text-align: left;
  margin: 20px 15%;
  display: flex;
  align-items: center;
`;

const TitleText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
  margin: 0; /* 기본 마진 제거 */
  padding: 5px 0;
  line-height: 1;
  min-width: 10px;
`;

const TitleInput = styled.input`
  font-size: 24px;
  font-weight: bold;
  border: none;
  outline: none;
  background: transparent;
  width: auto; /* 제목 길이에 맞게 조정 */
  min-width: 10px;
  padding: 5px 0;
  box-sizing: border-box;
  line-height: 1;
`;

const ProjectTitle: React.FC = () => {
  const [title, setTitle] = useRecoilState<string>(projectTitleState);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <TitleContainer>
      {isEditing ? (
        <TitleInput
          ref={inputRef}
          value={title || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
        />
      ) : (
        <TitleText onClick={handleEdit}>{title || "프로젝트 제목"}</TitleText>
      )}
    </TitleContainer>
  );
};

export default ProjectTitle;
