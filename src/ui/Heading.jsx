import styled, { css } from "styled-components";


const Heading = styled.h1` // styled. html element
  ${props => props.as === "h1" &&  
    css`
      font-size:3rem;
      font-weight: 600;
      `} //Access to props
      //the css will format the code if we pass a large list of props that need to styled
  ${props => props.type === "h2" &&  
    css`
      font-size:2rem;
      font-weight: 600;
      `}
  ${props => props.type === "h3" &&  
    css`
      font-size:2rem;
      font-weight: 500;
      `}
  ${props => props.type === "h4" &&  
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align:center;
      `}
  line-height:1.4;
      
`;

export default Heading

