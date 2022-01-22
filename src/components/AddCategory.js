import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
export default function AddCategory() {
  return (
    <div>
      <div className="addCategory">
        <span class="placeholder">
        <span style={{"marginRight":"5px"}}><FontAwesomeIcon icon={faPlus} /></span>Add another list
        </span>
      </div>
    </div>
  );
}
