import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const LoginPage = () => {

  const { loginUser, user } = useUserContext()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      return toast.error('Password must 6 or more letter long')
    }
    await loginUser(email, password)

  }

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate])

  const isFormValid = email.trim() === '' || password.trim() === '';
  return (
    <div className='container'>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formRow">
          <label htmlFor='email'>*Email: </label>
          <input id='email' name='email' type="email" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="formRow">
          <label htmlFor='password'>*Password: </label>
          <input id='password' name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='formRow__action'>
          <button type="submit" disabled={isFormValid} className={`${isFormValid ? 'disable' : 'button'}`}>Login</button>
          <p>Not a member? then <Link to={'/register'}>SignUp</Link></p>
        </div>
      </form>
    </div>
  )
}
export default LoginPage