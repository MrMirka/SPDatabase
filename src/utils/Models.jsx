export function getFields(response, isPlayer) {  
    const output = response.docs.map((item) => {
      const id = item.id;
      const { name, logoURL, clubGuestURL, clubOwnerURL, unionGuestURL, unionOwnerURL, mainColor, secondColor} = item.data();
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
      } 
     
      return toReturn;
    });
  
    return output;
  }

  export function getEmptyElement(collection){
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
    } 
    if(collection === 'clubs' || collection === 'unions') {
      element.mainColor = 'FF0000'
      element.secondColor = '00FF00'
    }
    return element;
  }
  