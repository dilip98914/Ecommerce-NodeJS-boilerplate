import {useState,useContext,useEffect} from 'react'
import {AppContext} from '../App';
import {useHistory} from 'react-router-dom';
import {baseURL} from '../config/constant';

export default function(props){
  const {appState,setAppState}=useContext(AppContext);
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
      history.push('/');
    }else{
      getUser();
    }
  },[localStorage])

  return (
    <div style={{margin:'auto'}}>
      Welcome {appState.user!==null ? appState.user.email: "none"}!
      Here you can shop any product , this is a prototype written as fast as possible
      with real  payment.
   </div>
  )
}