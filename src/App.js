import { useState } from "react";
import "./App.css";
import ExampleComponent from "./components/ExampleComponent";
// Import your component here

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {/* Feel free to delete this component and this comment */}
      <ExampleComponent title="This is the title" />
      {/* Add your component here */}
    </div>
  );
}

export default App;
