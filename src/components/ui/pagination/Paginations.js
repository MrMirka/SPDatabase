import React from "react";
import styles from './Paginations.module.css'
import PagItem from "./PagItem";
function Paginations({data}) {
    return (
        <div className={styles.Pagination}>
            {data && data.map((item) => {
                return <PagItem key = { item } item = { item }></PagItem>
            })}
        </div>
    );
}

export default Paginations;