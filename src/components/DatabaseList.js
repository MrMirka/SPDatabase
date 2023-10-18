import React from "react";
import styles from './DatabaseList.module.css'
import DatabaseListItem from "./DatabaseListItem";
import { Link, useNavigate } from 'react-router-dom';


function DatabaseList() {
    const navigate = useNavigate();
    const clubs = "clubs";
    const unions = "unions";
    const players = "players";
    return (
        <div className={styles.DatabaseList}>
             <DatabaseListItem title={'Игроки'} onClick = {()=>{navigate(`groups?name=${players}`)}}></DatabaseListItem>   
             <DatabaseListItem title={'Сборные'} onClick = {()=>{navigate(`groups?name=${unions}`)}}></DatabaseListItem>   
             <DatabaseListItem title={'Клубы'} onClick = {()=>{navigate(`groups?name=${clubs}`)}}></DatabaseListItem>      
        </div>
    );
}

export default DatabaseList;