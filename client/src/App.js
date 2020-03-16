import React, { useEffect, useState } from 'react';
import { Dialog, Button, InputGroup } from '@blueprintjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchResults from './components/SearchResults';

import styles from './App.module.css';

import { useApi } from './hooks/api';

function App() {
  const { getMatrixes } = useApi();
  const [open, setOpen] = useState(false);
  const [protein, setProtein] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [matrixes, setMatrixes] = useState([]);

  useEffect(() => {
    getMatrixes().then((matrix) => {
      setMatrixes(matrix);
    });
  }, []);

  const openModal = (protein) => {
    setProtein(protein);
    setOpen(true);
  };
  return (
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
          intent='primary'
          large='true'
          onChange={(e) => setSearchText(e.target.value)}></InputGroup>
      </div>
      <SearchResults openModal={openModal} searchText={searchText} />
    </div>
  );
}

export default App;
