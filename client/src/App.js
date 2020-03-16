import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { useApi } from "./hooks/api";

function App() {
  const { getMatrixes } = useApi();
  const [matrixes, setMatrixes] = useState([]);

  useEffect(() => {
    getMatrixes().then(matrix => {
      setMatrixes(matrix);
    });
  }, []);

  console.log(matrixes);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{matrixes.count}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </header>
    </div>
  );
}

export default App;
