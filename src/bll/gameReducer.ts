import {createSlice} from "@reduxjs/toolkit";

export type KindOfCoinType= 'a' | 9 | 19 | 50 | 99 | 999
type DirectionType= 'up' | 'down'

const initialState = {
    numberOfItem: 4,
    kindOfCoin: 9 as KindOfCoinType,
    direction: 'up' as DirectionType
}

const slice = createSlice({
    name: 'game',
    initialState,
    reducers: {}
})

export const gameReducer = slice.reducer