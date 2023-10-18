import React from "react";
import styles from './ErrorBlock.module.css'
function ErrorBlock({error}) {
    return (
        <div className={styles.ErrorBlockContainer}>
            <span className={styles.ErrorBlock}>{error}</span>
        </div>
    );
}

export default ErrorBlock;