'use client'
import { postCard, deleteCard } from '@/data/cards'
import { ActionCost, Card, CardType, SaveType, TargetType, isAbilityCard, isAttackCard, isFeatureCard } from 'fam-types'
import { useState } from 'react'
import { FormTile } from '.'
import { useFamilies } from '../../hooks/useFamilies'
import { FormInput } from './form_input'
import { FormSelect } from './form_select'
import { addEmptyOption, createNumberOptions, mapEnumToOptions } from '@/utils/select-options'
import { useTags } from '@/hooks/useTags'
import ReactSelect from 'react-select'
import { FormMultiSelect } from './form_multiselect'

export const CardFormTile:FormTile<Card> = ({data, update, remove}) => {

  const [state, setState] = useState(data)
  const [editMode, setEditMode] = useState(false)

  const families = useFamilies()
  const tags = useTags()

  const onFieldChange = (id:string, value:string|number) => {
    setState({...state, [id]: value as Card[keyof Card]})
  }

  const onFamilySelectChange = (id: string|number|undefined) => {
    const selectedFamily = families.find(family => family._id == id)
    setState({...state, family: selectedFamily})
  }

  const onTagsSelectChange = (ids: (string|undefined)[]) => {
    const selectedTags = tags.filter(tag => ids.includes(tag._id))
    setState({...state, tags: selectedTags})
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const handleDeleteClick = async () => {
    if(state._id != undefined){
      await deleteCard(state._id, state.type)
    }
    remove(data)
  }

  const handleSaveClick = async () => {
    const newData = await postCard(state)
    setEditMode(false)
    update(data, newData)
  }

  const handleCancelClick = () => {
    setState(data)
    setEditMode(false)
  }

  const renderAttributeRequirementFields = () => {
    if(isAttackCard(state)||isAbilityCard(state)||isFeatureCard(state)){
    return (
      <>
        <FormSelect 
          id={'vigor_required'}
          label="Vigor Req."
          value={state.vigor_required} 
          options={createNumberOptions(16)} 
          onChange={onFieldChange.bind(null, 'vigor_required')} 
        />
        <FormSelect 
          id={'impulse_required'}
          label="Impulse Req."
          value={state.impulse_required} 
          options={createNumberOptions(16)} 
          onChange={onFieldChange.bind(null, 'impulse_required')} 
        />
        <FormSelect 
          id={'special_required'}
          label="Special Req."
          value={state.special_required} 
          options={createNumberOptions(16)} 
          onChange={onFieldChange.bind(null, 'special_required')} 
        />
      </>
    )}
  }

  const renderActionFields = () => {
    if(isAttackCard(state)||isAbilityCard(state)){
      return (
        <>
          <FormSelect
            id="action_cost"
            label="Action Cost"
            value={state.action_cost}
            options={mapEnumToOptions(ActionCost)}
            onChange={onFieldChange.bind(null, "action_cost")}
          />
          <FormInput
            id="range"
            label="Range"
            value={state.range}
            onChange={onFieldChange.bind(null, "range")}
          />
          <FormSelect
            id="target"
            label="Target"
            value={state.target}
            options={addEmptyOption(mapEnumToOptions(TargetType))}
            onChange={onFieldChange.bind(null, "target")}
          />
        </>
      )
    }
  }

  const renderAttackFields = () => {
    if(isAttackCard(state)){
      return (
        <>
          <FormInput
            id="miss_damage"
            type="number"
            label="Miss Damage"
            value={state.miss_damage}
            onChange={onFieldChange.bind(null, "miss_damage")}
          />
          <FormInput
            id="hit_damage"
            type="number"
            label="Hit Damage"
            value={state.hit_damage}
            onChange={onFieldChange.bind(null, "hit_damage")}
          />
          <FormInput
            id="critical_damage"
            type="number"
            label="Critical Damage"
            value={state.critical_damage}
            onChange={onFieldChange.bind(null, "critical_damage")}
          />
          <FormInput
            id="critical_threshold"
            type="number"
            label="Critical Threshold"
            value={state.critical_threshold}
            onChange={onFieldChange.bind(null, "critical_threshold")}
          />
        </>
      )
    }
  }

  const renderSaveFields = () => {
    if(isAbilityCard(state)){
      return (
        <>
          <FormSelect
            id="save_target"
            label="Save Target"
            value={state.save_target?.toString()}
            options={addEmptyOption(mapEnumToOptions(SaveType))}
            onChange={onFieldChange.bind(null, "save_target")}
          />
          <FormSelect
            id="save_difficulty_modifier"
            label="Save Difficulty Modifier"
            value={state.save_difficulty_modifier?.toString()}
            options={addEmptyOption(mapEnumToOptions(SaveType))}
            onChange={onFieldChange.bind(null, "save_difficulty_modifier")}
          />
        </>
      )
    }
  }
 
  return (
    <div>
      <form className="form">
        <fieldset disabled={!editMode}>
          <FormSelect 
            id='type'
            label="Type"
            value={state.type} 
            options={mapEnumToOptions(CardType)} 
            onChange={onFieldChange.bind(null, 'type')} 
            disabled={state._id != undefined}
          />
          <FormSelect 
            id='family'
            label="Family"
            value={state.family ? state.family._id : undefined} 
            options={addEmptyOption(families.map(cf =>{return {value: cf._id, name: cf.name}}))} 
            onChange={onFamilySelectChange} 
          />
          <FormInput 
            id='name'
            label="Name"
            value={state.name} 
            onChange={onFieldChange.bind(null, 'name')} 
          />
          <FormSelect 
            id='memory'
            label="Memory"
            value={state.memory} 
            options={createNumberOptions(4)} 
            onChange={onFieldChange.bind(null, 'memory')} 
          />
          {renderAttributeRequirementFields()}
          {renderActionFields()}
          {renderAttackFields()}
          {renderSaveFields()}
          <FormInput 
            id={'description'} 
            label="Description"
            value={state.description} 
            onChange={onFieldChange.bind(null, 'description')} 
          />
          <FormMultiSelect
            values={state.tags?.map(t =>{return {value: t._id, label: t.name}})}
            id="tags"
            label="Tags"
            options={tags.map(t =>{return {value: t._id, label: t.name}})} 
            disabled={!editMode}
            onChange={onTagsSelectChange}
          />
        </fieldset>
        {editMode ? 
          <div>
            <button type="button" onClick={handleSaveClick}>Save</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
          :
          <div>
            <button type="button" className="align-right" onClick={handleEditClick}>Edit</button>
            <button type="button" className="align-right" onClick={handleDeleteClick}>Delete</button>
          </div>
        }
      </form>
    </div>
  )
}