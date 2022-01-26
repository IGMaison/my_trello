import React from "react";
import styled from "styled-components";
import ColumnCont from "./column_cont";

const Column = () => {
  return (
    <ColumnWraper>
      <ColumnCont />
    </ColumnWraper>
  );
};

export default Column;

const ColumnWraper = styled.div`
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
