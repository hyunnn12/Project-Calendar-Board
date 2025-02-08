import React from "react";
import styled from "styled-components";

const ColumnsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  width: 70%;
  margin: 0 auto;
`;

const ColumnContainer = styled.div`
  flex: 0 0 calc(33.333% - 16px);
  max-width: calc(33.333% - 16px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ColumnTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #515151;
  margin-bottom: 8px;
  text-align: left;
`;

const CardBox = styled.div<{ hasCards: boolean }>`
  background-color: ${(props) => (props.hasCards ? "#ffffff" : "#e9e9e9")};
  border: none;
  border-radius: 4px;
  padding: ${(props) => (props.hasCards ? "16px" : "0")};
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: ${(props) =>
    props.hasCards ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none"};
  overflow-y: auto;
`;

const EmptyMessage = styled.div`
  color: #808080;
  font-size: 14px;
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

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

interface KanbanBoardProps {
  columns: { title: string; cards: string[] }[];
  setColumns: React.Dispatch<
    React.SetStateAction<{ title: string; cards: string[] }[]>
  >;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, setColumns }) => {
  const handleAddCard = (columnIndex: number) => {
    const newCard = prompt("새로운 카드 내용을 입력하세요:");
    if (newCard) {
      const updatedColumns = [...columns];
      updatedColumns[columnIndex].cards.push(newCard);
      setColumns(updatedColumns);
    }
  };

  return (
    <ColumnsContainer>
      {columns.map((column, index) => (
        <ColumnContainer key={index}>
          <ColumnTitle>{column.title}</ColumnTitle>
          <CardBox hasCards={column.cards.length > 0}>
            {column.cards.length === 0 ? (
              <>
                <EmptyMessage>지금 바로 추가해보세요.</EmptyMessage>
                <AddCardButton onClick={() => handleAddCard(index)}>
                  +
                </AddCardButton>
              </>
            ) : (
              column.cards.map((card, cardIndex) => (
                <Card key={cardIndex}>{card}</Card>
              ))
            )}
          </CardBox>
        </ColumnContainer>
      ))}
    </ColumnsContainer>
  );
};

export default KanbanBoard;
