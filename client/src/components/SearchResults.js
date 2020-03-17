import React from 'react';
import { Button } from '@blueprintjs/core';
import { Colors } from '@blueprintjs/core';
import styles from './SearchResults.module.css';

function SearchResults(props) {
  const Result = (protein) => {
    return (
      <Button
        onClick={() => props.openModal(protein.protein.name)}
        key={protein.matrix_id}
        intent='primary'
        large='true'
        style={{
          color: 'white',
          height: '30px',
          lineHeight: '5px',
          marginBottom: '5px'
        }}>
        {protein.protein.name}
      </Button>
    );
  };
  //  New array based on the search-text from input

  let filteredMatrixes = props.matrixes.filter((protein) => {
    return protein.name.indexOf(props.search) !== -1;
  });

  return (
    <div className={styles.container}>
      {filteredMatrixes.map((result) => {
        return <Result key={result.matrix_id} protein={result} />;
      })}
    </div>
  );
}

export default SearchResults;
