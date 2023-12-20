import React from "react";
import styles from './MyInput.module.css'

function MyInput(props) {
    return (
        <input className={styles.MyInput} {...props}></input>
    );
}

export default MyInput;