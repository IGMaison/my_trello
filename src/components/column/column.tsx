import React from "react";
import styled from "styled-components";
import ColumnCont from "./column_cont";

const Div = styled.div`
  background-color: #456;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  white-space: normal;
  width: 100%;
  max-width: 300px;
  min-width: 300px;
  margin: 8px;
`;
const Column = (props: any) => {
  return (
    <Div>
      <ColumnCont />
    </Div>
  );
};

export default Column;
