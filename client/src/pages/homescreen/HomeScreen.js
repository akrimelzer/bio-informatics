import React, { useEffect, useState } from 'react';
import { Dialog, Button, InputGroup, Spinner } from '@blueprintjs/core';
import SearchResults from '../../components/SearchResults';

import styles from './HomeScreen.module.css';

import { useApi } from '../../hooks/api';

function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const { getMatrixes } = useApi();
  const [open, setOpen] = useState(false);
  const [protein, setProtein] = useState('');
  const [searchText, setSearchText] = useState('');
  const [matrixes, setMatrixes] = useState([]);

  useEffect(() => {
    getMatrixes().then((matrix) => {
      setMatrixes(matrix.results);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (protein) => {
    setProtein(protein);
    setOpen(true);
  };
  return !loading ? (
    <div id='app' className={styles.app}>
      <Dialog isOpen={open} style={{ alignItems: 'center' }}>
        <h1>{protein}</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
          <Button
            onClick={() => setOpen(false)}
            intent='danger'
            minimal='true'
            icon='cross'>
            Close
          </Button>
          <Button intent='success' minimal='true' icon='arrow-right'>
            Continue
          </Button>
        </div>
      </Dialog>
      <h1 id='title' className={styles.title}>
        Mapping known transcription factor binding sites
      </h1>

      <div className={styles.inputWrapper}>
        <InputGroup
          type='search'
          leftIcon='search'
          placeholder='Search for protein sequences...'
          large='true'
          onChange={(e) => setSearchText(e.target.value)}></InputGroup>
      </div>
      <SearchResults
        openModal={openModal}
        searchText={searchText}
        matrixes={matrixes}
        search={searchText}
      />
    </div>
  ) : (
    <div className={styles.spinner}>
      <Spinner size='70' intent='primary' />
    </div>
  );
}

export default HomeScreen;
