import React, { useState, useEffect, memo } from 'react';
import styles from './DropList.module.css'

const DropListFlex = memo(({ title, list, element, setElement }) => {
    const [currentValue, setCurrentValue] = useState('');
    useEffect(()=>{console.log(list)},[])

    useEffect(() => {
        if (list.length > 0 ) {
            const firstItemId = list[0].name;
            setCurrentValue(firstItemId);
            setElement(firstItemId);
        } else {
            setCurrentValue(element);
        }
    }, []);


    const handleElementChange =(event) => {
        setElement(event.target.value );
        setCurrentValue(event.target.value );
    }

    return (
        <div className={styles.container}>
            <span className={styles.title}>{title}</span>
            <select value={currentValue} onChange={handleElementChange}>
            {list.map((item) => (
                <option key={item.id} value={item.name}>{item.name}</option>
            ))}
        </select>
        </div>
        
    );
},
    (prevProps, nextProps) => {
        return prevProps.element === nextProps.element && prevProps.list === nextProps.list;
    });

export default DropListFlex;
