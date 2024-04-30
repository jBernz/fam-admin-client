import Link from 'next/link'

const links = [
  {label: 'Families', href: '/families'},
  {label: 'Cards', href: '/cards'},
  {label: 'Tags', href: '/tags'}
]

const NavLink = ({label, href}:{label: string, href:string}) => {
  return (
    <li className="inline-flex px-2 font-serif">
      <Link className={`link`} href={href}>
        {label}
      </Link>
    </li>
  )
}
 
export function NavBar() {
 
  return (
    <nav>
      <ul className='text-center'>
        {links.map(l => {
          return <NavLink 
            key={l.href}
            label={l.label}
            href={l.href}
          />
        })}
      </ul>
    </nav>
  )
}