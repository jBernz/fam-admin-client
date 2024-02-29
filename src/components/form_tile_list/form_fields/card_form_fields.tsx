'use client'
import { ActionCost, Card, CardType, SaveType, TargetType, isAbilityCard, isAttackCard, isFeatureCard } from "fam-types"
import { FormInput } from "../input_components/form_input"
import { useFamilies } from "@/hooks/useFamilies"
import { useTags } from "@/hooks/useTags"
import { FormFieldsProps } from "."
import { createNumberOptions, mapEnumToOptions, addEmptyOption } from "@/utils/select-options"
import { FormSelect } from "../input_components/form_select"
import { FormMultiSelect } from "../input_components/form_multiselect"

export const CardFormFields = ({data, onFieldChange}:FormFieldsProps<Card>) => {
  
  const families = useFamilies()
  const tags = useTags()

  const onFamilySelectChange = (id: string|number|undefined) => {
    const selectedFamily = families.find(family => family._id == id)
    onFieldChange("family", selectedFamily)
  }

  const onTagsSelectChange = (ids: (string|undefined)[]) => {
    const selectedTags = tags.filter(tag => ids.includes(tag._id))
    onFieldChange("tags", selectedTags)
  }

  const renderAttributeRequirementFields = () => {
    if(isAttackCard(data)||isAbilityCard(data)||isFeatureCard(data)){
    return (
      <>
        <FormSelect 
          id={'vigor_required'}
          label="Vigor Req."
          value={data.vigor_required} 
          options={createNumberOptions(16)} 
          onChange={onFieldChange.bind(null, 'vigor_required')} 
        />
        <FormSelect 
          id={'impulse_required'}
          label="Impulse Req."
          value={data.impulse_required} 
          options={createNumberOptions(16)} 
          onChange={onFieldChange.bind(null, 'impulse_required')} 
        />
        <FormSelect 
          id={'special_required'}
          label="Special Req."
          value={data.special_required} 
          options={createNumberOptions(16)} 
          onChange={onFieldChange.bind(null, 'special_required')} 
        />
      </>
    )}
  }

  const renderActionFields = () => {
    if(isAttackCard(data)||isAbilityCard(data)){
      return (
        <>
          <FormSelect
            id="action_cost"
            label="Action Cost"
            value={data.action_cost}
            options={mapEnumToOptions(ActionCost)}
            onChange={onFieldChange.bind(null, "action_cost")}
          />
          <FormInput
            id="range"
            label="Range"
            value={data.range}
            onChange={onFieldChange.bind(null, "range")}
          />
          <FormSelect
            id="target"
            label="Target"
            value={data.target}
            options={addEmptyOption(mapEnumToOptions(TargetType))}
            onChange={onFieldChange.bind(null, "target")}
          />
        </>
      )
    }
  }

  const renderAttackFields = () => {
    if(isAttackCard(data)){
      return (
        <>
          <FormInput
            id="miss_damage"
            type="number"
            label="Miss Damage"
            value={data.miss_damage}
            onChange={onFieldChange.bind(null, "miss_damage")}
          />
          <FormInput
            id="hit_damage"
            type="number"
            label="Hit Damage"
            value={data.hit_damage}
            onChange={onFieldChange.bind(null, "hit_damage")}
          />
          <FormInput
            id="critical_damage"
            type="number"
            label="Critical Damage"
            value={data.critical_damage}
            onChange={onFieldChange.bind(null, "critical_damage")}
          />
          <FormInput
            id="critical_threshold"
            type="number"
            label="Critical Threshold"
            value={data.critical_threshold}
            onChange={onFieldChange.bind(null, "critical_threshold")}
          />
        </>
      )
    }
  }

  const renderSaveFields = () => {
    if(isAbilityCard(data)){
      return (
        <>
          <FormSelect
            id="save_target"
            label="Save Target"
            value={data.save_target?.toString()}
            options={addEmptyOption(mapEnumToOptions(SaveType))}
            onChange={onFieldChange.bind(null, "save_target")}
          />
          <FormSelect
            id="save_difficulty_modifier"
            label="Save Difficulty Modifier"
            value={data.save_difficulty_modifier?.toString()}
            options={addEmptyOption(mapEnumToOptions(SaveType))}
            onChange={onFieldChange.bind(null, "save_difficulty_modifier")}
          />
        </>
      )
    }
  }

  return(
    <>
      <FormSelect 
        id='type'
        label="Type"
        value={data.type} 
        options={mapEnumToOptions(CardType)} 
        onChange={onFieldChange.bind(null, 'type')} 
        disabled={data._id != undefined}
      />
      <FormSelect 
        id='family'
        label="Family"
        value={data.family ? data.family._id : undefined} 
        options={addEmptyOption(families.map(cf =>{return {value: cf._id, name: cf.name}}))} 
        onChange={onFamilySelectChange} 
      />
      <FormInput 
        id='name'
        label="Name"
        value={data.name} 
        onChange={onFieldChange.bind(null, 'name')} 
      />
      <FormSelect 
        id='memory'
        label="Memory"
        value={data.memory} 
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
        value={data.description} 
        onChange={onFieldChange.bind(null, 'description')} 
      />
      <FormMultiSelect
        values={data.tags?.map(t =>{return {value: t._id, label: t.name}})}
        id="tags"
        label="Tags"
        options={tags.map(t =>{return {value: t._id, label: t.name}})} 
        // disabled={!editMode}
        onChange={onTagsSelectChange}
      />
    </>
  )
}