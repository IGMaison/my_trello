import React, {useContext} from 'react';
import Column from "../column";
import CardModal from "../card_modal";
import styled from "styled-components";
import {Context} from "../../context";
import {DataType} from "../../types";

type PropsType = { trelloData: DataType }

const Dashboard : React.FC<PropsType> = ({trelloData}) => {
    const context = useContext(Context)
    return (
        <Main>
            {trelloData.columns.length > 0 ? (
                trelloData.columns.map((column) => {
                    return (
                        <Column
                            key={column.id}
                            columnId={column.id}
                            column={column}
                        >{column.id}</Column>
                    )
                })
            ) : (
                <>NOTHING TO SHOW</>
            )}

            {context.isCardVisible &&
            <CardModal cardModal={context.cardModal}/>}
        </Main>
    );
}

export default Dashboard;

const Main = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  color: #172b4d;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  width: fit-content;
`;
