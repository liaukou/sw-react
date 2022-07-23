import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPeople } from 'types/swapi'

export type DataState = {
  people?: IPeople[]
  count?: number
  character?: IPeople
}

const initialState: DataState = {}

export const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updatePeople: (state: DataState, { payload: people }: PayloadAction<IPeople[]>) => {
      state.people = people
      return state
    },
    updateCount: (state: DataState, { payload: count }: PayloadAction<number>) => {
      state.count = count
      return state
    },
    updateCharacter: (state: DataState, { payload: character }: PayloadAction<IPeople>) => {
      state.character = character
      return state
    },
  },
})

export const { updatePeople, updateCount, updateCharacter } = slice.actions

export const selectPeople = ({ data: { people } }: { data: DataState }) => people
export const selectCount = ({ data: { count } }: { data: DataState }) => count

export const dataReducer = slice.reducer
