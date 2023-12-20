/**
 * Корневой компонент базы данных
 * содержит три окна
 * Коллекции
 * Список элементов коллекции
 * Содержимое элемента коллекции
 */
import React, { useEffect, useState } from "react";
import styles from './Nestdata.module.css'
import DatabaseList from "../menu/DatabaseList";
import BaseBlockElements from "../common/BaseBlockElements";
import EditElement from "../baseItem/EditElement";
import { useSelector } from "react-redux";
import { curentAuth } from "../../database/dataSlice";
import { useNavigate } from 'react-router-dom';

function NestedData() {
    const [selectCollection, setSelectCollection] = useState('players');
    const [focusElement, setFocusElement] = useState(null);
    const [editkey, setEditKey] = useState(0)
  
    const navigate = useNavigate();

    const authId = useSelector(curentAuth)
    useEffect(()=>{
        if(authId==null) {
            navigate('/')
        }
    },[authId])


    
    return (  
        <>
        {authId && <div className={styles.Nest}>
                <DatabaseList focusItem = { setSelectCollection} setkey = {setEditKey}/>
                <BaseBlockElements currentCollection = { selectCollection } focusElement = {setFocusElement}/>
                <EditElement  key = {editkey} currentCollection = {selectCollection} currentElement = {focusElement}/>
            </div> }
            
        </>
    );
}

export default NestedData;