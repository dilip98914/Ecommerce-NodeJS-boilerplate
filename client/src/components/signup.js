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
    <form className='forms'>
      <div className="form-outline mb-4">
        <input
          type="email"
          id="form1Example1"
          className="form-control"
          name='email'
          value={email}
          onChange={(e) => handleChange(e)}
        />
        <label className="form-label" for="form1Example1">Email address</label>
      </div>

      <div className="form-outline mb-4">
        <input
          id="form1Example2"
          className="form-control"
          name='password'
          value={password}
          onChange={(e) => handleChange(e)}
          type='password'
        />
        <label className="form-label" for="form1Example2">Password</label>
      </div>

      <div className="col">
        <Link to="/login">Already registered?</Link>
      </div>
      <button type="submit" onClick={() => handleSignup()} className="btn btn-primary btn-block">Signup</button>
    </form >
 )
}