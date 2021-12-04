import {useState} from 'react'
import {useHistory,Link} from 'react-router-dom';
import { MDBInput ,MDBBtn} from 'mdb-react-ui-kit';

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
    <div className='row'>
      <div className='col-4'></div>
      <form className='card col-4' id='reg-form'>
        <MDBInput 
          label='Enter email'
          type='email'
          name='email'
          value={email}
          onChange={(e) => handleChange(e)}
          />
          <br/>
        <MDBInput 
          label='Enter password'
          type='password'
          name='password'
          value={password}
          onChange={(e) => handleChange(e)}
          />
          <br/>
          <small>Already an user? <Link to='/login'>Login</Link> here</small><br/>
      <MDBBtn onClick={() => handleSignup()}>Signup</MDBBtn>

    </form>
      <div className='col-4'></div>
    </div>
 )
}