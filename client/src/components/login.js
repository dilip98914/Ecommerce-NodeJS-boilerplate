import { useState, useContext } from 'react'
import { useHistory ,Link} from 'react-router-dom';
import { AppContext } from '../App';

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
        const {token}=data;
        if(token){
          localStorage.setItem('token',token);
        }else{
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
    <div>
      <input
        name='email'
        value={email}
        onChange={(e) => handleChange(e)}
        type='text'
        placeholder='EMAIL'
      />
      <input
        name='password'
        value={password}
        onChange={(e) => handleChange(e)}
        type='password'
        placeholder='PASSWORD'
      />
      <button style={{ background: 'white', color: 'green', cursor: 'pointer' }} onClick={() => handleLogin()}>LOGIN</button>
      <h5>not a  registered user...<Link to='/signup'>click here</Link></h5>
    </div>
  )
}