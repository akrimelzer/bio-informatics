import React from "react";
import styles from "./ResultScreen.module.css";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

function ResultScreen() {
  const data = useLocation();

  console.log(data);

  const homeButton = (
    <div className={styles.homeButton}>
      <Link
        to={{
          pathname: "/"
        }}
      >
        <Button intent="primary" icon="home" minimal="true" large="true">
          Home
        </Button>
      </Link>
    </div>
  );

  return (
    <div>
      {homeButton}
      <h1>Result</h1>
    </div>
  );
}

export default ResultScreen;
