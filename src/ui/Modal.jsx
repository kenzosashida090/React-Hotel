/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import {useClickOutside} from "../hooks/useClickOutside";
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
 
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
//1. Create Context 

const ModalContext = createContext()

function Modal({children}){ //2.Create the parent component
  const [openName, setOpenName] = useState('')
  
 
  const close = () =>setOpenName("")
  const open = setOpenName

  return (
  <ModalContext.Provider value={{openName,close, open}}>
    {children}
  </ModalContext.Provider>)
} 
function Open ({children,opens: opensWindowName}){
  const {open } = useContext(ModalContext)
  return cloneElement(children, {onClick : ()=> open(opensWindowName)})
  //since we can not access to the button that opens the modal this is a tecnique 
  //that allows us to clone the children element and add some props  to it
}
function Window({children,name}) {
  //The main use of Portal is the reusability of this components maybe in some other place the overlfow will exist and then will be needed more css
  const {openName, close} = useContext(ModalContext)
  const ref = useClickOutside(close)
  
  if (name !== openName) return null
  return createPortal ( //createPortal allow react to place component anywere on the DOM 
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}><IoCloseOutline/></Button> {/**Close function from the context */}
        <div>
          {/** As same as the button to open the modal we need to find a way to pass the function to close the modal */}
          {/** Clone the children element to pass the close  fn as a prop*/}

          {cloneElement(children, {onClose:close})}
        </div>
      </StyledModal>
    </Overlay>,
    document.body // the place were we want to render this component
  )
}
Modal.Open = Open
Modal.Window = Window
export default Modal