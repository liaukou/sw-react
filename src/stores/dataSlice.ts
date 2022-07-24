import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPeople, IPlanet } from 'types/swapi'

export type DataState = {
  characters: { [id: string]: IPeople }
  planets: { [id: string]: IPlanet }
}

const initialState: DataState = {
  characters: {},
  planets: {},
}

export const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateCharacter: (
      state: DataState,
      { payload: { id, character } }: PayloadAction<{ id: string; character: IPeople }>,
    ) => {
      state.characters[id] = character
      return state
    },
    updatePlanet: (state: DataState, { payload: { id, planet } }: PayloadAction<{ id: string; planet: IPlanet }>) => {
      state.planets[id] = planet
      return state
    },
  },
})

export const { updateCharacter, updatePlanet } = slice.actions

export const selectCharacters = ({ data: { characters } }: { data: DataState }) => characters
export const selectPlanets = ({ data: { planets } }: { data: DataState }) => planets

export const dataReducer = slice.reducer
