import { useEffect, useRef } from "react";

export function useClickOutside(handler, listeningCapturing = true) {
  //lsiteningCapturing solves the bug that every time we click will search
  // for the dom element if it goes down to up will open and close instantly\
  // setting to true will go up  to down 
    const ref = useRef()
    useEffect(
        function(){
          function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target) ) {
              // if the dom element exists (StyledModal) and the click occurs outside the dom element
              handler()
              
            }
          }
          document.addEventListener("click", handleClick,listeningCapturing);// the third argument solves the  problem of clicking on elements inside StyledModal cause it bubbles up isntead of going down to search
           return () => document.removeEventListener("click", handleClick,listeningCapturing); //remove after it's done
      }, [handler, listeningCapturing]);

      return ref
}


