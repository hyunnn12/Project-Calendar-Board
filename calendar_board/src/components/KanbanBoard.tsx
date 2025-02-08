import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const defaultColumns = [
  { title: "시작전", cards: [] },
  { title: "진행중", cards: [] },
  { title: "완료", cards: [] },
];

const CardBox = styled.div<{ hasCards: boolean }>`
  background-color: ${(props) => (props.hasCards ? "#ffffff" : "#e9e9e9")};
  border: none;
  border-radius: 12px;
  padding: 16px;
  min-height: 130px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.hasCards ? "flex-start" : "center")};
  justify-content: ${(props) => (props.hasCards ? "flex-start" : "center")};
  gap: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
`;

const EmptyMessage = styled.div`
  color: #808080;
  font-size: 14px;
  text-align: center;
`;

const AddCardButton = styled.button`
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #808080;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f5f5f5;
  }
`;

const CardTitleContainer = styled.div`
  display: flex;
  width: 100%;
`;

const CardTitleInput = styled.input`
  font-size: 16px;
  font-weight: bold;
  background-color: #f5f2f6;
  border: none;
  border-radius: 8px;
  padding: 8px;
  outline: none;
  min-width: 50px;
  max-width: 200px;
  width: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin-bottom: 8px;
`;

const AutoResizingInput = ({
  value,
  placeholder,
  onChange,
  onBlur,
}: {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputWidth, setInputWidth] = useState(50);
  const maxWidth = 200;

  useEffect(() => {
    if (inputRef.current) {
      const ctx = document.createElement("canvas").getContext("2d");
      if (ctx) {
        ctx.font = "16px sans-serif";
        const textWidth = ctx.measureText(value || placeholder).width;
        const newWidth = Math.min(Math.max(textWidth + 10, 50), maxWidth);
        setInputWidth(newWidth);
      }
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current?.blur();
    }
  };

  return (
    <CardTitleContainer>
      <CardTitleInput
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        style={{
          width: `${inputWidth}px`,
        }}
      />
    </CardTitleContainer>
  );
};

const AutoResizingContent = ({
  value,
  placeholder,
  onChange,
  onBlur,
}: {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(value.trim() === "");

  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerText = isEmpty ? placeholder : value;
    }
  }, [value, isEmpty, placeholder]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText.trim();
    onChange(text);
    setIsEmpty(text === "");
  };

  const handleBlur = () => {
    if (divRef.current?.innerText.trim() === "") {
      setIsEmpty(true);
      divRef.current.innerText = placeholder;
    }
    onBlur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 엔터 시 개행 방지
      divRef.current?.blur(); // 입력 종료
    }
  };

  return (
    <div
      ref={divRef}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onBlur={handleBlur}
      onFocus={() => {
        if (isEmpty) {
          divRef.current!.innerText = "";
        }
      }}
      onKeyDown={handleKeyDown} // 엔터 키 이벤트 추가
      style={{
        fontSize: "14px",
        color: isEmpty ? "#999" : "#515151",
        marginTop: "8px",
        width: "100%",
        minHeight: "20px",
        padding: "4px",
        outline: "none",
        borderRadius: "8px",
        backgroundColor: "transparent",
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
        cursor: "text",
      }}
    >
      {isEmpty ? placeholder : value}
    </div>
  );
};

interface KanbanBoardProps {
  columns: { title: string; cards: { title: string; content: string }[] }[];
  setColumns: React.Dispatch<
    React.SetStateAction<
      { title: string; cards: { title: string; content: string }[] }[]
    >
  >;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, setColumns }) => {
  useEffect(() => {
    if (columns.length === 0) {
      setColumns(defaultColumns);
    }
  }, [columns, setColumns]);

  const handleAddCard = (columnIndex: number) => {
    const updatedColumns = [...columns];
    updatedColumns[columnIndex].cards.push({
      title: "",
      content: "",
    });
    setColumns(updatedColumns);
  };

  const handleCardChange = (
    columnIndex: number,
    cardIndex: number,
    field: "title",
    value: string
  ) => {
    const updatedColumns = [...columns];
    updatedColumns[columnIndex].cards[cardIndex][field] = value;
    setColumns(updatedColumns);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
        width: "70%",
        margin: "0 auto",
      }}
    >
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} style={{ flex: "0 0 calc(33.333% - 16px)" }}>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#515151",
              marginBottom: "8px",
            }}
          >
            {column.title}
          </div>
          <CardBox hasCards={column.cards.length > 0}>
            {column.cards.length === 0 ? (
              <>
                <EmptyMessage>지금 바로 추가해보세요.</EmptyMessage>
                <AddCardButton onClick={() => handleAddCard(columnIndex)}>
                  +
                </AddCardButton>
              </>
            ) : (
              column.cards.map((card, cardIndex) => (
                <div key={cardIndex} style={{ width: "100%" }}>
                  <AutoResizingInput
                    value={card.title}
                    placeholder="제목을 입력하세요."
                    onChange={(e) =>
                      handleCardChange(
                        columnIndex,
                        cardIndex,
                        "title",
                        e.target.value
                      )
                    }
                    onBlur={() => {}}
                  />
                  <AutoResizingContent
                    value={card.content}
                    placeholder="내용을 입력하세요."
                    onChange={() => {}}
                    onBlur={() => {}}
                  />
                </div>
              ))
            )}
          </CardBox>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
