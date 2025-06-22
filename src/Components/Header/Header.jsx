import { useEffect, useState } from 'react'
import logo from '../../assets/react.svg'
import './Header.scss'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [authLink, setAuthlink] = useState(true)
  const location = useLocation();
  
  useEffect(() => {
    const token = sessionStorage.getItem('JWT_token')
    setAuthlink(!token)

    fetch('http://localhost:3000/protected', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 401 || res.status === 403) {
        sessionStorage.removeItem('JWT_token');
        setAuthlink(true)
        return;
      }
      return res.json();
    }).then(data => {
    if (data) {
      setAuthlink(false)
      console.log('Protected data:', data);
    }
    }).catch(err => {
      console.error('Error:', err)
      setAuthlink(true)
    });
  }, [location])
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
            {authLink && (
              <>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header