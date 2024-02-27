import { CardFormTile } from "@/components/form_tile_list/card_form_tile"
import { FormTileList } from "@/components/form_tile_list"
import { getAllCards } from "@/data/cards"
import { CardType } from 'fam-types'
import { NavBar } from "@/components/nav_bar"

export default async function Cards() {

  const cardData = await getAllCards()
  const newCard = {
    _id: undefined,
    name: '',
    description: '',
    type: CardType.Attack,
    memory: 0
  }

  return (
    <main>
      <NavBar/>
      <FormTileList 
        data={cardData} 
        TileComponent={CardFormTile}
        newItem={newCard}
      />
    </main>
  )
}

