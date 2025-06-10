import logo from '../../assets/react.svg'
import './Header.scss'

const Header = () => {
  return (
    <header className='Header'>
      <div className="container">
        <div className="Header__inner">
          <img src={logo} alt="logo" loading='lazy' />
          <nav className="Header-nav">
            <a href="#">Home</a>
            <a href="#">Products</a>
            <a href="#">Contacts</a>
            <a href="#">About Us</a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header