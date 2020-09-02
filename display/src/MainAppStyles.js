import styled from 'styled-components';

export const HomePageSty = styled.div`
        display: flex;
        flex-direction: column;
        min-width: 850px;
        min-height: 750px;
        background-color: #ffff;
        color: #ffff;
        margin: 10px;
        border-radius: 10px;
        border: 3px solid #f1f1f1;
        overflow: hidden;
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
            color:#EAE2B7;
        }
    }
    
`;

export const TopTextStyle = styled.a`
    font-family: "Roboto Condensed";
    font-weight: 700;
    font-size:20px;
`;
