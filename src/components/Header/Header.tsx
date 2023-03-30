function Header() {
  return (
    <div className='flex btm-nav-lg short:btm-nav-sm navbar bg-secondary text-secondary-content text-2xl short:text-xl font-bold sticky top-0 z-10 px-6'>
      <div className='flex-1'>{document.title}</div>
    </div>
  )
}

export default Header
