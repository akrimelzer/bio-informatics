import React, { useState, useEffect } from 'react';
import styles from './ResultScreen.module.css';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import axios from 'axios';

function ResultScreen() {
  const [result, setResult] = useState('');
  const data = useLocation();
  const protein = data.protein;
  const genome = data.genome.text;
  const isValid = protein !== undefined && genome !== undefined;
  console.log(result);

  useEffect(() => {
    test();
  }, []);
  const test = async () => {
    await axios
      .post(`/matrix/${protein.protein.matrix_id}/PPM/5`, {
        dna: genome
      })
      .then(function(response) {
        let topArray = response.data;
        //let returnArray;
        if (topArray === 'Something went wrong. Sorry about that.') {
          console.log(topArray);
        } else {
          setResult({
            name: 'Results',
            params: {
              data: topArray
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const homeButton = (
    <div className={styles.homeButton}>
      <Link
        to={{
          pathname: '/'
        }}>
        <Button intent='primary' icon='home' minimal='true' large='true'>
          Home
        </Button>
      </Link>
    </div>
  );

  return (
    <div>
      {homeButton}
      <h1>Result</h1>
      <p>
        {isValid &&
          'The result of ' +
            protein.protein.name +
            ' and genome ' +
            genome +
            ':'}
        {!isValid &&
          'Not valid, protein or genome is undefined. Start over by pressing the Home-button.'}
      </p>
    </div>
  );
}

export default ResultScreen;
