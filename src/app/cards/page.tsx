import { FormTileList } from "@/components/form_tile_list/form_tile_list"
import { getAllCards, postCard } from "@/data/cards"
import { CardType } from 'fam-types'
import { NavBar } from "@/components/nav_bar"
import { CardFormFields } from "@/components/form_tile_list/form_fields/card_form_fields"
import CardDisplay from "@/components/wrapped_components/card_display"

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
        FormFields={CardFormFields}
        newItem={newCard}
        saveType={'Card'}
        DisplayComponent={CardDisplay}
      />
    </main>
  )
}

