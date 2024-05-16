/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

import { RxDotsVertical } from "react-icons/rx";
import styled from "styled-components";
import { useClickOutside } from "../hooks/useClickOutside";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext()
function Menus({children}) {
  const [openId, setOpenId] = useState("")
  const [position, setPosition] = useState(null)
  const close = ()=>setOpenId("")
  const open = setOpenId // pass the fucntion to set the id that open the menu of the cabin row
 
  return (
    <MenusContext.Provider value={{openId, close,open, position, setPosition}}>
      {children}
    </MenusContext.Provider>
  )
}

function Toggle({id}) {
  const {open,close, openId, setPosition} = useContext(MenusContext)
 
  function handleClick (e){
      openId === "" || openId !== id ? open(id) : close(); // if there is no id or is different of the actual value of the id from the context then open otherwise close the menu

      const rect = e.target.closest("button").getBoundingClientRect(); // to open the menu List component near the button that we toggle
      //rect returns an object with the position (x,y) of the nearest button with this position whe coould aproach the menu list to that button
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: 8 + rect.height + rect.y
      })
    }
  return <StyledToggle onClick={handleClick}>
    <RxDotsVertical/>
  </StyledToggle>
}
function List({id,children}) {
  const {openId, position,close} = useContext(MenusContext)
  const ref = useClickOutside(close)
  if (id !== openId) return null
  return createPortal(
    

    <StyledList ref={ref}  position={position}>{children}</StyledList>, document.body
    
  )
}

function Button({children,icon, onClick}){
  const {close} = useContext(MenusContext)
  function handleClick(){
    onClick?.()
    close()
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
       <span>
         {children} 
       </span> 
      </StyledButton>
    </li>)
}

Menus.Menu = StyledMenu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button
export default Menus
