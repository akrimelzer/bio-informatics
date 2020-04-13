import React from "react";
import { Link } from "react-router-dom";
import { Dialog, Button } from "@blueprintjs/core";
import styles from "./InfoModal.module.css";

function InfoModal(props) {
  const protein = props.protein;

  return (
    <Dialog
      isOpen={props.isOpen}
      onClose={props.close}
      canOutsideClickClose="true"
      className={styles.dialog}
      title={`${props.protein.name}`}
    >
      <div className={styles.informationWrapper}>
        <div className={styles.information}>
          <p className={styles.bold}>Collection:</p>
          <p>{props.protein.collection}</p>
          <p className={styles.bold}>Base ID:</p>
          <p>{props.protein.base_id}</p>
          <p className={styles.bold}>More info:</p>
          <a href={props.protein.url}>{props.protein.url}</a>
        </div>
        <img src={props.protein.sequence_logo} alt="logo" />
      </div>

      <div className={styles.continueText}>
        <p>
          Continue to choose which genome to find the most likely transcription
          factor binding sites with this protein.
        </p>
      </div>

      <div className={styles.buttons}>
        <Link
          to={{
            pathname: "/genome",
            protein: { protein },
          }}
        >
          <Button
            intent="primary"
            icon="arrow-right"
            minimal="true"
            large="true"
          >
            Continue
          </Button>
        </Link>
      </div>
    </Dialog>
  );
}
export default InfoModal;
