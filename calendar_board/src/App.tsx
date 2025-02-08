import React, { useState, useEffect, useRef } from "react";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import Header from "components/Header";
import ProjectTitle from "components/ProjectTitle";
import KanbanBoard from "components/KanbanBoard";

const MainContent = styled.div`
  background-color: #f8f8f8;
  min-height: 100vh;
  padding: 20px;
`;

const defaultColumns = [
  { title: "시작 전", cards: [] },
  { title: "진행 중", cards: [] },
  { title: "완료", cards: [] },
];

const App: React.FC = () => {
  const [columns, setColumns] = useState(defaultColumns);

  const handleAddColumn = () => {
    const existingCustomColumns = columns.slice(3);
    const newColumn = {
      title: `칼럼 ${existingCustomColumns.length + 1}`,
      cards: [],
    };
    setColumns([...defaultColumns, ...existingCustomColumns, newColumn]);
  };

  return (
    <RecoilRoot>
      <div>
        <Header />
        <MainContent>
          <ProjectTitle onAddColumn={handleAddColumn} />
          <KanbanBoard columns={columns} setColumns={setColumns} />
        </MainContent>
      </div>
    </RecoilRoot>
  );
};

export default App;
