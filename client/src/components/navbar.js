import { useContext, useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { AppContext } from '../App';
import { baseURL } from '../config/constant';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse
} from 'mdb-react-ui-kit';

export default function () {
  const { appState, setAppState } = useContext(AppContext);
  const [email, setEmail] = useState(null);
  const [showBasic, setShowBasic] = useState(false);

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

    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand >
          <Link to='/'>
            <img className='logo-image' src='img/logo.png' />
          </Link>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page'>
                <Link to='/shop'>
                Shop
                </Link>
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link'>
                  Account
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink>
                <Link to='/signup'>
                Signup
                      </Link>
                      </MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink>
                <Link to='/login'>
                      Login
                      </Link>
                      </MDBDropdownLink>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='Search' aria-label='Search' />
            <MDBBtn color='primary'>
              <i class="fas fa-search"></i>
            </MDBBtn>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>


  )
}

