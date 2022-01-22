import "./App.css";
import Collection from "./components/Collection";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  function onDragEnd(result) {
    const { source, destination } = result;
    alert("Hi")

    // dropped outside the list
    if (!destination) {
      return;
    }
    
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    console.log(sInd+" "+dInd)
  }
  return (
    <div className="App">
      <div className="navbar"></div>
      <div className="container">
        <div className="collections-menu"></div>
        <div className="content">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
              <Collection
                name="All"
                tasks={[
                  { name: "Random task" },
                  { name: "Random task" },
                  { name: "Random task" },
                  { name: "Random task" },
                  { name: "Random task" },
                  { name: "Random task" },
                  { name: "Random task" },
                  { name: "Random task" },
                  { name: "Random task" },
                  { name: "Random task" },
                  { name: "Random task" },
                  { name: "Random task" },
                  { name: "Random task" },
                  { name: "Random task" },
                ]}
              ></Collection>
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;
