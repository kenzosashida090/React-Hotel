/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;
function Select({options,value, onChange ,...props}) { // spread the rest of the props (...props). In this case {type:"white"}
  return (
    <StyledSelect value={value} onChange={onChange} {...props} >
      {options.map((op)=><option value={op.value} key={op.value}> {op.label}</option>)}
    </StyledSelect>
  )
}

export default Select
