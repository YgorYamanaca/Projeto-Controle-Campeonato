import styled from 'styled-components';

export const AppButtonContainer = styled.button`
    height: 30px;
    background-color: #00527E;
    border: 2px solid #fff;
    border-radius: 10px;
    padding: 1.5px 10px;
    margin: 1px 5px;
    font-size:19px;
    font-family: "Roboto Condensed", sans-serif;
    color:#fff;
    :hover
    {
        cursor:pointer;
    }
    :focus
    {
        outline: none;
    }
    :active
    {
        transform: scale(0.95);
        box-shadow: -2px 3px 15px -5px rgba(0,0,0,0.3);
    }
`;
