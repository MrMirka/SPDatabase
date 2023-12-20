import { getFields } from "./Models";
import { addGroup, addGroup2, deleteDocumentById, fetchCollection, updateGroup, updateGroup2, updatePlayerUniform, uploadToFirebase } from "./Repository";

/**
 * Создваем запись в коллекции
 * @param {*} obj объкт к записи
 * @param {*} title название коллекции
 * @param {*} callBack калбек
 */
export const makeGroup = async (obj, title, callBack) => {
  try {
    let status;
    if (obj.id !== "") {
      status = await updateGroup2(obj, title);
    } else {
      status = await addGroup2(obj, title);
    }
    callBack(status)
  } catch (error) {
    console.log(error)
    callBack(false)
  }
}

export const editPlayerUniforms = async (id, player, groupName, callback) => {
  try {
    let status;
    status = await updatePlayerUniform(id, player, groupName);
    callback(status);
  } catch (error) {
    console.log(error);
    callback(false);
  }
}

/**
 * Загружаем один файл в FireStorage
 * @param {*} file файл
 * @param {*} title 
 * @param {*} callBack возвращаем URL
 */
export const uploadFile = async (file, title, callBack) => {
  try {
    const url = await uploadToFirebase(file, title)
    callBack(url);
  } catch (error) {
    console.log(error)
    callBack(null);
  }
};

/**
 * Удаляем запись из базы данных
 * @param {*} id 
 * @param {*} collectionName 
 * @returns 
 */
export const deleteItem = async (id, collectionName) => {
  try {
    const deleteStatus = await deleteDocumentById(id, collectionName);
    return deleteStatus
  } catch (error) {
    console.log("Ошибка при удалении " + error)
  }
  return false
}

/**
 * Забираем сразу все данные с сервера
 * @returns 
 */
export async function fetchAllData() {
  const collectionPlayers = await fetchCollection('players');
  const collectionClubs = await fetchCollection('clubs');
  const collectionUnions = await fetchCollection('unions');
  const collectionEvents = await fetchCollection('events');
  const dataPlayers = getFields(collectionPlayers, true);
  const dataClubs = getFields(collectionClubs, false);
  const dataUnions = getFields(collectionUnions, false);
  const dataEvents = getFields(collectionEvents, false)
  return {
    dataPlayers: dataPlayers,
    dataClubs: dataClubs,
    dataUnions: dataUnions,
    dataEvents: dataEvents
  }
}

/**
 * Загружаем картинки в хранилище
 * @param {*} files 
 * @param {*} currentCollection 
 * @returns URL загруженный картинок
 */
export async function uploadImagesAndGetUrls(files, currentCollection) {
  const urls = await Promise.all(Object.keys(files).map((key) =>
    new Promise((resolve) => {
      if (files[key]) {
        uploadFile(files[key], currentCollection, (url) => {
          resolve({ key, url });
        });
      } else {
        resolve(null);
      }
    })
  ));
  return urls.filter(Boolean);
};
