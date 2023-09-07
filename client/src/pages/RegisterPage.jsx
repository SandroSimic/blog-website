import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUserContext } from '../context/UserContext'
const RegisterPage = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const { registerUser } = useUserContext()

  const handleSubmit = async (e) => {
    e.preventDefault()


    if (!/^[A-Z]/.test(password) || password.length < 6) {
      return toast.error('Password must start with an uppercase letter and be at least 6 characters long', { autoClose: 5000 });
    }

    registerUser(username, email, password)

    navigate('/login')
  }
  const isFormValid = email.trim() === '' || password.trim() === '' || username.trim() === '';


  return (
    <div className='container'>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formRow">
          <label htmlFor='username'>*Username: </label>
          <input id='username' name='username' type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="formRow">
          <label htmlFor='email'>*Email: </label>
          <input id='email' name='email' type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="formRow">
          <label htmlFor='password'>*Password: </label>
          <input id='password' name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="formRow">
          <label htmlFor='image'> Image: </label>
          <input id='image' name="image" type="file" placeholder="Image" />
        </div>
        <div className='formRow__action'>
          <button type="submit" disabled={isFormValid} className={`${isFormValid ? 'disable' : 'button'}`}>Register</button>
          <p>Already have an account? <Link to={'/login'}>Login</Link></p>
        </div>
      </form>
    </div>
  )
}
export default RegisterPage