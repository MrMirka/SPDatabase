import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
    name: 'players',
    initialState: {
        value: null
    },
    reducers: {
        setPlayers: (state, action) => {
            state.value = action.payload
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
        }
    }
});


export const { setPlayers } = playerSlice.actions;
export const { setEvents } = eventsSlice.actions;
export const { setClubs } = clubsSlice.actions;
export const { setUnions } = unionsSlice.actions;

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