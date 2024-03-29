import { configureStore } from '@reduxjs/toolkit';
import redusers from './dataSlice'

export default configureStore({
    reducer: {
        players: redusers.players,
        clubs: redusers.clubs,
        unions: redusers.unions,
        events: redusers.events,
        banners: redusers.banners,
        userauth: redusers.userauth
    }
})