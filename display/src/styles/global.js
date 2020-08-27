import { createGlobalStyle } from 'styled-components';
export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}


body, html, #root{
    font-family:"Roboto Condensed", sans-serif;
    background-color: #A1ADC4;
    font-size: 15px;
    -webkit-font-smoothing: antialiased !important;
    text-rendering: optimizeLegibility !important;
}

button{
    cursor: pointer;
}
`;
