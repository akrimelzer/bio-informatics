import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import SearchResults from "./components/SearchResults";

import styles from "./App.module.css";

import { useApi } from "./hooks/api";

function App() {
  const { getMatrixes } = useApi();
  const [loading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [matrixes, setMatrixes] = useState([]);

  useEffect(() => {
    getMatrixes().then(matrix => {
      setMatrixes(matrix);
    });
  }, []);

  return (
    <div id="app" className={styles.app}>
      <h1 id="title" className={styles.title}>
        Mapping known transcription factor binding sites
      </h1>

      <div className={styles.inputWrapper}>
        <form
          className={styles.inputForm}
          autoComplete="off"
          onChange={event => {
            setSearchText(event.target.value);
          }}
        >
          <label>
            <FontAwesomeIcon icon={faSearch} />
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder={"Search for protein sequences..."}
            />
          </label>
        </form>
      </div>
      <SearchResults searchText={searchText} />
    </div>
  );
}

export default App;
