import React from "react";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import Header from "components/Header";
import ProjectTitle from "components/ProjectTitle";

const MainContent = styled.div`
  background-color: #f8f8f8;
  min-height: 100vh;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <div>
        <Header />
        <MainContent>
          <ProjectTitle />
        </MainContent>
      </div>
    </RecoilRoot>
  );
};

export default App;
