import {useState} from 'react'
import {useHistory,Link} from 'react-router-dom';

export default function(){
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const history=useHistory();

  const handleChange=(e)=>{
    if(e.target.name==='email'){
      setEmail(e.target.value)
    }else if(e.target.name==='password'){
      setPassword(e.target.value)
    }
  }

  const handleSignup=()=>{
    fetch('http://localhost:5000/user/register',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email,password
      })
    }).then(res=>res.json())
      .then(data=>{
        alert('registered!');
        history.push('/login');
      })
      .catch(err => console.log(err))
  }
  
  return (
    <div>
      <input
        name='email'
        value={email}
        onChange={(e)=>handleChange(e)}
        type='text'
        placeholder='EMAIL'
      />
      <input
        name='password'
        value={password}
        onChange={(e)=>handleChange(e)}
        type='password'
        placeholder='PASSWORD'
      />
      <button onClick={()=>handleSignup()}>signup</button>
      <h5>already a user...<Link to='/login'>login here</Link></h5>
    </div>
  )
}