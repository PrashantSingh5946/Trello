import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTimes } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from '@mui/icons-material/Close';

export default function AddCategory({addCategory}) {
  const [isFormVisible, setFormVisibility] = useState(false);
  const nameRef = useRef();
  function submitHandler(e)
  {
      e.preventDefault();
      const name = nameRef.current.value;
      addCategory(name)
      setFormVisibility(false)

  }
  return (
    <div className="">
      {!isFormVisible && (
        <div
          className="addCategory"
          onClick={() => {
            setFormVisibility(true);
          }}
        >
          <span className="placeholder">
            <span style={{ marginRight: "5px" }}>
              <FontAwesomeIcon icon={faPlus} />
            </span>
            Add another list
          </span>
        </div>
      )}
      {isFormVisible && (
        <form className="addList" onSubmit={submitHandler}>
          <div className="row">
            <input type="text" placeholder="Enter list title..." ref={nameRef}></input>
          </div>
          <div className="row">
              <button type="submit">Add List</button>
              <span className="close" onClick={()=>{setFormVisibility(false)}}><CloseIcon></CloseIcon></span>
              
          </div>
        </form>
      )}
    </div>
  );
}
