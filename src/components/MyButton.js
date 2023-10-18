import React from "react";
import styles from './MyButton.module.css'
function MyButton(props) {
    return (
        <button className={styles.MyButton} {...props}></button>
    );
}

export default MyButton;