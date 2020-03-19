import React from 'react';
import { Card } from '@blueprintjs/core';

import styles from './SearchResults.module.css';

function SearchResults(props) {
  const Result = (protein) => {
    return (
      <Card
        onClick={() => props.openModal(protein.protein)}
        key={protein.matrix_id}
        large='true'
        interactive='true'
        style={{
          height: '30px',
          lineHeight: '5px',
          marginBottom: '5px',
          color: 'grey'
        }}>
        {protein.protein.name}
      </Card>
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
