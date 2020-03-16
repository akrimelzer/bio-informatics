import React, { useEffect, useState } from "react";
import styles from "./SearchResults.module.css";

import { useApi } from "../hooks/api";

function SearchResults(props) {
  const { getFilteredMatrixes } = useApi();
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);

  // TODO: Only search on enter? Veldig treig ellers

  useEffect(() => {
    setText(props.searchText);

    getFilteredMatrixes(props.searchText).then(result => {
      console.log(result);
      setResults(result);
      //setResults([{ id: "ARF27" }, { id: "ARF28" }, { id: "ARF29" }]);
    });
  }, [props.searchText]);

  const Result = protein => {
    console.log("Result", protein);
    return (
      <div
        key={protein.matrix_id}
        onClick={() => console.log("click", protein.protein.id)}
      >
        <p>{protein.protein.name}</p>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {results.map(result => {
        return <Result key={result.matrix_id} protein={result} />;
      })}
    </div>
  );
}

export default SearchResults;
