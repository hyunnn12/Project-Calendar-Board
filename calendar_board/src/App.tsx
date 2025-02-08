import React, { useState } from "react";
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

const App: React.FC = () => {
  const [columns, setColumns] = useState<{ title: string; cards: string[] }[]>([
    { title: "시작 전", cards: [] },
    { title: "진행 중", cards: [] },
    { title: "완료", cards: [] },
  ]);

  const handleAddColumn = () => {
    const newColumn = {
      title: `칼럼 ${columns.length + 1}`,
      cards: [],
    };
    setColumns((prev) => [...prev, newColumn]);
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
