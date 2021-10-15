import {useContext,useState,useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom';
import {AppContext} from '../App';
import {baseURL} from '../config/constant';

export default function () {
  const {appState,setAppState}=useContext(AppContext);  
  const [email,setEmail]=useState(null);

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
      setEmail(email);
    }).catch(err=>console.log(err));
  }


  useEffect(()=>{
    if(!localStorage.getItem('token')){
      setEmail(null);
    }else{
      getUser();
    }
  },[localStorage])
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Link to='/'>
        <h4>RAPID STORE</h4>
      </Link>
      {
        email === null ?
          <>
            <Link to='/login'>
              <h4>Login></h4>
            </Link>
            <Link to='/signup'>
              <h4 >Signup></h4>
            </Link>
          </>
          :
          <>
            <Link to='/profile'>
              <h4 >Profile: {email}</h4>
            </Link>
            <button onClick={()=>{localStorage.removeItem('token');window.location.reload()}}>
              <h4 >Logout></h4>
            </button>
          </>
      }
      <Link to='/cart'>
        <h4 >go to cart</h4>
      </Link>
      <Link to='/shop'>
        <h4 >shop</h4>
      </Link>
    </div>
  )
}