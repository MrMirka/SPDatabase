import {
    updatePlayer,
    addPlayer,
    updateClub,
    addClub,
    updateUnion,
    addUnion,
    addEvent,
    updateEvent,
    addBanner,
    updateBanner,
} from './dataSlice'

export function activateDispatch(dispatch, element, collection, isNewRecord, setIsNewRecord) {
    switch (collection) {
        case 'players':
            isNewRecord ? dispatch(addPlayer(element)) : dispatch(updatePlayer(element));
            setIsNewRecord(false);
            break;
        case 'events':
            isNewRecord ? dispatch(addEvent(element)) : dispatch(updateEvent(element));
            setIsNewRecord(false);
            break;
        case 'clubs':
            isNewRecord ? dispatch(addClub(element)) : dispatch(updateClub(element));
            setIsNewRecord(false);
            break;
        case 'unions':
            isNewRecord ? dispatch(addUnion(element)) : dispatch(updateUnion(element));
            setIsNewRecord(false);
            break;
        case 'banners':
            isNewRecord ? dispatch(addBanner(element)) : dispatch(updateBanner(element));
            setIsNewRecord(false);
            break;
        default:
            break;
    }
}