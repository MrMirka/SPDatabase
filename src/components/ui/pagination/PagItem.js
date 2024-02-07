import React from "react";
import styles from './Paginations.module.css'

function PagItem({item}) {
    return (
        <span className={styles.Item}>{item}</span>
    );
}

export default PagItem;