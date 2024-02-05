import React, { useEffect, useState } from "react";
import { getEmptyElement, getFields, getPlayerCloth, getPlayersByGroup } from "../../utils/Models";
import styles from './BaseBlockElements.module.css'
import ListElement from "../ui/list/ListElement";
import { useSelector, useDispatch } from 'react-redux';
import { curentPlayers, curentEvents, curentClubs, curentUnions, curentBanners } from '../../database/dataSlice'
import { setPlayers, setEvents, setClubs, setUnions, setBanners } from "../../database/dataSlice";
import { fetchCollection, getStructure } from "../../utils/Repository";
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
    const banners = useSelector(curentBanners)
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
        events: setEvents,
        banners: setBanners
    };

    const dataMap = {
        players: players,
        clubs: clubs,
        unions: unions,
        events: events,
        banners: banners
    };

    function dispatchElements(dataPlayers, dataClubs, dataUnions, dataEvents, dataBanners) {
        const players = actionMap['players'];
        const clubs = actionMap['clubs'];
        const unions = actionMap['unions'];
        const events = actionMap['events'];
        const banners = actionMap['banners'];

        dispatch(players(dataPlayers));
        dispatch(clubs(dataClubs));
        dispatch(unions(dataUnions));
        dispatch(events(dataEvents));
        dispatch(banners(dataBanners));
    }

    /* useEffect(() => {
        if (players) {
            const fPlayers = getPlayersByGroup(players, 'Арсенал')
            if(fPlayers) {
                const urlCloth1 = getPlayerCloth(fPlayers[0], true, true)
                const urlCloth2 = getPlayerCloth(fPlayers[0], true, false)
                const urlCloth3 = getPlayerCloth(fPlayers[0], false, true)
                const urlCloth4 = getPlayerCloth(fPlayers[0], false, false)
                console.log(urlCloth1)
                console.log(urlCloth2)
                console.log(urlCloth3)
                console.log(urlCloth4)
            }
        }

    }, [players]) */



    /**
     * Обновляем дынные если были внесены измененния
     */
    useEffect(() => {
        //console.log(currentCollection)
        const data = dataMap[currentCollection];
        if (data) {
            //console.log(data)
            setSelectElements(data);
        }
    }, [players, clubs, unions, events, banners, currentCollection]);

    /**
     * Получаем данные коллекции с сервера
     */
    const getGroups = async () => {
        if (!players || !clubs || !events || !unions || !banners) {
            setIsLoading(true);
            const { dataPlayers, dataClubs, dataUnions, dataEvents, dataBanners } = await fetchAllData()
            if (dataPlayers && dataClubs && dataUnions && dataEvents && dataBanners) {
                dispatchElements(dataPlayers, dataClubs, dataUnions, dataEvents, dataBanners);
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