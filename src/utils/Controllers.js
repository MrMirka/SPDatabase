import { addGroup, deleteDocumentById, updateGroup,updateGroup2, updatePlayerUniform, uploadToFirebase } from "./Repository";

/**
 * Создваем запись в коллекции
 * @param {*} groupName имя группы
 * @param {*} logoUrl путь к логотипу
 * @param {*} title название коллекции
 * @param {*} callBack калбек
 */
export const makeGroup = async (id, groupName, logoUrl, title, callBack) => {
  try {
    let status;
    if (id != "") {
      status = await updateGroup(id, groupName, logoUrl, title);
    } else {
      status = await addGroup(groupName, logoUrl, title);
    }

    callBack(status)
  } catch (error) {
    console.log(error)
    callBack(false)
  }
}

export const makeGroup2 = async (obj, title, callBack) => {
  try {
    let status;
    if (obj.id != "") {
      status = await updateGroup2(obj, title);
    } else {
      status = await addGroup(obj, title);
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

export const uploadFile = async (file, title, callBack) => {
  try {
    const url = await uploadToFirebase(file, title)
    callBack(url);
  } catch (error) {
    console.log(error)
    callBack(null);
  }
};

export const deleteItem = async (id, collectionName) => {
  try {
    const deleteStatus = await deleteDocumentById(id, collectionName);
  } catch (error) {
    console.log("Ошибка при удалении " + error)
  }
}
