import "./App.css";
import Collection from "./components/Collection";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  return (
    <div className="App">
      <div className="navbar"></div>
      <div className="container">
        <div className="collections-menu"></div>
        <div className="content">
        <DragDropContext onDragEnd={() => {}}>
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
