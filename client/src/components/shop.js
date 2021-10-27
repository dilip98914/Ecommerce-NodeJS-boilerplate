import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AppContext } from '../App';
import { baseURL } from '../config/constant';

function fetchProducts(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

export default function () {
  const { appState, setAppState } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    // if(appState.user===null){
    //   history.push('/');
    //   alert('you should be logged in to view content!')
    // }
    fetchProducts('http://localhost:5000/product')
      .then(a => {
        setAppState({
          ...appState,
          products: a
        })
      })
      .catch(err => console.log(err))
  }, [])

  const addToCart = (p) => {
    let { cart: originalCart } = appState;
    const { category, price, title } = p;
    let found = false;
    originalCart.items.forEach(item => {
      if (item.title === p.title) {
        item.quantity += 1;
        found = true;
        return;
      }
    });
    if (!found) {
      originalCart.items.push({
        category, price, title, quantity: 1
      })
    }
    setAppState({
      ...appState,
      cart: {
        items: [...originalCart.items]
      }
    })
  }

  const getRandom=()=>{
    return Math.round(Math.random()*100)
  }

  return (
    <div className="container" id='shop'>
      <div className="row">
        {appState.products !== null && appState.products.map((p, i) => (
            <div className="col-3 card">
              <img
                src={`https://loremflickr.com/320/240?random=${getRandom()}`}
                className="card-img-top"
                alt="..."
                style={{ width: '200px' }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {p.title}
                </h5>
                <p className="card-text">
                  {p.price}
                </p>
                <p className="card-text">
                  {p.category}
                </p>
                <button type="button" className="btn btn-primary" onClick={() => addToCart(p)} style={{ background: '#2867B2', color: 'white', float: 'right', cursor: 'pointer' }}>+</button>
              </div>
            </div>
        ))}
      </div>
    </div>

  )
}
