import './App.css';
import Card from './components/Card'
import NavBar from './components/NavBar';
import {Routes, Route} from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Login from './views/Login';
import Logout from './views/Logout';
import SignUp from './views/SignUp';
import MovieBrowser from './views/MovieBrowser';
import MyWatchList from './views/MyWatchList';
import SnackBar from './components/SnackBar'
import Genres from './views/Genres';
import GenreMovies from './components/GenreMovies';
import Search from './forms/Search'
import Explore from './views/Explore'
import RequireAccount from './components/RequireAccount';
import RequireAdmin from './components/RequireAdmin';
import Box from '@mui/material/Box';
import AdminMovies from './components/AdminMovies';
import Test from './components/Test';
import apiGenre from './api/apiGenre';
import apiMovie from './api/apiMovie';
import {useContext} from 'react';
import {AppContext} from './context/AppContext';
import {CancelToken} from 'apisauce';
import DarkButton from './components/DarkButton';


const handleAPITest= async ()=>{
  const source = CancelToken.source();
  const response_object= await apiMovie.getMoviesByUser('jheSbeq3gigxQJJQXGYbArkUl-8YYFIP5Qo43mJOv9I',1 ,source.token);
  console.log(response_object)
}


function App() {
    
    return (
    <div className="app">
      <SnackBar/>
      <NavBar/>
      <Box sx={{minHeight: '90vh'}}>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<RequireAccount redirectTo={'/'}><Logout/></RequireAccount>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/moviecollection' element={<RequireAccount redirectTo={'/'}><MovieBrowser/></RequireAccount>}/>
        <Route path='/watchlist' element={<RequireAccount redirectTo={'/'}><MyWatchList/></RequireAccount>}/>
        <Route path='/recommend' element={<RequireAccount redirectTo={'/'}><Explore/></RequireAccount>}/>
        <Route path='/moviecollection/:movieId' element={<RequireAccount redirectTo={'/'}><Card/></RequireAccount>}/>
        <Route path='/genres' element={<RequireAccount redirectTo={'/'}><Genres/></RequireAccount>}/>
        <Route path='/search' element={<RequireAccount redirectTo={'/'}><Search/></RequireAccount>}/>
        <Route path='/admin' element={<RequireAdmin redirectTo={'/'}><AdminMovies/></RequireAdmin>}/>
        <Route path='/genres/:genreName/:genreId' element={<RequireAccount redirectTo={'/'}><GenreMovies/></RequireAccount>}/>
      </Routes>
      </Box>
      {/* <DarkButton onClick={()=>handleAPITest()}>API TEST</DarkButton> */}
      {/* <Test/> */}
  </div>)
}

export default App;