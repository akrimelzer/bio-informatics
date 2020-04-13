import React, { useEffect, useState } from "react";
import InfoDialog from "../../components/InfoModal";
import { InputGroup, Spinner } from "@blueprintjs/core";
import SearchResults from "../../components/SearchResults";

import styles from "./HomeScreen.module.css";

import { useApi } from "../../hooks/api";

function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const { getMatrixes } = useApi();
  const [open, setOpen] = useState(false);
  const [protein, setProtein] = useState("");
  const [searchText, setSearchText] = useState("");
  const [matrixes, setMatrixes] = useState([]);

  //  passed data on redirect from genome-page back to homescreen
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

  const closeModal = () => {
    setOpen(false);
  };
  return !loading ? (
    <div id="app" className={styles.app}>
      <InfoDialog isOpen={open} protein={protein} close={closeModal} />
      <h1 id="title" className={styles.title}>
        Mapping known transcription factor binding sites
      </h1>
      <p>
        Choose between the sequences below or search for a specific sequence.
      </p>

      <div className={styles.inputWrapper}>
        <InputGroup
          type="search"
          leftIcon="search"
          placeholder="Search for protein sequences..."
          large="true"
          onChange={(e) => setSearchText(e.target.value)}
        ></InputGroup>
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
      <Spinner size="70" intent="primary" />
    </div>
  );
}

export default HomeScreen;
