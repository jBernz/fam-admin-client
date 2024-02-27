// import { AbilityCard, AttackCard, Card, FeatureCard } from 'fam-types'

// const AttackCardContent = ({card}:{card: AttackCard}) => {
//   return (
//     <div id='content'>
//       <div id='action-cost'>card.action_cost</div>
//       <div id='attack-value'>{card.miss_damage}/{card.hit_damage}/{card.critical_damage}T{card.critical_threshhold}</div>
//       {card.description ? <div id='description'>card.description</div> : null}
//     </div>
//   )
// }

// const AbilityCardContent = ({card}:{card: AbilityCard}) => {
//   return (
//     <div id='content'>
//       <div id='action-cost'>card.action_cost</div>
//       {card.save_target ?
//         <div id='save'> 
//           <div>{card.save_target.map( t => t )}</div>
//           <div>{card.save_difficulty_modifier}</div>
//         </div>
//       : null }
//       {card.description ? <div id='description'>card.description</div> : null}
//     </div>
//   ) 
// }

// const FeatureCardContent = ({card}:{card: FeatureCard}) => {
//   return (
//     <div id='content'>
//       {card.bonus_type && card.bonus_amount ? 
//       <div>{card.bonus_type} {card.bonus_amount}</div> : null}
//       {card.description ? <div id='description'>card.description</div> : null}
//     </div>
//   )  
// }

// const contentTypes = {
//   'Attack': AttackCardContent,
//   'Ability': AbilityCardContent,
//   'Feature': FeatureCardContent,
// }

// export const CardDisplay = ({card}:{card: Card}) => {
//   return (<div>
//     <div id='top-bar'>
//       <div id='name'>{card.name}</div>
//       <div id='memory'>{card.memory}</div>
//       <div id='requirements'>
//         {card.vigor_required ? <div>card.vigor_required <img className='circle'/></div> : null}
//         {card.impulse_required ? <div>card.impulse_required <img className='triangle'/></div> : null}
//         {card.special_required ? <div>card.special_required <img className='square'/></div> : null}
//       </div>
//     </div>
//     <div id='img-box'>
//       <img id='card-image'/>
//     </div>
//     <div id='middle-bar'>
//       {card.class ? <div id='card-class'>{card.class.name}</div> : null}
//       <div id='card-type'>{card.type}</div>
//     </div>
//   </div>
//   )
// }