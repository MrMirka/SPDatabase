import React from "react";
import styles from './DatabaseList.module.css'
import DatabaseListItem from "./DatabaseListItem";

function DatabaseList({focusItem}) {
    const chapters = {
        players: 'Игроки',
        clubs: 'Клубы',
        unions: 'Сборные',
        events: 'Эвенты',
    }

    return (
        <div className={styles.DatabaseList}>
             {Object.entries(chapters).map(([key, value])=>{
                return <DatabaseListItem key = {key} title={value} onClick = {()=>{ focusItem(key) }}></DatabaseListItem>   
             })}
        </div>
    );
}

export default DatabaseList;