'use client'
import { ItemsEditor } from "@/components/form_tile_list/form_tile_list"
import { ItemsProvider } from "@/contexts/items.context"
import { SelectProvider } from "@/contexts/selected_item.context"
import { ActionCost, Card, CardType, Family, SaveType, Tag, TargetType } from "fam-types"
import { deleteCard, getAllCards, postCard } from "@/data/cards"
import { addEmptyOption, createNumberOptions, mapEnumToOptions } from "@/utils/select-options"
import { FormField } from "@/types"

export default function CardEditor({data, families, tags}:{data:Card[], families: Family[], tags: Tag[]}) {

  const dataType = {
    newItem: {
      _id: '',
      name: '',
      description: '',
      type: CardType.Attack,
      memory: 0
    },
    get: getAllCards,
    post: postCard,
    delete: deleteCard
  }

  const cardFields:FormField[] = [
    {
      key: 'name',
      type: 'text',
      label: 'Name',
      showOnClose: true
    },
    {
      key: 'type',
      type: 'select',
      label: 'Type',
      showOnClose: true,
      options: mapEnumToOptions(CardType)
    },
    {
      key: 'family',
      type: 'select',
      label: 'Family',
      showOnClose: true,
      options: addEmptyOption(families.map(cf =>{return {value: cf._id, name: cf.name}}))
    },
    {
      key: 'vigor_required',
      type: 'select',
      label: 'Description',
      showOnClose: false,
      options: createNumberOptions(16),
      showOnType: [CardType.Attack, CardType.Ability, CardType.Feature]
    },
    {
      key: 'impulse_required',
      type: 'select',
      label: 'Description',
      showOnClose: false,
      options: createNumberOptions(16),
      showOnType: [CardType.Attack, CardType.Ability, CardType.Feature]
    },
    {
      key: 'special_required',
      type: 'select',
      label: 'Description',
      showOnClose: false,
      options: createNumberOptions(16),
      showOnType: [CardType.Attack, CardType.Ability, CardType.Feature]
    },
    {
      key: 'action_cost',
      type: 'select',
      label: 'Action Cost',
      showOnClose: false,
      options: mapEnumToOptions(ActionCost),
      showOnType: [CardType.Attack, CardType.Ability]
    },
    {
      key: 'range',
      type: 'number',
      label: 'Range',
      showOnClose: false,
      showOnType: [CardType.Attack, CardType.Ability]
    },
    {
      key: 'target',
      type: 'select',
      label: 'Target',
      showOnClose: false,
      options: addEmptyOption(mapEnumToOptions(TargetType)),
      showOnType: [CardType.Attack, CardType.Ability]
    },
    {
      key: 'description',
      type: 'text',
      label: 'Description',
      showOnClose: false
    },
    {
      key: 'tags',
      type: 'multiselect',
      label: 'Tags',
      showOnClose: false,
      options: tags.map(t =>{return {value: t._id, label: t.name}})
    },
    {
      key: 'miss_damage',
      type: 'number',
      label: 'Miss Damage',
      showOnClose: false,
      showOnType: [CardType.Attack]
    },
    {
      key: 'hit_damage',
      type: 'number',
      label: 'Hit Damage',
      showOnClose: false,
      showOnType: [CardType.Attack]
    },
    {
      key: 'critical_damage',
      type: 'number',
      label: 'Critical Damage',
      showOnClose: false,
      showOnType: [CardType.Attack]
    },
    {
      key: 'critical_threshhold',
      type: 'number',
      label: 'Critical Threshhold',
      showOnClose: false,
      showOnType: [CardType.Attack]
    },
    {
      key: 'save_target',
      type: 'select',
      label: 'Save Target',
      showOnClose: false,
      options: addEmptyOption(mapEnumToOptions(SaveType)),
      showOnType: [CardType.Ability]
    },   
    {
      key: 'save_difficulty_modifier',
      type: 'select',
      label: 'Save Difficulty Modifier',
      showOnClose: false,
      options: addEmptyOption(mapEnumToOptions(SaveType)),
      showOnType: [CardType.Ability]
    }
  ]

  return (
    <SelectProvider>
      <ItemsProvider dataType={dataType} data={data} fields={cardFields}>
          <ItemsEditor/>
      </ItemsProvider>
    </SelectProvider>
  )
}