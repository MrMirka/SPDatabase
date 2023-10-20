import React from "react";
import styles from './ListElement.module.css'
import ListItem from "./ListItem";

function ListElement({elements, focusElement}) {
    return (
        <div className={styles.ListElement}>
            {elements && elements.map((item)=> {
               return <ListItem key = {item.id} item = {item} focusElement = {focusElement}/>
        })}
        </div>
        
       
    );
}

export default ListElement;