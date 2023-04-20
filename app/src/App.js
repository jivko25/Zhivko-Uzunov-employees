import { useState } from "react";

import { readFileFromInput } from "./utils/readFile.util";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => {
          readFileFromInput(e.target.files[0], (val) => setData(val));
        }}
      />
    </div>
  );
}

export default App;
