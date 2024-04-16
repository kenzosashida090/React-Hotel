import styled, { css } from "styled-components";

const Row = styled.div`
    display:flex;
    ${props=>props.type === "horizontal" && css`
        justify-content:space-between;
        align-items:center
    `
    }
    ${props=>props.type === "vertical" && css`
        flex-direction:column;
        gap:1.6rem;
    `
    }
    `;

//AS WE KNOW ROW IS A REACT COMPONENT AND SO WE CAN SET A DEFAULT PROPS INTO IT

Row.defaultProps = {
    type:"vertical",// if there is no prop type in the Row component by default will be set vertical
}
export default Row