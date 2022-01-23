import React,{useRef} from 'react';
import CloseIcon from '@mui/icons-material/Close';


export default function Modal({submitHandler,closeHandler}) {
    const nameRef = useRef();
    function onSubmit(e)
    {
        e.preventDefault();
        submitHandler(nameRef.current.value);
        closeHandler();
    }
  return (<div className='modalBackdrop'>
  <form className="addBoard" onSubmit={onSubmit}>
     <div className="row">
       <input type="text" placeholder="Board name" ref={nameRef} autoFocus></input>
     </div>
     <div className="row">
         <button type="submit">Add Board</button>
         <span className="close" onClick={closeHandler}><CloseIcon></CloseIcon></span>
         
     </div>
   </form>

</div>)
  
}
