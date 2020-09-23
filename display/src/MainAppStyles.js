import styled from 'styled-components';

export const HomePageSty = styled.div`
        display: flex;
        flex-direction: column;
        min-width: 850px;
        background-color: #EAE2B7;
        color: #ffff;
        margin: 10px;
        border-radius: 10px;
        border: 3px solid #EAE2B7;
        overflow: hidden;
        padding:5px;
`;

export const HomeContentSty = styled.div`
    
`;

export const HomeTopSty = styled.div`
    display: flex;
    background-color: #003049;
    padding:15px;
    justify-content:space-around;
    a 
    {
        font-family: "Roboto Condensed";
        font-weight: 700;
        font-size:20px;
        color:#ffff;
        :hover
        {
            color:#FCBF49;
        }
    }
    
`;

export const TopTextStyle = styled.a`
    font-family: "Roboto Condensed";
    font-weight: 700;
    font-size:20px;
`;
