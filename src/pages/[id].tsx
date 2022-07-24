import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { RootState } from 'stores/store'
import { getCharacter } from 'services/api'
import { IPeople } from 'types/swapi'
import { Details } from 'containers/details/Details'
import { LoadingIndicator } from 'components/loadingIndicator/LoadingIndicator'
import { selectCharacters, updateCharacter } from 'stores/dataSlice'

export default function Character() {
  const { query } = useRouter()
  const store = useStore<RootState>()
  const dispatch = useDispatch()

  const [character, setCharacter] = useState<IPeople | undefined>()

  useEffect(() => {
    const { id } = query

    if (!id || typeof id !== 'string') return

    const characters = selectCharacters(store.getState())

    if (characters[id]) {
      setCharacter(characters[id])
    } else {
      getCharacter(id).then((character) => {
        setCharacter(character)
        dispatch(updateCharacter({ id, character }))
      })
    }

    // below triggers not deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id])

  return <Details character={character} />
}
