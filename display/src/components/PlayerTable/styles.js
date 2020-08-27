import styled from 'styled-components';

export const PlayerTableContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 850px;
    background-color: #ffff;
    color: #ffff;
    margin: 10px;
    border-radius: 10px;
    border: 3px solid #f1f1f1;
    font-family: "Roboto Condensed";
    font-weight: 700;
    font-size:20px;
    overflow: hidden;
`;
export const PlayerTableTitle = styled.div`
    display: flex;
    background-color: #00527E;
    justify-content: center;
    height: 35px;
    align-items: center;
`;
export const PlayerTableContent = styled.div`
    margin:15px 15px 0 15px;
    display: flex;
    flex-direction: column;
    max-height: 400px;
`;
export const PlayerTableFooter = styled.div`
    display:flex;
    background-color: #00527E;
    margin-bottom: auto;
    padding:10px;
    margin-top: 15px;
`;
export const PlayerTableSty = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    font-family: "Roboto Condensed";
    font-weight: 500;
    font-size:18px;
    border-top: 1px solid #003049;
    border-right: 1px solid #003049;
`;
export const PlayerHeader = styled.div`
    display: flex;
    justify-content: center;
    background-color: #00527E;
    border-left: 1px solid #003049;
    border-bottom: 1px solid #003049;
    padding:2px 2px;
`;
export const PlayerCell = styled.div`
    display: flex;
    justify-content: center;
    background-color: #f1f1f1;
    border-left: 1px solid #003049;
    border-bottom: 1px solid #003049;
    padding:2px 2px;
    color:#081D16;
`;
export const PlayerRowEmpety = styled.div`
    display: flex;
    justify-content: center;
    background-color: #f1f1f1;
    border-left: 1px solid #003049;
    border-bottom: 1px solid #003049;
    border-right: 1px solid #003049;
    height: 25px;
    margin:0px 15px 15px 15px;
    color:grey;
    font-weight:500;
`;
