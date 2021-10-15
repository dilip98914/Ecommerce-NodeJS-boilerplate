import {createContext,useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import "./index.css"
import Shop from './components/shop';
import Login from './components/login';
import Signup from './components/signup';
import Cart from './components/cart';
import Navbar from './components/navbar';
import Profile from './components/profile';
import {baseURL} from './config/constant';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

export const AppContext=createContext();

function App() {
  const [appState,setAppState]=useState({
    user:null,
    products:null,
    cart:{
      items:[]
    }
  })
  const history=useHistory();

  const getUser=()=>{
    fetch(`${baseURL}/user/get-user-by-token`,{
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token:localStorage.getItem('token')})
    }).then(res=>{
      const {email}=res;
      setAppState({
        ...appState,
        user:{
          email
        }
      })
    }).catch(err=>console.log(err));
  }

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      // window.location.reload('/');
      // console.log(window.location.pathname,'paths')
      // alert('you should be logged in to view content!')
    }else{
      getUser();
    }
  },[localStorage,window.location.pathname])

  return (
    <AppContext.Provider value={{appState,setAppState}}>
      <Router>
          <Navbar logged={false} />
          <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>
          <Route  path='/shop'>
            <Shop />
          </Route>
          <Route exact path='/'>
            <>
              <h1 className='centered'>HOMEPAGE</h1>
            </>
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
