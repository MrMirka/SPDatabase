import React from "react";
import styles from './DatabaseList.module.css'
import DatabaseListItem from "./DatabaseListItem";
import { Link, useNavigate } from 'react-router-dom';


function DatabaseList({focusItem}) {
    return (
        <div className={styles.DatabaseList}>
             <DatabaseListItem title={'Игроки'} onClick = {()=>{ focusItem('players') }}></DatabaseListItem>   
             <DatabaseListItem title={'Сборные'} onClick = {()=>{ focusItem('unions') }}></DatabaseListItem>   
             <DatabaseListItem title={'Клубы'} onClick = {()=>{ focusItem('clubs') }}></DatabaseListItem>      
             <DatabaseListItem title={'Эвенты'} onClick = {()=>{ focusItem('clubs') }}></DatabaseListItem>      
        </div>
    );
}

export default DatabaseList;