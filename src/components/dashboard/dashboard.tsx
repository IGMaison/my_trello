import React, {useContext} from 'react';
import Column from "../column";
import Card from "../card";
import styled from "styled-components";
import {DataType} from "../services";
import {CardContent} from "../services/storage_service";
import {Context} from "../../context";

const Dashboard = ({cardContent, trelloData}: { cardContent: CardContent; trelloData: DataType }) => {
    const context = useContext(Context)

    return (
        <Main>
            {Object.keys(trelloData.columns).length > 0 ? (
                Object.keys(trelloData.columns).map((key) => (
                    <Column
                        key={key}
                        id={key}
                        columnContent={trelloData.columns[key]}
                    />
                ))
            ) : (
                <>NOTHING TO SHOW</>
            )}

            {context.isCardVisible &&
            <Card cardArrIdx={Infinity} isNewCard={true} columnId={''} {...cardContent} />}
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
