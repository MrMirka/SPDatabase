import React, { useEffect, useState } from "react";
import { fetchCollection } from "../../utils/Repository";
import styles from './ClubsList.module.css'
import { getFields } from "../../utils/Models";
import ClubItem from "./ClubItem";
import MyLoader from "../helpers/MyLoader";
import { useLocation } from 'react-router-dom';
import ModalGroup from "../helpers/modals/ModalGroup";
import { deleteItem } from "../../utils/Controllers";
import PlayerEditPhoto from "../helpers/modals/PlayerEditPhoto";
import { useSelector, useDispatch } from 'react-redux';
import { curentPlayers } from '../../database/dataSlice'
import { setPlayers } from "../../database/dataSlice";


function ClubsList({currentCollection}) {

    const players = useSelector(curentPlayers)
    const dispatch = useDispatch()
    

    const [clubsData, setClubsData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPlayersOpen, setIsPlayersModalOpen] = useState(false);
    const [focusPlayer, setFocusPlayer] = useState(null)
    const [dataForEdit, setDataForEdit] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [isPlayers, setIsPlayers] = useState(currentCollection === 'players');
   

 
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };


    const getGroups = async () => {
        setIsLoading(true);
        try {
            const collectionData = await fetchCollection(currentCollection);
            const data = getFields(collectionData, isPlayers);
            if(currentCollection === 'players') {
                console.log("ddssd")
                dispatch(setPlayers(data))
            }
            setTimeout(() => {
                setClubsData(data)
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    useEffect(()=> {getGroups()},[currentCollection]); 

    const getEdit = (id, currentCollection, imageUrl) => {
        setDataForEdit({
            id: id,
            name: currentCollection,
            imageUrl: imageUrl
        }) 
        toggleModal();
    }

    const newRecord = () => {
        setDataForEdit(null);
        toggleModal();
    }

    /**
     * Открывает модальное окно в котором можно назначать изображения с формой игроков
     * @param {*} player 
     */
    const editPlayer = (player) => {
        setFocusPlayer(player)
        setIsPlayersModalOpen((v) => !v)
    }


    return (
         <>
        {!isLoading ? (<div className={styles.ClubsList}>
            <button onClick={newRecord}>New {currentCollection}</button>
            { isModalOpen && <ModalGroup title ={currentCollection} isOpen={isModalOpen} onClose={toggleModal} dataForEdit = {dataForEdit} />}
            { isPlayersOpen && <PlayerEditPhoto title = {"Настройка формы"} onClose = { () => setIsPlayersModalOpen((v) => !v) } player = {focusPlayer} setPlayer = {setFocusPlayer}/>}
            {players && players.map((value) => {
                return (
                <ClubItem 
                    key = {value.id} 
                    title = {value.name} 
                    imageUrl = {value.logoURL}
                    onEdit={() => getEdit(value.id, value.name, value.logoURL)}
                    onDelete={() => deleteItem(value.id, currentCollection)}
                    isPlayer = {isPlayers}
                    editPlayer = { () => editPlayer(value)}/>
                )
            })}
        </div>) :(
            <div style={{display:"flex", flexDirection: "column", alignItems:"center", justifyContent:"center", height:"100vh"}}>
             <MyLoader/ >
            </div>
            ) }
        
        </> 
    );
}

export default ClubsList;