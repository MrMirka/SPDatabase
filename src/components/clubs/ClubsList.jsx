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


function ClubsList() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');

    const players = useSelector(curentPlayers)
    const dispatch = useDispatch()
    

    const [clubsData, setClubsData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPlayersOpen, setIsPlayersModalOpen] = useState(false);
    const [focusPlayer, setFocusPlayer] = useState(null)
    const [dataForEdit, setDataForEdit] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [isPlayers, setIsPlayers] = useState(name === 'players');
   

 
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };


    const getGroups = async () => {
        setIsLoading(true);
        try {
            const collectionData = await fetchCollection(name);
            const data = getFields(collectionData, isPlayers);
            if(isPlayers) {
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

    useEffect(()=>{console.log(`Игрочки ${players}`)},[players])

    useEffect(()=> {getGroups()},[]); 

    const getEdit = (id, name, imageUrl) => {
        setDataForEdit({
            id: id,
            name: name,
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
            <h1>{name}</h1>
            <button onClick={newRecord}>New {name}</button>
            { isModalOpen && <ModalGroup title ={name} isOpen={isModalOpen} onClose={toggleModal} dataForEdit = {dataForEdit} />}
            { isPlayersOpen && <PlayerEditPhoto title = {"Настройка формы"} onClose = { () => setIsPlayersModalOpen((v) => !v) } player = {focusPlayer} setPlayer = {setFocusPlayer}/>}
            {players.map((value) => {
                return (
                <ClubItem 
                    key = {value.id} 
                    title = {value.name} 
                    imageUrl = {value.logoURL}
                    onEdit={() => getEdit(value.id, value.name, value.logoURL)}
                    onDelete={() => deleteItem(value.id, name)}
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