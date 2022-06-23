import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom'
import {AppContext} from '../context/AppContext'
import Modal from './Modal';
import Dialog from './Dialog';

const pages = ['Home', 'Popular', 'Watch List', 'Genres', 'Recommend','Search'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {user,home, setHome,popular, setPopular,genre, setGenre,watch, setWatch,recommend, setRecommend,search, setSearch, login, setLogin, signUp, setSignUp, admin, setAdmin} = useContext(AppContext);
  
  const handleHome =()=>{
    setHome(true)
    setPopular(false)
    setGenre(false)
    setWatch(false)
    setRecommend(false)
    setSearch(false)
    setAdmin(false)

  }
  
  const handlePopular =()=>{
    setPopular(true)
    setHome(false)
    setGenre(false)
    setWatch(false)
    setRecommend(false)
    setSearch(false)
    setAdmin(false)
  
  }
  
  const handleGenre =()=>{
    setGenre(true)
    setHome(false)
    setPopular(false)
    setWatch(false)
    setRecommend(false)
    setSearch(false)
    setAdmin(false)

  }
  
  const handleWatch =()=>{
    setWatch(true)
    setHome(false)
    setPopular(false)
    setGenre(false)
    setRecommend(false)
    setSearch(false)
    setAdmin(false)

  }
  
  const handleRecommend =()=>{
    setRecommend(true)
    setHome(false)
    setPopular(false)
    setGenre(false)
    setWatch(false)
    setSearch(false)
    setAdmin(false)
 
  }
  
  const handleSearch =()=>{
    setSearch(true)
    setHome(false)
    setPopular(false)
    setGenre(false)
    setWatch(false)
    setRecommend(false)
    setAdmin(false)
   
  }

  const handleAll =()=>{
    setSearch(false)
    setHome(false)
    setPopular(false)
    setGenre(false)
    setWatch(false)
    setRecommend(false)
    setAdmin(false)
  }

  const handleAdmin =()=>{
    setAdmin(true)
    setSearch(false)
    setHome(false)
    setPopular(false)
    setGenre(false)
    setWatch(false)
    setRecommend(false)
  }

  const handleLogin =()=>{
    setLogin(true)
    setSignUp(false)
    setSearch(false)
    setHome(false)
    setPopular(false)
    setGenre(false)
    setWatch(false)
    setRecommend(false)
    setAdmin(false)
  }

  const handleSignUp =()=>{
    setSignUp(true)
    setLogin(false)
  }
  


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.table(user)

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box>
        <Link onClick={()=>handleHome()} to='/'>
          <img height="50px" alt="Flick Logo" src='https://res.cloudinary.com/dccf9vnoo/image/upload/v1655277848/flicklogo_weirr1.png'/>
          </Link>
          </Box>
          <Link onClick={()=>handleHome()} to='/' style={{textDecoration:"none"}}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 10,
              ml:2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Lora, serif;', 
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#081a36',
              textDecoration: 'none',
            }}
          >
            FLICK
          </Typography>
        </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
      
          <Link to='/' onClick={()=>handleHome()} style={{textDecoration:"none"}}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Lora, serif;',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#081a36',
              textDecoration: 'none',
            }}
          >
            FLICK
          </Typography>
          </Link>
          {user.token?
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {home?
            <Link onClick={()=>handleHome()} to='/' style={{textDecoration:"none", backgroundColor:"#081a36"}}>
              <Button
                key="home-nav"
                sx={{ my: 2, mx:3, display: 'block', color:"white", fontFamily: 'Lora, serif;',fontWeight: 600 }}
              >
                Home
              </Button>
            </Link>
            :
            <Link onClick={()=>handleHome()} to='/' style={{textDecoration:"none"}}>
            <Button
              key="home-nav"
              sx={{ my: 2, mx:3, color: '#081a36', display: 'block', fontFamily: 'Lora, serif;',fontWeight: 600,letterSpacing: '.1rem'}}
            >
              Home
            </Button>
          </Link>
            }
            {popular?
            <Link onClick={()=>handlePopular()} to='/moviecollection' style={{textDecoration:"none", backgroundColor:"#081a36"}}>
              <Button
                key="movies-nav"
                sx={{ my: 2, mx:3, display: 'block', color:"white", fontFamily: 'Lora, serif;',fontWeight: 600,letterSpacing: '.1rem'  }}
              >
                Popular
              </Button>
            </Link>
            :
            <Link onClick={()=>handlePopular()} to='/moviecollection' style={{textDecoration:"none"}}>
            <Button
              key="movies-nav"
              sx={{ my: 2, mx:3, color: '#081a36', display: 'block', fontFamily: 'Lora, serif;',fontWeight: 600,letterSpacing: '.1rem' }}
            >
              Popular
            </Button>
          </Link>
            }
            {genre?
            <Link onClick={()=>handleGenre()} to='/genres' style={{textDecoration:"none", backgroundColor:"#081a36"}}>
              <Button
                key="genres-nav"
                sx={{ my: 2, mx:3, display: 'block', color:"white", fontFamily: 'Lora, serif;',fontWeight: 600,letterSpacing: '.1rem' }}
              >
                Genres
              </Button>
            </Link>
            :
            <Link onClick={()=>handleGenre()} to='/genres' style={{textDecoration:"none"}}>
            <Button
              key="genres-nav"
              sx={{ my: 2, mx:3, color: '#081a36', display: 'block', fontFamily: 'Lora, serif;',fontWeight: 600,letterSpacing: '.1rem' }}
            >
              Genres
            </Button>
          </Link>
          }
          {watch?
            <Link onClick={()=>handleWatch()} to='/watchlist' style={{textDecoration:"none", backgroundColor:"#081a36"}}>
            <Button
              key="watchlist-nav"
              sx={{ my: 2, mx:3, display: 'block', color:"white", fontFamily: 'Lora, serif;',fontWeight: 600,letterSpacing: '.1rem' }}
            >
              Watch List
            </Button>
          </Link>
          :
          <Link onClick={()=>handleWatch()} to='/watchlist' style={{textDecoration:"none"}}>
          <Button
            key="watchlist-nav"
            sx={{ my: 2, mx:3, color: '#081a36', display: 'block', fontFamily: 'Lora, serif;',fontWeight: 600,letterSpacing: '.1rem' }}
          >
            Watch List
          </Button>
        </Link>
        }
        {recommend?
            <Link onClick={()=>handleRecommend()} to='/recommend' style={{textDecoration:"none", backgroundColor:"#081a36"}}>
              <Button
                key="recommendlist-nav"
                sx={{ my: 2, mx:3, display: 'block', color:"white", fontFamily: 'Lora, serif;',fontWeight: 600,letterSpacing: '.1rem' }}
              >
                Recommended
              </Button>
            </Link>
            :
            <Link onClick={()=>handleRecommend()} to='/recommend' style={{textDecoration:"none"}}>
            <Button
              key="recommendlist-nav"
              sx={{ my: 2, mx:3, color: '#081a36', display: 'block', fontFamily: 'Lora, serif;',fontWeight: 600,letterSpacing: '.1rem'  }}
            >
              Recommended
            </Button>
          </Link>
            }
    
            {search?
            <Link onClick={()=>handleSearch()} to='/search' style={{textDecoration:"none", backgroundColor:"#081a36"}}>
              <Button
                key="search-nav"
                sx={{ my: 2, mx:3, display: 'block', color:"white", fontFamily: 'Lora, serif;',fontWeight: 600,letterSpacing: '.1rem'}}
              >
                Search
              </Button>
            </Link>
            :
            <Link onClick={()=>handleSearch()} to='/search' style={{textDecoration:"none"}}>
            <Button
              key="search-nav"
              sx={{ my: 2, mx:3, color: '#081a36', display: 'block', fontFamily: 'Lora, serif;',fontWeight: 600,letterSpacing: '.1rem' }}
            >
              Search
            </Button>
            </Link>
            }
            {!user.is_admin?
            ""
          :
       
            admin?
            <Link onClick={()=>handleAdmin()} to='/admin' style={{textDecoration:"none", backgroundColor:"#081a36"}}>
              <Button
                key="admin-nav"
                sx={{ my: 2, mx:3, display: 'block', color:"white", fontFamily: 'Lora, serif;',fontWeight: 600,letterSpacing: '.1rem'}}
              >
                Admin
              </Button>
            </Link>
            : 
            <Link onClick={()=>handleAdmin()} to='/admin' style={{textDecoration:"none"}}>
            <Button
              key="admin-nav"
              sx={{ my: 2, mx:3, color: '#081a36', display: 'block', fontFamily: 'Lora, serif;',fontWeight: 600,letterSpacing: '.1rem' }}
            >
              Admin
            </Button>
            </Link>
            }
          </Box>
          :
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           {login? 
          <Link onClick={()=>handleLogin()} to='/login' style={{textDecoration:"none", backgroundColor:"#081a36"}}>
            <Button
              key="home-nav"
              
              sx={{ my: 2, mx:3, color:"white", display: 'block',fontWeight: 600,letterSpacing: '.1rem' }}
            >
              Login
            </Button>
          </Link>
          :
          <Link onClick={()=>handleLogin()} to='/login' style={{textDecoration:"none"}}>
          <Button
            key="home-nav"
            sx={{ my: 2, mx:3, color: '#081a36', display: 'block',fontWeight: 600,letterSpacing: '.1rem' }}
          >
            Login
          </Button>
        </Link>
          }
          {signUp?
          <Link onClick={()=>handleSignUp()} to='/signup' style={{textDecoration:"none", backgroundColor:"#081a36"}}>
            <Button
              key="movies-nav"
              
              sx={{ my: 2, mx:3, color:"white", display: 'block',fontWeight: 600,letterSpacing: '.1rem' }}
            >
              Sign Up
            </Button>
          </Link>
          :
          <Link onClick={()=>handleSignUp()} to='/signup' style={{textDecoration:"none"}}>
          <Button
            key="movies-nav"
            sx={{ my: 2, mx:3, color: '#081a36', display: 'block',fontWeight: 600,letterSpacing: '.1rem' }}
          >
            Sign Up
          </Button>
        </Link>
          }
        </Box>
}
          <Box sx={{ flexGrow: 0 }}>
         
            <Tooltip title="Account Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={user.img} sx={{ width: 45, height: 45 }}/>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
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
              {user.token?
              <div>
                <MenuItem key="account-nav" onClick={handleCloseUserMenu}>
                <Modal/>
                </MenuItem>
                <MenuItem key="edit-profile-nav" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to = "/signup" onClick={()=>handleAll()} style={{textDecoration:"none", color:"white"}}>
                    Edit Account
                    </Link>
                    </Typography>
                </MenuItem>
                <MenuItem key="delete-nav" onClick={handleCloseUserMenu}>
                <Dialog/>
                </MenuItem>
                <MenuItem key="logout-nav" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/logout" onClick={()=>handleLogin()} style={{textDecoration:"none", color:"white"}}>
                    Logout
                    </Link>
                    </Typography>
                </MenuItem>

                </div>
                :
                <MenuItem key="welcome-nav" onClick={handleCloseUserMenu}>
                <Typography textAlign="center" style={{textDecoration:"none", color:"white"}}>Welcome to Flick!</Typography>
              </MenuItem>
              
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;