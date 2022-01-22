import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {v4} from "uuid";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import AddCategory from "./components/AddCategory";

// fake data generator
const getItems = (count, offset = 0) => {
  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: v4(),
    content: `item ${k + offset}`,
  }));
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source.items);
  const destClone = Array.from(destination.items);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

export default function App() {
  const [state, setState] = useState([
    { id:v4(),name: "All", items: getItems(10) },
    { id:v4(),name: "In Progress", items: getItems(5, 10) },
  ]);

  function addItem(collectionId)
  {
      const newState = [...state];
      const index = state.findIndex((collection)=>collection.id===collectionId)
      newState[index].items.push({id:`${v4}`,content:"New Item"})
      setState(newState)
  }

  function onDragEnd(result) {

    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd].items, source.index, destination.index);
      const newState = [...state];
      newState[sInd].items = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd].items = result[sInd];
      newState[dInd].items = result[dInd];
      setState(newState);
    }
  }

  return (
    <div className="App">
      <div className="navbar"></div>
      <div className="container">
        <div className="collections-menu"></div>
        <div className="content board">
          <div>
            

            <div style={{ display: "flex" }}>
              <DragDropContext onDragEnd={onDragEnd}>
                {state.map((el, ind) => (
                  <div className="collection">
                    <div className="collection-wrapper">
                      <div className="header">
                        <h2>{el.name}</h2>
                      </div>
                      <Droppable key={ind} droppableId={`${ind}`}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            className="list"
                            // style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                          >
                            {el.items.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="list-card"
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      {item.content}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newState = [...state];
                                          newState[ind].items.splice(index, 1);
                                          setState(newState);
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      <div className="addItem" onClick={() =>{addItem(el.id)}}>+ Add a Card</div>
                    </div>
                  </div>
                ))
                }
                <div className="collection">
              <AddCategory/>
                </div>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
