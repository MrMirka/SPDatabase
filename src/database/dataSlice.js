import { createSlice } from '@reduxjs/toolkit'

export const authData = createSlice({
    name: 'userauth',
    initialState: {
        value: null
    },
    reducers: {
        setAuth: (state, action) => {
            state.value = action.payload
        }
    }
})

export const playerSlice = createSlice({
    name: 'players',
    initialState: {
        value: null
    },
    reducers: {
        setPlayers: (state, action) => {
            state.value = action.payload
        },
        updatePlayer: (state, action) => {
            const playerToUpdate = action.payload;
            const players = state.value;
            const index = players.findIndex(player => player.id === playerToUpdate.id);
            if (index !== -1) {
                players[index] = playerToUpdate;
            }
        },
        addPlayer: (state, action) => {
            const newItem = action.payload;
            state.value.push(newItem);
        },
        removePlayer: (state, action) => {
            const itemToRemove = action.payload;
            const list = state.value;
            const index = list.findIndex(item => item.id === itemToRemove.id);
            list.splice(index,1)
        }
    }
});

export const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        value: null
    },
    reducers: {
        setEvents: (state, action) => {
            state.value = action.payload
        },
        updateEvent: (state, action) => {
            const eventToUpdate = action.payload
            const events = state.value
            const index = events.findIndex(event => event.id === eventToUpdate.id)
            if(index !== -1) {
                events[index] = eventToUpdate
            }
        },
        addEvent: (state, action) => {
            const newItem = action.payload;
            state.value.push(newItem);
        },
        removeEvent: (state, action) => {
            const itemToRemove = action.payload;
            const list = state.value;
            const index = list.findIndex(item => item.id === itemToRemove.id);
            list.splice(index,1)
        }
    }
});

export const clubsSlice = createSlice({
    name: 'clubs',
    initialState: {
        value: null
    },
    reducers: {
        setClubs: (state, action) => {
            state.value = action.payload
        },
        updateClub: (state, action) => {
            const clubToUpdate = action.payload
            const clubs = state.value
            const index = clubs.findIndex(club => club.id === clubToUpdate.id)
            if(index !== -1) {
                clubs[index] = clubToUpdate
            }
        },
        addClub: (state, action) => {
            const newItem = action.payload;
            state.value.push(newItem);
        },
        removeClub: (state, action) => {
            const itemToRemove = action.payload;
            const list = state.value;
            const index = list.findIndex(item => item.id === itemToRemove.id);
            list.splice(index,1)
        }
    }
});

export const unionsSlice = createSlice({
    name: 'unions',
    initialState: {
        value: null
    },
    reducers: {
        setUnions: (state, action) => {
            state.value = action.payload
        },
        updateUnion: (state, action) => {
            const unionToUpdate = action.payload
            const unions = state.value
            const index = unions.findIndex(union => union.id === unionToUpdate.id)
            if(index !== -1) {
                unions[index] = unionToUpdate
            }
        },
        addUnion: (state, action) => {
            const newItem = action.payload;
            state.value.push(newItem);
        },
        removeUnion: (state, action) => {
            const itemToRemove = action.payload;
            const list = state.value;
            const index = list.findIndex(item => item.id === itemToRemove.id);
            list.splice(index,1)
        }
    }
});

export const bannersSlice = createSlice({
    name: 'banners',
    initialState: {
        value: null
    },
    reducers: {
        setBanners: (state, action) => {
            state.value = action.payload
        },
        updateBanner: (state, action) => {
            const bannersToUpdate = action.payload
            const banners = state.value
            const index = banners.findIndex(banner => banner.id === bannersToUpdate.id)
            if(index !== -1) {
                banners[index] = bannersToUpdate
            }
        },
        addBanner: (state, action) => {
            const newItem = action.payload;
            state.value.push(newItem);
        },
        removeBanner: (state, action) => {
            const itemToRemove = action.payload;
            const list = state.value;
            const index = list.findIndex(item => item.id === itemToRemove.id);
            list.splice(index,1)
        }
    }
});


export const { setPlayers, updatePlayer, addPlayer, removePlayer } = playerSlice.actions;
export const { setEvents, updateEvent, addEvent, removeEvent } = eventsSlice.actions;
export const { setClubs, updateClub, addClub, removeClub } = clubsSlice.actions;
export const { setUnions, updateUnion, addUnion, removeUnion } = unionsSlice.actions;
export const { setBanners, updateBanner, addBanner, removeBanner } = bannersSlice.actions;
export const { setAuth } = authData.actions;

export const curentPlayers = (state) => state.players.value;
export const curentEvents = (state) => state.events.value;
export const curentClubs = (state) => state.clubs.value;
export const curentUnions = (state) => state.unions.value
export const curentBanners = (state) => state.banners.value
export const curentAuth = (state) => state.userauth.value

export default {
    players: playerSlice.reducer,
    events: eventsSlice.reducer,
    clubs: clubsSlice.reducer,
    unions: unionsSlice.reducer,
    banners: bannersSlice.reducer,
    userauth: authData.reducer
};