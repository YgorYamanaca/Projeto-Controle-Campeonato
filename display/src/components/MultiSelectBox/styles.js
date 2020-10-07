import styled from 'styled-components';

export const ComponentContainer = styled.div`
    display: flex;
    max-width:500px;
    min-height:40px;
    padding: 5.5px;
`;

export const SelectedBox = styled.div`
    position: relative;
    display:flex;
    border: 1px solid grey;
    background-color: #f1f1f1;
    align-items: center;
    padding:5px 7px;
    
    color: ${props => props.placeHolder? 'black' : 'grey'};
    font-size:14px;
    font-family: "Roboto Condensed", sans-serif;
    font-weight:500;
    :hover{
        cursor:pointer;
    }
`;

export const OptionsBox = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    max-width:500px;
    min-height:40px;
    z-index: 10;
    border-top: 1px solid black;
    border-left: 1px solid black;
    margin-top:30px;
    & > div
    {
        border-bottom: 1px solid black;
        border-right: 1px solid black;
    }
`;

export const OptionBox = styled.div`
    display: flex;
    align-content:center;
    background-color:#f1f1f1;
    padding:5px;
    font-size:14px;
    font-family: "Roboto Condensed", sans-serif;
    font-weight:500;
    color:#081D16;
    :hover{
        cursor:pointer;
    }
`;