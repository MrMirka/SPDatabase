import { createSlice } from '@reduxjs/toolkit'

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
        }
    }
});


export const { setPlayers, updatePlayer } = playerSlice.actions;
export const { setEvents, updateEvent } = eventsSlice.actions;
export const { setClubs, updateClub } = clubsSlice.actions;
export const { setUnions, updateUnion } = unionsSlice.actions;

export const curentPlayers = (state) => state.players.value;
export const curentEvents = (state) => state.events.value;
export const curentClubs = (state) => state.clubs.value;
export const curentUnions = (state) => state.unions.value;

export default {
    players: playerSlice.reducer,
    events: eventsSlice.reducer,
    clubs: clubsSlice.reducer,
    unions: unionsSlice.reducer,
};