import React, { useEffect, useState } from "react";
import styles from './Nestdata.module.css'
import DatabaseList from "../DatabaseList";
import BaseBlockElements from "../common/BaseBlockElements";
import EditElement from "../ui/edits/EditElement";

function NestedData() {
    const [selectCollection, setSelectCollection] = useState('players');
    const [focusElement, setFocusElement] = useState(null);

    useEffect(()=>{
        console.log(focusElement)
    },[focusElement])
    
    return (  
        <>
            <div className={styles.Nest}>
                <DatabaseList focusItem = { setSelectCollection }/>
                <BaseBlockElements currentCollection = { selectCollection } focusElement = {setFocusElement}/>
                <EditElement currentCollection = {selectCollection} currentElement = {focusElement}/>
            </div>
        </>
    );
}

export default NestedData;