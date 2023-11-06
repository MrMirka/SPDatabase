import React from "react";
import styles from './CounturButton.module.css'
function CounturButton(props) {
    return (
        <button className={styles.CounturButton} {...props}></button>
    );
}

export default CounturButton;