import React, { useEffect, useState } from "react";
import { getEmptyElement, getFields } from "../../utils/Models";
import styles from './BaseBlockElements.module.css'
import ListElement from "../ui/list/ListElement";
import { useSelector, useDispatch } from 'react-redux';
import { curentPlayers, curentEvents, curentClubs, curentUnions } from '../../database/dataSlice'
import { setPlayers, setEvents, setClubs, setUnions } from "../../database/dataSlice";
import { fetchCollection } from "../../utils/Repository";
import MyLoader from "../helpers/MyLoader";
import SearchInput from "../ui/search/SearchInput";
import { fetchAllData } from "../../utils/Controllers";

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
        const emptyRecord = getEmptyElement(currentCollection)
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

    function dispatchElements(dataPlayers, dataClubs, dataUnions, dataEvents) {
        const players = actionMap['players'];
        const clubs = actionMap['clubs'];
        const unions = actionMap['unions'];
        const events = actionMap['events'];

        dispatch(players(dataPlayers));
        dispatch(clubs(dataClubs));
        dispatch(unions(dataUnions));
        dispatch(events(dataEvents));
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
        if (!players || !clubs || !events || !unions) {
            setIsLoading(true);
            const { dataPlayers, dataClubs, dataUnions, dataEvents } = await fetchAllData()
            if (dataPlayers && dataClubs && dataUnions && dataEvents) {
                console.log(dataPlayers)
                dispatchElements(dataPlayers, dataClubs, dataUnions, dataEvents);
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
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
                    <SearchInput value={searchValue} setValue={setSearchValue} />
                    <button onClick={newRecordHundler}>Добавить</button>
                </div>
                <ListElement elements={filteredElements} focusElement={focusElement} />
            </div>
        </>

    );
}

export default BaseBlockElements;