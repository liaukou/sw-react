import queryString from 'query-string'
import { IPeople, IPeoplePage } from 'types/swapi'

async function request(url: string) {
  const headers = {
    headers: {
      accept: 'application/json',
    },
  }
  const result = await fetch(url, headers).then((res) => res.json())

  return result
}

const swapiBaseUrl = 'https://swapi.dev/api/'

export function getPeople(page: number = 1, search?: string): Promise<IPeoplePage> {
  const query = queryString.stringify({
    page,
    search,
  })

  return request(`${swapiBaseUrl}people/?${query}`)
}

export function getCharacter(id: string): Promise<IPeople> {
  return request(`${swapiBaseUrl}people/${id}`)
}
