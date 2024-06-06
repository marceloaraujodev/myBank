import { useEffect, useRef, useContext } from "react";
import UserContext from '../UserContext';

export default function Modal({message, children}) {
  const { 
    isOpen,
    setIsOpen,
    isLoan,
    isTransfer,
    setIsTransfer,
    setIsLoan
  } = useContext(UserContext);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if(isOpen){
      // console.log(dialogRef.current)
      dialog.showModal();
    }else{
      dialog.close();
    }
  }, [isOpen])

  function handleClick(){
    // setIsOpen(!isOpen)
    // setIsTransfer(!isLoan)
    // setIsLoan(!isTransfer)
    setIsOpen(false)
    setIsTransfer(false)
    setIsLoan(false);
  }


  return (
    <>
    {isOpen && <div className="modal-overlay"></div>}

      <dialog ref={dialogRef} onClick={handleClick} className="modal">
      <div className="modal-content-container">
        <p>{message}</p>
        <div className="modal-btn-container">
          {children}
        </div>
      </div>
    </dialog>
    </>

  );
}