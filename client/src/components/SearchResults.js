import React, { useEffect, useState } from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import { Colors } from '@blueprintjs/core';
import styles from './SearchResults.module.css';

import { useApi } from '../hooks/api';

function SearchResults(props) {
  const { getFilteredMatrixes } = useApi();
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);

  // TODO: Only search on enter? Veldig treig ellers

  useEffect(() => {
    getFilteredMatrixes(props.searchText).then((result) => {
      setResults(result);
      //setResults([{ id: "ARF27" }, { id: "ARF28" }, { id: "ARF29" }]);
    });
  }, [props.searchText]);

  useEffect(() => {
    setText(props.searchText);
  }, []);

  const Result = (protein) => {
    console.log('Result', protein);
    return (
      <div
        onClick={() => props.openModal(protein.protein.name)}
        key={protein.matrix_id}
        class='bp3-card bp3-elevation-0 bp3-interactive .modifier'
        style={{
          backgroundColor: Colors.BLUE3,
          color: 'white',
          width: '300px',
          height: '30px',
          lineHeight: '5px',
          marginBottom: '5px'
        }}>
        {protein.protein.name}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {results.map((result) => {
        return <Result key={result.matrix_id} protein={result} />;
      })}
    </div>
  );
}

export default SearchResults;
