import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { TextField, Button, Typography } from '@mui/material'

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    await handleLogin({ username, password })
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <div>
      <Typography variant="h5" component="h2" sx={{mt: 3}}>Login</Typography>
      <form onSubmit={onSubmit}>
        <TextField
          label="Username"
          style={{ marginTop: '1rem', display: 'block' }}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          autoComplete="username"
        />
        <TextField
          label="Password"
          type="password"
          style={{ marginTop: '1rem', display: 'block' }}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          autoComplete="current-password"
        />
        <Button type="submit" variant="contained" style={{ marginTop: '1rem', display: 'block' }}>login</Button>
      </form>
    </div>
  )
}

export default LoginForm
