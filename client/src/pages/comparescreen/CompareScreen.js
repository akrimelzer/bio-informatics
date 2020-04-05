import React, { useState, useEffect } from 'react';
import { Radio, RadioGroup, TextArea, Button } from '@blueprintjs/core';
import { useLocation, Link } from 'react-router-dom';
import styles from './CompareScreen.module.css';
import { streptococcus_r6, chromosome_1 } from '../../var.js';

function CompareScreen() {
  const [protein, setProtein] = useState('');
  const [text, setText] = useState('');
  const [selected, setSelected] = useState('custom');
  const data = useLocation();

  useEffect(() => {
    if (data.protein) {
      setProtein(data.protein.protein);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeSelectedValue = (e) => {
    if (e.currentTarget.value === 'human') {
      setSelected('human');
      setText(chromosome_1.replace(/(\r\n|\n|\r)/gm, ''));
    } else if (e.currentTarget.value === 'strepto') {
      setSelected('strepto');
      setText(streptococcus_r6.replace(/(\r\n|\n|\r)/gm, ''));
    } else {
      setSelected('custom');
      setText('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Select Genome</h1>
      </div>
      <h3>Selected protein:</h3>
      <div className={styles.protein}>
        <h4>{protein.name}</h4>
        <Link to='/'>
          <Button
            icon='exchange'
            intent='primary'
            minimal='false'
            style={{ marginTop: '13px', marginLeft: '10px' }}>
            Change
          </Button>
        </Link>
      </div>
      <div className={styles.genomeWrapper}>
        <p style={{ textAlign: 'start' }}>
          Select one one the predefined genomes or chose custom to use a custom
          genome:
        </p>
        <div className={styles.radioGroup}>
          <RadioGroup
            inline='true'
            onChange={(e) => changeSelectedValue(e)}
            selectedValue={selected}>
            <Radio
              label='Human (Chromosome 1)'
              value='human'
              large='true'></Radio>
            <Radio label='Streptococcus' value='strepto' large='true'></Radio>
            <Radio label='Custom' value='custom' large='true'></Radio>
          </RadioGroup>
        </div>
        <div className={styles.textInput}>
          <p style={{ textAlign: 'start' }}>Insert the sequence here:</p>
          <TextArea
            style={{ height: '250px' }}
            growVertically={false}
            large={true}
            fill={true}
            small={true}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className={styles.buttons}>
          <div className={styles.backButton}>
            <Link
              to={{
                pathname: '/',
              }}>
              <Button
                intent='primary'
                icon='arrow-left'
                minimal='true'
                large='true'>
                Go back
              </Button>
            </Link>
          </div>
          <div className={styles.continueButton}>
            <Link
              to={{
                pathname: '/results',
                protein: { protein },
                genome: selected,
                dna: { text },
              }}>
              <Button
                intent='primary'
                icon='arrow-right'
                minimal='true'
                large='true'>
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareScreen;
