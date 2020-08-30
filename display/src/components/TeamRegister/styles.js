import styled from 'styled-components';

export const TeamRegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 850px;
    min-height: 150px;
    background-color: #ffff;
    color: #ffff;
    margin: 10px;
    border-radius: 10px;
    border: 3px solid #f1f1f1;
    font-family: "Roboto Condensed";
    font-weight: 700;
    font-size:20px;
`;
export const TeamRegisterTitle = styled.div`
    display: flex;
    background-color: #00527E;
    justify-content: center;
    height: 35px;
    align-items: center;
    border-radius: 10px 10px 0px 0px;
`;

export const TeamRegisterContent = styled.div`
    padding:10px;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const TeamInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 10px 10px 15px 10px;
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

export const TeamRegisterFooter = styled.div`
    display:flex;
    background-color: #00527E;
    margin-bottom: auto;
    padding:10px;
    border-radius: 0px 0px 10px 10px;
`;