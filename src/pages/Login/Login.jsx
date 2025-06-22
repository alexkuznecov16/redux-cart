import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Authentication.scss';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const token = sessionStorage.getItem('JWT_token');
    if (token) {
      alert('You are already logged in')
      navigate('/')
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      console.log('Response from server:', data);

      if (!res.ok) {
        alert(data.message || 'Something went wrong')
        return;
      }

      if (data.token) {
        sessionStorage.setItem('JWT_token', data.token)

        setTimeout(() => {
          sessionStorage.removeItem('JWT_token');
          console.log('JWT token expired and removed from sessionStorage');
        }, 12 * 60 * 60 * 1000); // 12 hours
      }

      if (res.ok && data.token) {
        sessionStorage.setItem('JWT_token', data.token);
        console.log('Token saved:', data.token);
      }

      alert(data.message || 'Login successful!');
      navigate('/')
    } catch (error) {
      alert('Server error');
      console.error(error);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input maxLength={40} onInput={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input maxLength={40} onInput={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter your password" />
          </div>

          <button type="submit" className="auth-button">Login</button>

          <p className="auth-switch">
            Don’t have an account?
            <Link to='/register'>Register</Link>
          </p>
          
        </form>
      </div>
    </div>
  );
}

export default Login;