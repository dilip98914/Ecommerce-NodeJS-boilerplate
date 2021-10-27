import { useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom';
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
        <Link to="/signup">Not an existing User?</Link>
      </div>
      <button type="submit" onClick={() => handleLogin()} className="btn btn-primary btn-block">Login</button>
    </form >
  )
}

