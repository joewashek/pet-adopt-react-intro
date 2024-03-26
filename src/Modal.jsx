import { useEffect,useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({children}) => {
  const elRef = useRef(null);
  // we always want the same div
  // we don't set directly, because we don't want to run docuemnt.createElement over and over (performance)
  if(!elRef.current){
    elRef.current = document.createElement('div');
  }

  useEffect(()=>{
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    // always ran when component using useEffect does an unmount
    // anything you return will be ran, when component unmounted from DOM
    // cancel timers, remove listeners, and other cleanup
    return () => modalRoot.removeChild(elRef.current);
  },[]);

  return createPortal(<div>{children}</div>,elRef.current);
}

export default Modal;