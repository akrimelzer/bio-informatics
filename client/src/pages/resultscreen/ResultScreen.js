import React from "react";
import styles from "./ResultScreen.module.css";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

function ResultScreen() {
  const data = useLocation();
  const protein = data.protein;
  const genome = data.genome;

  const isValid = protein !== undefined && genome !== undefined;

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
      <p>
        {isValid &&
          "The result of " +
            protein.protein.name +
            " and genome " +
            genome +
            ":"}
        {!isValid &&
          "Not valid, protein or genome is undefined. Start over by pressing the Home-button."}
      </p>
    </div>
  );
}

export default ResultScreen;
