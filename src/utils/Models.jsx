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
