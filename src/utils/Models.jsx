
/**
 * Преобразует ответ от сервера в объект для работы
 * @param {*} response ответ от сервета
 * @param {boolean} isPlayer маркер отражающий принадлежит ли тип записи игроку
 * @returns 
 */
export function getFields(response, isPlayer) {
  const output = response.docs.map((item) => {
    const id = item.id;
    const { name, logoURL, clubGuestURL, clubOwnerURL, unionGuestURL, unionOwnerURL, mainColor, secondColor, club, union } = item.data();
    const toReturn = {
      id: id,
      name: name,
      logoURL: logoURL,
      mainColor: mainColor,
      secondColor: secondColor

    }
    if (isPlayer) {
      toReturn.clubGuestURL = clubGuestURL;
      toReturn.clubOwnerURL = clubOwnerURL;
      toReturn.unionGuestURL = unionGuestURL;
      toReturn.unionOwnerURL = unionOwnerURL;
      toReturn.club = club;
      toReturn.union = union;
    }

    return toReturn;
  });

  return output;
}

export function getBannerFields(response) {
  const output = response.docs.map((item) => {
    const id = item.id;
    const { name, teamplate, param } = item.data();
    const toReturn = {
      id: id,
      name: name,
      teamplate: teamplate,
      param: param
    }
    return toReturn;
  });

  return output;
}

/**
 * Пустой элемент который будет использован для создания новой записи
 * @param {*} collection 
 * @returns 
 */
export function getEmptyElement(collection) {
  const element = {
    id: "",
    name: "",
    logoURL: ""
  }
  if (collection === 'players') {
    element.clubGuestURL = "";
    element.clubOwnerURL = "";
    element.unionGuestURL = "";
    element.unionOwnerURL = "";
    element.club = "";
    element.union = "";
  }
  if (collection === 'clubs' || collection === 'unions') {
    element.mainColor = 'FF0000'
    element.secondColor = '00FF00'
  }
  return element;
}

/**
 * Создает объкет на основе стейта компонента, который использубется для записи на сервер
 * @param {*} element 
 * @param {*} currentCollection 
 * @returns 
 */
export function getObjectForSubmin(element, currentCollection) {
  const obj = {
    id: element.id,
    name: element.name,
    logoURL: element.logoURL
  }
  if (currentCollection === 'players') {
    obj['clubGuestURL'] = element.clubGuestURL
    obj['clubOwnerURL'] = element.clubOwnerURL
    obj['unionGuestURL'] = element.unionGuestURL
    obj['unionOwnerURL'] = element.unionOwnerURL
    obj['club'] = element.club
    obj['union'] = element.union
  }
  if (currentCollection === 'clubs' || currentCollection === 'unions') {
    obj['mainColor'] = element.mainColor
    obj['secondColor'] = element.secondColor
  }
  return obj
}

/**
 * Получаем всех игроков которые состоят в конкретной группе
 * @param {*} players игроки
 * @param {*} name имя группы
 * @returns 
 */
export function getPlayersByGroup(players, name) {
  const playersInGroup = players.filter((player) => { return (player.club === name || player.union === name) })
  return playersInGroup
}


/**
 * Возвращаем url формы игрока
 * @param {*} player игрок
 * @param {bool} isOwner хозяин или гость
 * @param {bool} isClub  клуб или сборная
 * @returns 
 */
export function getPlayerCloth(player, isOwner, isClub) {
  if (isOwner) {
    if (isClub) {
      return player.clubOwnerURL
    } else {
      return player.unionOwnerURL
    }
  } else {
    if (isClub) {
      return player.clubGuestURL
    } else {
      return player.unionGuestURL
    }
  }

}