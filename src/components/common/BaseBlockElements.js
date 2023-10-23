import React, { useEffect, useState } from "react";
import { getFields } from "../../utils/Models";
import styles from './BaseBlockElements.module.css'
import ListElement from "../ui/ListElement";
import { useSelector, useDispatch } from 'react-redux';
import { curentPlayers, curentEvents, curentClubs, curentUnions } from '../../database/dataSlice'
import { setPlayers, setEvents, setClubs, setUnions } from "../../database/dataSlice";
import { fetchCollection } from "../../utils/Repository";
import MyLoader from "../helpers/MyLoader";

function BaseBlockElements({ currentCollection, focusElement }) {
    const [isLoading, setIsLoading] = useState(false);
    const [selectElements, setSelectElements] = useState([]);
    const players = useSelector(curentPlayers)
    const clubs = useSelector(curentClubs)
    const unions = useSelector(curentUnions)
    const events = useSelector(curentEvents)


    const dispatch = useDispatch()


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

    useEffect(() => {
        const data = dataMap[currentCollection];
        if (data) {
            setSelectElements(data);
        }
    }, [players, clubs, unions, events, currentCollection]);

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
    useEffect(() => { getGroups() }, [currentCollection]);
    return (
        <>

            <div className={styles.BaseBlockElements}>

                <div className={styles.Loader}>
                    {isLoading && <MyLoader />}
                </div>

                <ListElement elements={selectElements} focusElement={focusElement} />
            </div>


        </>

    );
}

export default BaseBlockElements;