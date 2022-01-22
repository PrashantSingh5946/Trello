import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Collection({ tasks, name }) {
  return (
    <div className="collection">
      <div className="header">
        <h2>{name}</h2>
        <div className="ellipsis">&#8230;</div>
      </div>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId={`100`}>
          {(provided) => {
            return (
              <div
                className="list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Draggable key={index} draggableId={`id-${index}`} index={index}>
                    {(provided) => (
                      <div
                        className="list-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.name+index}
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
      <div className="addItem">+ Add a Card</div>
    </div>
  );
}
