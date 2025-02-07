import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { projectTitleState } from "../recoil/atoms"; // 경로 수정

const TitleContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const TitleText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
`;

const TitleInput = styled.input`
  font-size: 24px;
  font-weight: bold;
  border: none;
  outline: none;
  text-align: center;
  background: transparent;
  width: 100%;
`;

const ProjectTitle: React.FC = () => {
  const [title, setTitle] = useRecoilState<string>(projectTitleState); // 🛠 string 타입 지정
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
          value={title || ""} // 🛠 title이 undefined일 경우 대비
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
        />
      ) : (
        <TitleText onClick={handleEdit}>{title || "프로젝트 제목"}</TitleText> // 🛠 기본값 설정
      )}
    </TitleContainer>
  );
};

export default ProjectTitle;
