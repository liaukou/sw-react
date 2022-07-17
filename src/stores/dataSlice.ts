import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPeople } from 'swapi-ts'

export type DataState = {
  people: IPeople[]
}

const initialState: DataState = {
  people: [],
}

export const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updatePeople: (state: DataState, { payload: people }: PayloadAction<IPeople[]>) => {
      state.people = people
      return state
    },
  },
})

export const { updatePeople } = slice.actions

export const dataReducer = slice.reducer
