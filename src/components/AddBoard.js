import React, { useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { faPlus,faTimes } from "@fortawesome/free-solid-svg-icons";

export default function AddBoard({addBoard}) {
  const [isFormVisible, setFormVisibility] = useState(false);
  const nameRef = useRef();
  function submitHandler(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    addBoard(name);
    setFormVisibility(false);
  }

  return (
    <div>
      <form className="addCollection" onSubmit={submitHandler}>
        <div className="row">
          <input
            type="text"
            placeholder="Enter Board title..."
            ref={nameRef}
          ></input>
        </div>
        <div className="row">
          <button type="submit">Add Board</button>
          <span
            className="close"
            onClick={() => {
              setFormVisibility(false);
            }}
          >
            <CloseIcon></CloseIcon>
          </span>
        </div>
      </form>
    </div>
  );
}
