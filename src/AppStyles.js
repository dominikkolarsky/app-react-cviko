import styled from "styled-components";

export const PageContainer = styled.div`
   display: flex;
   margin: 0px auto;
   max-width: 1200px;
   width: 100%;
   min-height: 100vh;
   justify-content: center;
   align-items: center;
`;
export const Formular = styled.form`
   background-color: rgb(19, 51, 61);
   width: 800px;
   min-height: 800px;
   border: 1px solid black;
   padding: 20px;
   display: grid;
   grid-template-columns: 1fr;
   grid-template-areas:
      'nadpis'
      'vyber'
      'doba'
      'extra'
      'kalkulace';
   gap: 20px;
`;
export const FormSection = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   background-color: lightgray;
   padding: 20px;
   border-radius: 10px;
   &:nth-child(1){
      grid-area: nadpis;
   }
   &:nth-child(2){
      grid-area: vyber;
   }
   &:nth-child(3){
      grid-area: doba;
   }
   &:nth-child(4){
      grid-area: extra;
   }
   &:nth-child(5){
      grid-area: kalkulace;
   }

`;
export const SectionTitle = styled.h2`
   color: black;
   font-size: 20px;
   margin: 0px;
   padding: 0;
   padding-bottom: 10px;
`;
export const MainTitle = styled(SectionTitle)`
   font-size: 30px;
   align-self: center;
   justify-self: center;
`;
export const InputDiv = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: center;
`;

export const KontrolaButton = styled.div`
    display: flex;
    align-self: center;
    padding: 5px 50px;
    margin-top: 20px;
    border-radius: 10px;
    cursor: pointer;
    align-content: center;
    background-color: #505050;
   ${props => {
      if (props.checked == 1) {
         return `
         background-color: green;
     
      `;
      }
      else if (props.checked == 2) {
         return `
         background-color: red;
      `;
      }
   }}
`;


