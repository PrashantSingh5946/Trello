import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSwatchbook } from "@fortawesome/free-solid-svg-icons";
import AddCategory from "./components/AddCategory";
import AddBoard from "./components/AddBoard";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

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
    { id: v4(), name: "All", items: getItems(10) },
    { id: v4(), name: "In Progress", items: getItems(5, 10) },
  ]);

  function addItem(collectionId) {
    const newState = [...state];
    const index = state.findIndex(
      (collection) => collection.id === collectionId
    );
    newState[index].items.push({ id: `${v4}`, content: "New Item" });
    setState(newState);
  }

  function addCategory(name) {
    setState([...state, { id: v4(), name: name, items: [] }]);
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
      <div className="navbar">
      <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C4 4.44772 4.44772 4 5 4H7C7.55228 4 8 4.44772 8 5V7C8 7.55228 7.55228 8 7 8H5C4.44772 8 4 7.55228 4 7V5ZM4 11C4 10.4477 4.44772 10 5 10H7C7.55228 10 8 10.4477 8 11V13C8 13.5523 7.55228 14 7 14H5C4.44772 14 4 13.5523 4 13V11ZM11 4C10.4477 4 10 4.44772 10 5V7C10 7.55228 10.4477 8 11 8H13C13.5523 8 14 7.55228 14 7V5C14 4.44772 13.5523 4 13 4H11ZM10 11C10 10.4477 10.4477 10 11 10H13C13.5523 10 14 10.4477 14 11V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V11ZM17 4C16.4477 4 16 4.44772 16 5V7C16 7.55228 16.4477 8 17 8H19C19.5523 8 20 7.55228 20 7V5C20 4.44772 19.5523 4 19 4H17ZM16 11C16 10.4477 16.4477 10 17 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H17C16.4477 14 16 13.5523 16 13V11ZM5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H7C7.55228 20 8 19.5523 8 19V17C8 16.4477 7.55228 16 7 16H5ZM10 17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V17ZM17 16C16.4477 16 16 16.4477 16 17V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H17Z" fill="currentColor"></path></svg>
        <div className="banner">
          <FontAwesomeIcon icon={faSwatchbook}></FontAwesomeIcon>
          <span>Boards</span>
        </div>
        <div className="boardNames">
          <div>Board 1</div>
          <div>Board 2</div>
        </div>
      </div>
      <div className="container">
        <div className="collections-menu">
          <span className="boardsMenu">
            <span style={{ marginRight: "5px" }}>
              <FontAwesomeIcon icon={faPlus} />
            </span>
            Add another list
          </span>
          <AddBoard addBoard={() => {}} />
        </div>
        <div className="content board">
          <DragDropContext onDragEnd={onDragEnd}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1rem",
                alignItems: "flex-start",
              }}
            >
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
                    <div
                      className="addItem"
                      onClick={() => {
                        addItem(el.id);
                      }}
                    >
                      + Add a Card
                    </div>
                  </div>
                </div>
              ))}
              <div className="collection">
                <AddCategory text="Add a list" addCategory={addCategory} />
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
