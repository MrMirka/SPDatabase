import React, { useEffect, useState } from "react";
import { getEmptyElement, getFields } from "../../utils/Models";
import styles from './BaseBlockElements.module.css'
import ListElement from "../ui/ListElement";
import { useSelector, useDispatch } from 'react-redux';
import { curentPlayers, curentEvents, curentClubs, curentUnions } from '../../database/dataSlice'
import { setPlayers, setEvents, setClubs, setUnions } from "../../database/dataSlice";
import { fetchCollection } from "../../utils/Repository";
import MyLoader from "../helpers/MyLoader";
import SearchInput from "../ui/SearchInput";

function BaseBlockElements({ currentCollection, focusElement }) {
    const [isLoading, setIsLoading] = useState(false);
    const [selectElements, setSelectElements] = useState([]);
    const players = useSelector(curentPlayers)
    const clubs = useSelector(curentClubs)
    const unions = useSelector(curentUnions)
    const events = useSelector(curentEvents)
    const [searchValue, setSearchValue] = useState("")


    const dispatch = useDispatch()

    const newRecordHundler = () => {
        const emptyRecord = getEmptyElement(currentCollection === 'players')
        console.log(emptyRecord)
        focusElement(emptyRecord)
    }


    const actionMap = {
        players: setPlayers,
        clubs: setClubs,
        unions: setUnions,
        events: setEvents
    };

    const dataMap = {
        players: players,
        clubs: clubs,
        unions: unions,
        events: events
    };

    function setElements(data) {
        const action = actionMap[currentCollection];
        if (action) {
            dispatch(action(data));
        }
    }

    /**
     * Обновляем дынные если были внесены измененния
     */
    useEffect(() => {
        const data = dataMap[currentCollection];
        if (data) {
            setSelectElements(data);
        }
    }, [players, clubs, unions, events, currentCollection]);

    /**
     * Получаем данные коллекции с сервера
     */
    const getGroups = async () => {
        setIsLoading(true);
        try {
            const collectionData = await fetchCollection(currentCollection);
            const data = getFields(collectionData, currentCollection === 'players');
            if (data) {
                setElements(data);
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }
    useEffect(() => { getGroups() }, [currentCollection]); //Фокус коллекции при клике

    const filteredElements = selectElements.filter(element => 
        element.name.toLowerCase().includes(searchValue.toLowerCase())
    );


    return (
        <>

            <div className={styles.BaseBlockElements}>

                <div className={styles.Loader}>
                    {isLoading && <MyLoader />}
                    <SearchInput value ={searchValue} setValue = {setSearchValue}/>
                    <button onClick={newRecordHundler}>Добавить</button>
                </div>
                <div></div>
               
                <ListElement elements={filteredElements} focusElement={focusElement} />
            </div>


        </>

    );
}

export default BaseBlockElements;