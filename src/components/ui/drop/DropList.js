import React, { useState, useEffect, memo } from 'react';

const DropList = memo(({ type, list, element, selectItem }) => {
    const [currentValue, setCurrentValue] = useState('');
    const key = type === 'club' ? 'club' : 'union';
    useEffect(() => {
        // Установка текущего значения, если element[key] не определено и list не пустой
        if (list.length > 0 && !element[key]) {
            const firstItemId = list[0].name;
            setCurrentValue(firstItemId);
            // Обновление element с новым значением
            selectItem(prevElement => ({ ...prevElement, [key]: firstItemId }));
        } else {
            // Если element[key] уже установлено, используем его значение
            setCurrentValue(element[key] ?? '');
        }
    }, [element, key, list, selectItem]);

    const handleSelect = (event) => {
        selectItem(prevElement => ({ ...prevElement, [key]: event.target.value }));
    };

    return (
        <select value={currentValue} onChange={handleSelect}>
            {list.map((item) => (
                <option key={item.id} value={item.name}>{item.name}</option>
            ))}
        </select>
    );
});

export default DropList;
