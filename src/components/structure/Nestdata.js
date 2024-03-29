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
import { getStructure } from "../../utils/Repository";
import BannerConstructor from "../baseItem/BannerConstructor";

function NestedData() {
    const [selectCollection, setSelectCollection] = useState('players');
    const [focusElement, setFocusElement] = useState(null);

    const navigate = useNavigate();

    const store = async () => {
        //console.log(await getStructure())
    }

   //useEffect(()=>{console.log(focusElement)},[focusElement])

    const authId = useSelector(curentAuth)
    useEffect(() => {
        if (authId == null) {
            navigate('/')
        }
    }, [authId])

    useEffect(() => {
        store()
    }, [])



    return (
        <>
            {authId && <div className={styles.Nest}>
                <DatabaseList focusItem={setSelectCollection} />
                <BaseBlockElements currentCollection={selectCollection} focusElement={setFocusElement} />
                {selectCollection !== 'banners' ?
                    <EditElement currentCollection={selectCollection} currentElement={focusElement} /> :
                    <BannerConstructor currentCollection={selectCollection} element={focusElement} />}
                {/* <EditElement   currentCollection = {selectCollection} currentElement = {focusElement}/> */}
            </div>}

        </>
    );
}

export default NestedData;