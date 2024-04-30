import { AbilityCard, AttackCard, Card, FeatureCard, StatusCard, Tag, isAbilityCard, isAttackCard, isFeatureCard, isStatusCard } from 'fam-types'
import Image from 'next/image'


const Cost = ({card}:{card: AttackCard|AbilityCard}) => {

  let icon;

  switch(Number(card.action_cost)){
    case 0:
      icon = <>&#11046;</>
      break
    case 1:
      icon = <span className='block text-[45px] mt-[-10px]'>&#x2B16;</span>
      break
    case 2:
      icon = <>&#11045;</>
      break
  }

  return (
    <div id='cost' className='flex-[0_0_30px]'>
      <div className='flex h-[30px] w-[30px] justify-center items-center text-[40px] align-middle'>
        <span className='mb-[-4px]'>{icon}</span>
      </div>
    </div>
    )
}

const AttackCardContent = ({card}:{card: AttackCard}) => {
  return (
    <div className='w-full flex flex-row gap-[15px] items-center'>
      <Cost card={card} />
      <div id='value' className='inline-block'>
        <div className='text-xl'>
          <span className='mr-[5px]'>{card.hit_damage}</span>
          <span>|<span className='align-super text-sm'>{card.critical_threshold}</span> {card.critical_damage}</span>
          {/* <span>
            {card.target != 'Single' ? <span> {card.target}</span> : null}
            {card.range == 0 ? <span> Melee</span> : <span> {card.range}</span>}
          </span> */}
        </div>
        {card.tags ? <div>{card.tags.reduce((a,b)=>{a.push(b.name); return a;},[] as string[]).join(', ')}</div>:null}
      </div>
    </div>
  )
}

const AbilityCardContent = ({card}:{card: AbilityCard}) => {
  return (
    <>
    <div className='w-full flex flex-row gap-[15px] items-center'>
      <Cost card={card} />
      <div id='value' className='inline-block'>
        <div className='text-xl'>
          {card.save_target ?
          <div id='save'> 
            <div>{card.save_target.map( t => t )}</div>
            <div>{card.save_difficulty_modifier}</div>
          </div>
        : null }
        </div>
        {card.tags ? <div>{card.tags.reduce((a,b)=>{a.push(b.name); return a;},[] as string[]).join(', ')}</div>:null}
      </div>
    </div>
    </>
  ) 
}

const FeatureCardContent = ({card}:{card: FeatureCard}) => {
  return (
    <div id='content'>
      {card.bonus_type && card.bonus_amount ? 
      <div>{card.bonus_type} {card.bonus_amount}</div> : null}
    </div>
  )  
}

const StatusCardContent = ({card}:{card: StatusCard}) => {
  return (
    <>
    </>
  )  
}

const renderContent = (card:Card) => {
  if(isAttackCard(card)){
    return AttackCardContent({card})
  } 
  else if (isAbilityCard(card)){
    return AbilityCardContent({card})
  } 
  else if (isFeatureCard(card)){
    return FeatureCardContent({card})
  } 
  else if (isStatusCard(card)){
    return StatusCardContent({card})
  }
}

const Description = ({text}:{text:string}) => {
  return <div id='description' className='font-sans w-full pl-[35px]'>{text}</div>
}


export const CardDisplay = ({data}:{data: Card}) => {
  return (
    <div className='font-serif inline-block text-center h-[448px] w-[320px] border box-border border-black rounded-[16px]'>
      <div id='top-bar' className='flex flex-row h-[40px] p-[5px]'>
        <div className='text-left flex flex-1 items-center'>
          <div id='family' className='w-[40px] h[40px] text-center'>{data.family?.name ? <>{data.family.name[0]}</> : null}</div>
          <div id='name' className='text-[20px] flex-1'>{data.name}</div>
        </div>
        <div className='text-right mr-[5px] flex-auto flex flex-row gap-[5px] justify-end items-center'>
          {data.vigor_required ? 
          <div className='w-[20px] h-[20px] flex justify-center items-center'>
            <span className='text-sm z-10'>{data.vigor_required}</span>
            <span className='absolute text-[20px] mb-[-3px] text-lightgray z-0 rotate-180'>&#9750;</span>
          </div> : null}
          {data.impulse_required ? 
          <div className='w-[20px] h-[20px] flex justify-center items-center'>
            <span className='text-sm z-10'>{data.impulse_required}</span>
            <span className='absolute text-[20px] text-lightgray z-0 mb-[-6px]'>&#9826;</span>
            {/* <span className='absolute text-[20px] mb-[-5px] text-lightgray z-0 rotate-180 mt-[-4px]'>&#9750;</span> */}
          </div> : null}
          {data.special_required ? 
          <div className='w-[20px] h-[20px] flex justify-center items-center'>
            <span className='text-sm z-10'>{data.special_required}</span>
            <span className='absolute text-[22px] text-lightgray z-0 mb-[-4px]'>&#9788;</span>
            {/* &#11044;	&#10022; */}
          </div> : null}
          <div id='memory' className='w-[30px] h-[30px] flex justify-center items-center ml-[2px] text-2xl'>
            <span>{data.memory}</span>
            {/* <span className='absolute text-[35px] text-lightgray mt-[-1px] rotate-180 z-0'>&#9711;</span> */}
          </div>
        </div>
      </div>
      <div id='img-box' className='w-full h-[250px] border-y'>
        <img id='card-image'/>
      </div>
      <div id='middle-bar' className='mt-[-15px]'>
        <div id='card-type' className='px-[10px] border bg-white inline-block'>{data.type}</div>
      </div>
      <div id='content' className='flex flex-col justify-center items-center h-[145px] gap-[10px] text-left px-[40px] pb-[10px]'>
        {/* {data.tags ? <Description text={data.tags.reduce((a,b)=>{a.push(b.name); return a;},[] as string[]).join(', ')} /> : null} */}
        {renderContent(data)}
      </div>
    </div>
  )
}