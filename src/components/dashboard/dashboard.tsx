import React, {useContext} from 'react';
import Column from "../column";
import CardModal from "../card_modal";
import styled from "styled-components";
import {Context} from "../../context";
import {DataType} from "../../types";

const Dashboard = ({trelloData}: { cardContent: number; trelloData: DataType }) => {
    const context = useContext(Context)

    return (
        <Main>
            {trelloData.columns.length > 0 ? (
                trelloData.columns.map((column) => (
                    <Column
                        key={column.id}
                        column={column}
                    />
                ))
            ) : (
                <>NOTHING TO SHOW</>
            )}

            {context.isCardVisible &&
            <CardModal cardId={0} columnId={0} />}
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
