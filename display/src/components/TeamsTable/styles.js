import styled from 'styled-components';

export const TeamTableContainer = styled.div`
    display: flex;
    position:relative;
    flex-direction: column;
    min-width: 850px;
    height: 500px;
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
export const TeamTableTitle = styled.div`
    display: flex;
    background-color: #00527E;
    justify-content: center;
    height: 35px;
    align-items: center;
`;
export const TeamTableContent = styled.div`
    margin:15px 15px 0 15px;
    display: flex;
    flex-direction: column;
`;
export const TeamTableFooter = styled.div`
    display:flex;
    background-color: #00527E;
    margin-top: auto;
    padding:10px;
`;
export const TeamTableRowSty = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    font-family: "Roboto Condensed";
    font-weight: 500;
    font-size:18px;
    border-right: 1px solid #003049;
    :hover
    {
        border: 1px solid #030056;
        cursor: pointer
    }
`;
export const TeamTableHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    font-family: "Roboto Condensed";
    font-weight: 500;
    font-size:18px;
    border-top: 1px solid #003049;
    border-right: 1px solid #003049;
    cursor:default;
`;
export const TeamHeader = styled.div`
    display: flex;
    justify-content: center;
    background-color: #00527E;
    border-left: 1px solid #003049;
    border-bottom: 1px solid #003049;
    padding:2px 2px;
`;
export const TeamCell = styled.div`
    display: flex;
    justify-content: center;
    background-color: #f1f1f1;
    border-left: 1px solid #003049;
    border-bottom: 1px solid #003049;
    padding:2px 2px;
    color:#081D16;
`;
export const TeamRowEmpety = styled.div`
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
export const DialogSty = styled.div`
    display: flex;
    position: absolute;
    background-color:rgba(0, 0, 0, 0.3);
    z-index:999;
    height:100%;
    width:100%;
    align-items:center;
    justify-content:center;
`;

export const DialogBoxSty = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
    justify-content:center;
    align-items:center;
    color: #003049;
    height:25%;
    width:50%;
    border-radius: 10px;
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.5);
    padding:25px 10px;
`;

export const ContentSty = styled.div`
    display: flex; 
`;

export const FooterSty = styled.div`
    display: flex;
    margin-top:25px;
`;

