import { memo } from 'react'
import { Card } from 'antd'
import Image from 'next/image'
import { IPeople } from 'types/swapi'

const { Meta } = Card

type Props = { character: IPeople; onClick: () => void }

function CharacterCard({ character, onClick }: Props) {
  return (
    <Card
      onClick={onClick}
      hoverable
      style={{ width: 220 }}
      cover={
        <Image
          width={220}
          height={330}
          alt="sw example"
          src="https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg"
        />
      }
    >
      <Meta title={character.name} description={character.birth_year} />
    </Card>
  )
}

function characterCardPropsAreEqual(prevProps: Props, nextProps: Props) {
  return prevProps.character.url === nextProps.character.url
}

export const MemoizedCharacterCard = memo(CharacterCard, characterCardPropsAreEqual)
