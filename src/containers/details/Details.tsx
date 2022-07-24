import { Layout, Typography } from 'antd'
import { LoadingIndicator } from 'components/loadingIndicator/LoadingIndicator'
import { useEffect, useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { getPlanet } from 'services/api'
import { getIfFromUrl } from 'services/utils'
import { selectPlanets, updatePlanet } from 'stores/dataSlice'
import { RootState } from 'stores/store'
import { IPeople, IPlanet } from 'types/swapi'
import classes from './Details.module.scss'

const { Header, Footer, Content } = Layout
const { Title } = Typography

type Props = {
  character?: IPeople
}

export function Details({ character }: Props) {
  const store = useStore<RootState>()
  const dispatch = useDispatch()

  const [planet, setPlanet] = useState<IPlanet | undefined>()

  useEffect(() => {
    if (!character) return

    const { homeworld } = character

    if (!homeworld || typeof homeworld !== 'string') return

    const id = getIfFromUrl(homeworld)

    const planets = selectPlanets(store.getState())

    if (planets[id]) {
      setPlanet(planets[id])
    } else {
      getPlanet(id).then((planet) => {
        setPlanet(planet)
        dispatch(updatePlanet({ id, planet }))
      })
    }

    // below triggers not deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character])

  return (
    <Layout className={classes.layout}>
      {character ? (
        <>
          <Header>
            <Title className={classes.headerTitle}>{character.name}</Title>
          </Header>
          <Content className={classes.content}>
            <Title level={4}>Birth year: {character.birth_year}</Title>
            <Title level={4}>Eye color: {character.eye_color}</Title>
            <Title level={4}>Gender: {character.gender}</Title>
            <Title level={4}>Hair color: {character.hair_color}</Title>
            <Title level={4}>Height: {character.height}</Title>
            <Title level={4}>Home World: {planet?.name}</Title>
            <Title level={4}>Mass: {character.mass}</Title>
            <Title level={4}>Skin color: {character.skin_color}</Title>
          </Content>
          <Footer>Created: {new Date(character.created).toLocaleDateString()}</Footer>
        </>
      ) : (
        <LoadingIndicator />
      )}
    </Layout>
  )
}
