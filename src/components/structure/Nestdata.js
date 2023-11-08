/**
 * Корневой компонент базы данных
 * содержит три окна
 * Коллекции
 * Список элементов коллекции
 * Содержимое элемента коллекции
 */
import React, { useEffect, useState } from "react";
import styles from './Nestdata.module.css'
import DatabaseList from "../DatabaseList";
import BaseBlockElements from "../common/BaseBlockElements";
import EditElement from "../ui/edits/EditElement";
import { useSelector } from "react-redux";
import { curentAuth } from "../../database/dataSlice";
import { useNavigate } from 'react-router-dom';

function NestedData() {
    const [selectCollection, setSelectCollection] = useState('players');
    const [focusElement, setFocusElement] = useState(null);
    const [isFocus, setIsFocus] = useState(false)
    const navigate = useNavigate();

    const authId = useSelector(curentAuth)
    useEffect(()=>{
        if(authId==null) {
            navigate('/')
        }
    },[authId])

  //useEffect(()=>{console.log(focusElement)},[focusElement])
    
    return (  
        <>
        {authId && <div className={styles.Nest}>
                <DatabaseList focusItem = { setSelectCollection }/>
                <BaseBlockElements currentCollection = { selectCollection } focusElement = {setFocusElement}/>
                <EditElement currentCollection = {selectCollection} currentElement = {focusElement}/>
            </div> }
            
        </>
    );
}

export default NestedData;