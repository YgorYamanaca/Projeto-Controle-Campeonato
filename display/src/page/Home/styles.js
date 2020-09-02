import styled from 'styled-components';

export const LogoEditor = styled.img`
    width:250px;
    height:250px;
    margin-top:90px;
    -moz-animation:spin 4s linear infinite;
    animation:spin 4s linear infinite;
    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`;

export const HomeContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    width:100%;
    height:100%;
  
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
  

`;



