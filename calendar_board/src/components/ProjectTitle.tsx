import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { projectTitleState } from "../recoil/atoms";

const TitleContainer = styled.div`
  text-align: left;
  margin: 20px 15%;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 제목과 버튼을 양쪽에 배치 */
`;

const TitleText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
  margin: 0;
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
  width: auto;
  min-width: 10px;
  padding: 5px 0;
  box-sizing: border-box;
  line-height: 1;
`;

const AddListButton = styled.button`
  background-color: #f1f1f1; /* 배경색 수정 */
  color: #808080;
  font-size: 16px;
  border: none; /* 테두리 제거 */
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #e6e6e6; /* 호버 시 약간 어두운 색 */
  }

  span {
    font-size: 18px;
    font-weight: bold;
    color: #808080;
  }
`;
interface ProjectTitleProps {
  onAddColumn: () => void; // onAddColumn 함수 타입 정의
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ onAddColumn }) => {
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
      <AddListButton onClick={onAddColumn}>
        <span>+</span> Add another list
      </AddListButton>
    </TitleContainer>
  );
};

export default ProjectTitle;
