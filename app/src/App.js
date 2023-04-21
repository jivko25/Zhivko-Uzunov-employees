import { useEffect, useState } from "react";

import { readFileFromInput } from "./utils/readFile.util";
import Table from "./components/table/Table";
import "./App.css";
import Container from "./components/container/Container.jsx";

function App() {
  const [data, setData] = useState([]);
  const [longestCollaboration, setLongestCollaboration] = useState({
    emp1: 0,
    emp2: 0,
    days: 0,
  });

  const handleChangeInput = (event) => {
    readFileFromInput(event.target.files[0], (val) => setData(val));
  };

  const handleSortEmployees = () => {
    const uniqueProjects = [...new Set(data.map((item) => item.ProjectID))];
    let longestCollaboration = { emp1: 0, emp2: 0, days: 0 };

    const sortedProjects = uniqueProjects.map((projectId) => {
      const project = data.filter((item) => item.ProjectID === projectId)[0];
      const employees = data
        .filter((item) => item.ProjectID === projectId)
        .map((el) => el.EmpId);
      const time =
        (Date.parse(project.DateTo) - Date.parse(project.DateFrom)) /
        (1000 * 3600 * 24);

      return { id: projectId, employees, time };
    });

    [...new Set(data.map((item) => item.EmpId))].map((item, index, arr) => {
      const items = arr
        .filter((element) => element !== item)
        .map((el) => {
          const days = sortedProjects.reduce((acc, cur) => {
            if (cur.employees.includes(item) && cur.employees.includes(el)) {
              return acc + cur.time;
            }
            return acc;
          }, 0);

          if (days > longestCollaboration.days) {
            longestCollaboration = { emp1: item, emp2: el, days: days };
          }

          return { id: el, time: days };
        });
      return { id: item, items };
    });

    setLongestCollaboration(longestCollaboration);
  };

  useEffect(() => {
    handleSortEmployees();
  }, [data]);

  return (
    <Container>
      <input type="file" onChange={handleChangeInput} />
      {data.length > 0 && (
        <>
          <h2>
            Longest collaboration between Employee with id{" "}
            {longestCollaboration.emp1} and Employee with id{" "}
            {longestCollaboration.emp2} for {longestCollaboration.days}
          </h2>
          <h2>All Employees</h2>
        </>
      )}
      {data.length > 0 && <Table data={data} />}
    </Container>
  );
}

export default App;
