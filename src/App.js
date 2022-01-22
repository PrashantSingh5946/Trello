import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

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
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default function App() {
  const [state, setState] = useState([{name:"All",items:getItems(10)}, {name:"In Progress",items:getItems(5, 10)}]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      //Not deleting the collection once it is empty
      //setState(newState.filter((group) => group.length));
    }
  }

  return (
    <div className="App">
      <div className="navbar"></div>
      <div className="container">
        <div className="collections-menu"></div>
        <div className="content board">
          <div>
            <button
              type="button"
              onClick={() => {
                setState([...state, {name:"New Category",items:[]}]);
              }}
            >
              Add new group
            </button>
            
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
                                      justifyContent: "space-around",
                                    }}
                                  >
                                    {item.content}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newState = [...state];
                                        newState[ind].items.splice(index, 1);
                                        setState(
                                          newState.ifilter(
                                            (group) => group.length
                                          )
                                        );
                                      }}
                                    >
                                      delete
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
                  </div>
                  </div>
                ))}
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
