import styled from 'styled-components';

export const ComponentBox = styled.div`
    display: flex;
    height: 35px;
    background-color: #00527E;  
    border-radius: 10px;
    padding:0 5px;
    margin:5px;
    align-items: center;
`;
export const ComponentTitle = styled.label`
    font-weight: 500;
    color: #ffff;
    font-size:16px;
`;
export const ComponentContainer = styled.div`
    display: flex;
    position: relative;
    margin:0 5px;
    background-color: #f1f1f1; 
    padding:1px 5px;
    align-items: center;
    color:#104130;
    height: 23px;
    width: 150px;
    font-size:14px;
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 500;
    :hover
    {
        cursor: pointer;
    }
`;

export const OptionsContainer = styled.div`
    position: absolute;
    flex-direction: column;
    background-color: #f1f1f1;
    left: 0;
    top: 25px;
    width: 150px; 
    border:3px solid #00527E;
`;

export const OptionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color:#104130;
    height: 25px;
    font-size:14px;
    font-family: "Roboto Condensed", sans-serif;
    :hover
    {
        background-color: #00527E;
        cursor:pointer;
    }
`;
