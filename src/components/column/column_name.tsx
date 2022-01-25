import React from "react";
import styled from "styled-components";

const Div = styled.div`
  color: black;
  margin: 0;
  padding: 0.2em 1em;
  font-size: 15px;
  font-weight: 600;
  padding: 10 px 8 px;
  min-height: 20px;
  text-align: left;
`;
const ColumnName = (props: any) => {
  return <Div>Заголовок колонки</Div>;
};

export default ColumnName;
