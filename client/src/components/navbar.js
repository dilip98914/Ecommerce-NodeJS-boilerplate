import { useContext, useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { AppContext } from '../App';
import { baseURL } from '../config/constant';

export default function () {
  const { appState, setAppState } = useContext(AppContext);
  const [email, setEmail] = useState(null);

  const getUser = () => {
    fetch(`${baseURL}/user/get-user-by-token`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('token') })
    }).then(res => {
      const { email } = res;
      setAppState({
        ...appState,
        user: {
          email
        }
      })
      setEmail(email);
    }).catch(err => console.log(err));
  }


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setEmail(null);
    } else {
      getUser();
    }
  }, [localStorage])

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top" id='navbar'>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarExample01"
          aria-controls="navbarExample01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarExample01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active" id='logo'>
              <Link className="nav-link" aria-current="page" to='/'>
                <img style={{ width: '100px' }} src='img/logo.png' />
              </Link>
            </li>
            <div className='right-portion'>
              <li>
                <div class="input-group">
                  <div class="form-outline">
                    <input type="search" id="form1" class="form-control" />
                    <label class="form-label" for="form1">Search</label>
                  </div>
                  <button type="button" class="btn btn-primary">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </li>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <li className="nav-item">
                <Link className="nav-link" to='/cart' aria-current="page" >
                  <i class="fas fa-shopping-cart"></i>&nbsp;&nbsp;
                  Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/shop' aria-current="page" >
                  Shop</Link>
              </li>

              {
                email === null ?
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to='/login' aria-current="page" >
                        Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/signup' aria-current="page" >
                        Signup</Link>
                    </li>

                  </>
                  :

                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to='/profile' aria-current="page" >
                        <i class="fas fa-user-alt"></i>&nbsp;
                        Profile {email}</Link>
                    </li>
                    <li className="nav-item">
                      <button onClick={() => { localStorage.removeItem('token'); window.location.reload() }} className="btn btn-primary" aria-current="page" >
                        <i class="fas fa-power-off"></i>&nbsp;
                        Logout</button>
                    </li>
                  </>
              }
            </div>
          </ul>
        </div>
      </div>
    </nav>

  )
}

