type ButtonProps = {
  children: string
  disabled?: boolean
  onClick: ()=>void
}

export const Button = ({children, onClick, disabled}:ButtonProps) => {

  return (
    <button
      type='button'
      className='px-1' 
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  )
}