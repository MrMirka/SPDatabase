import React from "react";
import styles from './DatabaseListItem.module.css'

function DatabaseListItem({title, onClick}) {
    return (
        <div className={styles.DatabaseListItem} onClick={onClick}>
            <p>{title}</p>
        </div>
    );
}

export default DatabaseListItem;