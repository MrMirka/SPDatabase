import React from "react";
import styles from "./ActionButton.module.css"
function ActionButton(  {onClick, title}) {
    return (
        <div className={styles.ActionButtonContainer}>
            <button onClick={onClick}>{title}</button>
        </div>
    );
}

export default ActionButton;