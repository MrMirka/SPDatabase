import React from "react";
import styles from './DatabaseList.module.css'
import DatabaseListItem from "./DatabaseListItem";

function DatabaseList({focusItem, setkey}) {
    const chapters = {
        players: 'Игроки',
        clubs: 'Клубы',
        unions: 'Сборные',
        events: 'Эвенты',
    }

    const handleChangeFocus = (key) => {
        focusItem(key)
        setkey(prev=>prev+1)
    }
    

    return (
        <div className={styles.DatabaseList}>
             {Object.entries(chapters).map(([key, value])=>{
                return <DatabaseListItem key = {key} title={value} onClick = {  () => handleChangeFocus(key) }></DatabaseListItem>   
             })}
        </div>
    );
}

export default DatabaseList;