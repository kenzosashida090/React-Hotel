/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({filterField, options}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentFilter = searchParams.get(filterField)  || options.at(0).value // we use this const to set the active button of the current filter
  function handleClick(value) {
    searchParams.set(filterField, value) //we set the param on the url that will be a discount param
    setSearchParams(searchParams) // we set te query & params to the value that we pass 
    //url = localhost:3000/cabins?discount={value}
    //discount is the param that we set and the value is the query. The query set an specific value of the param discount
  }
  return (
    <StyledFilter>
      {options.map((option)=> <FilterButton disabled={currentFilter === option.value} active={currentFilter === option.value } key={option.value} onClick={()=>handleClick(option.value)}>{option.label}</FilterButton>)}
      {/** Manipulate the option string to set the text button, Capitalize the first letter and then the other worrd */}
    </StyledFilter>
  )
}

export default Filter
