import React from "react";
import styles from './DatabaseListItem.module.css'

function DatabaseListItem({title, onClick}) {
    return (
        <div className={styles.DatabaseListItem} onClick={onClick}>
            <h2>{title}</h2>
        </div>
    );
}

export default DatabaseListItem;