import styled from 'styled-components';

export const UserContainer = styled.div`
    display: flex;
    justify-content:center;
    background-color:rgba(255, 255, 255, 0.5);
    margin: 10px;
    border-radius: 10px;
    border: 2px dotted ${props => props.status === 'Success'? 'green' : 'red'};
    padding:10px;
    margin:3px;
    font-size:14px;
    font-family: "Roboto Condensed", sans-serif;
`;
