import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTimes } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from '@mui/icons-material/Close';

export default function AddCategory() {
  const [isFormVisible, setFormVisibility] = useState(false);
  return (
    <div className="">
      {!isFormVisible && (
        <div
          className="addCategory"
          onClick={() => {
            setFormVisibility(true);
          }}
        >
          <span class="placeholder">
            <span style={{ marginRight: "5px" }}>
              <FontAwesomeIcon icon={faPlus} />
            </span>
            Add another list
          </span>
        </div>
      )}
      {isFormVisible && (
        <form className="addList">
          <div className="row">
            <input type="text" placeholder="Enter list title..."></input>
          </div>
          <div className="row">
              <button>Add List</button>
              <span className="close" onClick={()=>{setFormVisibility(false)}}><CloseIcon></CloseIcon></span>
              
          </div>
        </form>
      )}
    </div>
  );
}
