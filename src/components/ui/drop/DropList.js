import React, { useState, useEffect, memo, useCallback } from 'react';
import styles from './DropList.module.css'

const DropList = memo(({ title, type, list, element, selectItem }) => {
    const [currentValue, setCurrentValue] = useState('');
    const key = type === 'club' ? 'club' : 'union';

    useEffect(() => {
        if (list.length > 0 && !element[key]) {
            const firstItemId = list[0].name;
            setCurrentValue(firstItemId);
            selectItem(prevElement => ({ ...prevElement, [key]: firstItemId }));
        } else {
            setCurrentValue(element[key] ?? '');
        }
    }, [element, key, list, selectItem]);


    const handleElementChange =(event) => {
        selectItem((prevElement) => ({ ...prevElement, [key]: event.target.value }));
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
        return prevProps.element.club === nextProps.element.club && prevProps.element.union === nextProps.element.union;
    });

export default DropList;
