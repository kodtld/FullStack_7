import { useState } from 'react'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id='username'
            placeholder='Username...'
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password" 
            placeholder='Password...'
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm