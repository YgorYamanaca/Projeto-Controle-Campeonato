import styled from 'styled-components';

export const LogoEditor = styled.img`
    width:250px;
    height:250px;
    margin:40px;
    -moz-animation:spin 10s linear infinite;
    animation:spin 10s linear infinite;
    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`;

export const HomeContainer = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    flex-direction:column;
    width:100%;
    height:100%;
    background-color:#fff;
`;

export const Descricao = styled.div`
    display:flex;
    color: white;
    font-style:sans-serif;
    font-size:40px;
    background-color:#00527E;
    border-radius:10px;
    padding-left:10px;
    padding-right:10px;
    margin:20px;
`;



