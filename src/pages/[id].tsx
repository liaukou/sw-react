import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getCharacter } from 'services/api'
import { IPeople } from 'types/swapi'

export default function Character() {
  const { query } = useRouter()

  const [character, setCharacter] = useState<IPeople | undefined>()

  useEffect(() => {
    if (query.id) {
      getCharacter(query.id as string).then((data) => setCharacter(data))
    }
  }, [query.id])

  // if (error) return <div>{error.message}</div>
  if (!character) return <div>Loading...</div>

  return <div>{JSON.stringify(character)}</div>
}
