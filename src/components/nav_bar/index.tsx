import Link from 'next/link'
 
export function NavBar() {
 
  return (
    <nav>
      <ul>
        <li>
          <Link className={`link`} href="/families">
            Familes
          </Link>
        </li>
        <li>
          <Link className={`link`} href="/cards">
            Cards
          </Link>
        </li>
        <li>
          <Link
            className={`link`} href="/tags">
            Tags
          </Link>
        </li>
      </ul>
    </nav>
  )
}