import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography, Link } from '@mui/material'



const Navigation = ({ user, handleLogout }) => {

  const statusStyle = { // old styling for reference
    gap: '2em',
    padding: 5,
    marginTop: 10,
    display: 'inline-block'
  }

  const linkStyle = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link component={RouterLink} to="/" style={{ flexGrow: 1 }}><h1 className="quicksand-title">Pala Pala <span style={{ color: 'skyblue' }}>Blogs</span></h1></Link>
          <Button color="inherit" component={RouterLink} to="/" sx={linkStyle} nativeButton={false}>Blogs</Button>
          <Button color="inherit" component={RouterLink} to="/create" sx={linkStyle} nativeButton={false}>New Blog</Button>
          { !user && <Button color="inherit" component={RouterLink} to="/login" sx={linkStyle} nativeButton={false}>Login</Button>}
          { user && <Button color="inherit" component={RouterLink} onClick={handleLogout} sx={linkStyle} nativeButton={false}>Logout</Button>}
        </Toolbar>
      </AppBar>
      {user ? <Typography variant="body1" sx={{ mt: 2, marginLeft: 1 }}>{user.name} logged in</Typography> : null}
    </div>
  )
}

export default Navigation