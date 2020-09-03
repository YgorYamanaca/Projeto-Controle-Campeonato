import styled from 'styled-components';

export const PlayerTableContainer = styled.div`
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
`;
export const PlayerTableFooter = styled.div`
    display:flex;
    background-color: #00527E;
    margin-top: auto;
    padding:10px;
`;
export const PlayerTableRowSty = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    font-family: "Roboto Condensed";
    font-weight: 500;
    font-size:18px;
    border-right: 1px solid #003049;
    :hover
    {
        border-top: 1px solid #003049;
        border-right: 2px solid #003049;
        border-left: 1px solid #003049;
        border-bottom: 1px solid #003049;
        cursor: pointer
    }
`;
export const PlayerTableHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    font-family: "Roboto Condensed";
    font-weight: 500;
    font-size:18px;
    border-top: 1px solid #003049;
    border-right: 1px solid #003049;
    cursor:default;
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
    background-color: ${props => props.styless === 'Par'? '#ddd' : '#ccc'};
    border-left: 1px solid #003049;
    border-bottom: 1px solid #003049;
    padding:2px 2px;
    color:#081D16;
`;
export const PlayerEditCell = styled.div`
    display: flex;
    justify-content: center;
    background-color:#ddd;
    border-left: 1px solid #003049;
    border-bottom: 1px solid #003049;
    padding:2px 2px;
    color:#081D16;
    :hover
    {
        border-left: 2px solid #003049;
        border-bottom: 2px solid #003049;
        border-top: 1px solid #003049;
        border-right: 1px solid #003049;
        cursor: pointer
    }
`;
export const PlayerEditTableRowSty = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    font-family: "Roboto Condensed";
    font-weight: 500;
    font-size:18px;
    border-right: 1px solid #003049;
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
    justify-content: space-around;
    width:100%;
    margin-top:25px;
`;

export const EditBox = styled.div`
    display:flex;
    position:absolute;
    background-color:rgba(0, 0, 0, 0.3);
    z-index:999;
    height:100%;
    width:100%;
    align-items:center;
    justify-content:center;
`;

export const Edit = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
    color: #ffff;
    height:90%;
    width:98%;
    border-radius: 10px;
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.5);
    overflow: hidden;
    font-family: "Roboto Condensed";
    font-weight: 700;
    font-size:20px;
`;

export const EditTitle = styled.div`
    display: flex;
    background-color: #00527E;
    justify-content: center;
    height: 35px;
    align-items: center;
`;

export const EditContent = styled.div`
    display: flex;
    margin:15px;
    color:#081D16;
    font-size:19px;
    font-family: "Roboto Condensed", sans-serif;
`;

export const InputBox = styled.div`
    display: flex;
    height: 35px;
    background-color: #00527E;  
    border-radius: 10px;
    padding:0 5px;
    overflow: hidden;
    margin:5px;
    align-items: center;

    input
    {
        border-color: transparent;
        background-color: #f1f1f1;
        color:#081D16;
        margin: 0 5px;
        padding:1px 5px;
        font-size:14px;
        font-family: "Roboto Condensed", sans-serif;
        :focus::placeholder
        {
            color:transparent
        }
    }

    label
    {
        font-weight: 500;
        color: #ffff;
        font-size:16px;
    }
`;

