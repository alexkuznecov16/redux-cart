import logo from '../../assets/react.svg'
import './Header.scss'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='Header'>
      <div className="container">
        <div className="Header__inner">
          <img src={logo} alt="logo" loading='lazy' />
          <nav className="Header-nav">
            <Link to='/'>Home</Link>
            <Link to='/products'>Products</Link>
            <Link to='/contacts'>Contacts</Link>
            <Link to='/countries'>Countries</Link>
            <Link to='/users'>Users</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header