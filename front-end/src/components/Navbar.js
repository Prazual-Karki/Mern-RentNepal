import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Link, useNavigate } from 'react-router-dom'
// import { useEffect, useState } from 'react'

function Navbar() {
  const auth = localStorage.getItem('users')
  const adminAuth = localStorage.getItem('admin')

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  // for acessing user photo
  // useEffect(() => {
  //   let isLogged = false
  //   if (auth) {
  //     let photoUrl = JSON.parse(auth).photo
  //     photoUrl = photoUrl.replace('public\\', '')
  //     photoUrl = `http://localhost:8080/${photoUrl}`
  //     setprofilePic(photoUrl)
  //   }
  //   return () => {
  //     console.log('cleanup effect of navbar')
  //   }
  // }, [auth])
  const navigate = useNavigate()
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  }
  const linkStyleM = {
    textDecoration: 'none',
    color: 'black',
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position='sticky' color='error'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Link to='/' style={linkStyle}>
            <Typography
              variant='h6'
              noWrap
              sx={{
                mr: 8,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              RENTNEPAL
            </Typography>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              marginLeft: '20px',
            }}
          >
            <IconButton
              size='large'
              aria-label=' nav-bars '
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* on mobile view */}
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/productList' style={linkStyleM}>
                  <Typography textAlign='center'>Browse Products</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/working' style={linkStyleM}>
                  <Typography textAlign='center'>How it works?</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Link to='/' style={linkStyle}>
            <Typography
              variant='h5'
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Rent-Nepal
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* desktop view */}
            <Link to='/productList' style={linkStyle}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                Browse Products
              </Button>
            </Link>
            <Link to='/working' style={linkStyle}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                how it works?
              </Button>
            </Link>
          </Box>
          {adminAuth ? (
            <Button
              sx={{ color: 'white' }}
              onClick={() => {
                localStorage.clear()
                navigate('/')
              }}
            >
              LogOut(A)
            </Button>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              {auth ? (
                <>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title='Open profile'>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={JSON.parse(auth).firstname.toUpperCase()}
                          src='null'
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id='menu-appbar'
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <Link
                        to={'/user/profile/' + JSON.parse(auth)._id}
                        style={{ color: 'black', textDecoration: 'none' }}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign='center'>Profile</Typography>
                        </MenuItem>
                      </Link>
                      <Link
                        to={'/user/dashboard/' + JSON.parse(auth)._id}
                        style={{ color: 'black', textDecoration: 'none' }}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign='center'>Dashboard</Typography>
                        </MenuItem>
                      </Link>
                      <MenuItem
                        onClick={() => {
                          setAnchorElUser(null)

                          localStorage.clear()
                          navigate('/login')
                        }}
                      >
                        <Typography textAlign='center'>Log out</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </>
              ) : (
                <Link to='/login' style={linkStyle}>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    Login
                  </Button>
                </Link>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
