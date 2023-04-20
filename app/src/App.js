import { useState } from "react";

import { readFileFromInput } from "./utils/readFile.util";
import Table from "./components/table/Table";
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
      <h2>All Employees</h2>
      {data.length > 0 && <Table data={data} />}
    </div>
  );
}

export default App;
