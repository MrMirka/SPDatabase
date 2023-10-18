export function getFields(response, isPlayer) {  
    const output = response.docs.map((item) => {
      const id = item.id;
      const { name, logoURL, clubGuestURL, clubOwnerURL, unionGuestURL, unionOwnerURL} = item.data();
      const toReturn = {
        id: id,
        name: name,
        logoURL: logoURL
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
  