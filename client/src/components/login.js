import { useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { AppContext } from '../App';
import { MDBInput ,MDBBtn} from 'mdb-react-ui-kit';

export default function () {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const { appState, setAppState } = useContext(AppContext);

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const handleLogin = () => {
    fetch('http://localhost:5000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, password
      })
    }).then(res => res.json())
      .then(data => {
        const { token } = data;
        if (token) {
          localStorage.setItem('token', token);
        } else {
          // 
        }
        history.push('/profile');
        alert('loggedin!');
        // console.log(data);
        // setAppState({
        //   ...appState,
        //   user: {
        //     email
        //   }
        // });
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
          <small>Not an user? <Link to='/signup'>Signup</Link> here</small><br/>
      <MDBBtn onClick={() => handleLogin()}>login</MDBBtn>

    </form>
      <div className='col-4'></div>
    </div>


  )
}

