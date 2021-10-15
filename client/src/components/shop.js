import { useState, useEffect, useContext } from 'react'
import {useHistory} from 'react-router-dom';
import { AppContext } from '../App';
import {baseURL} from '../config/constant';

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
  const history=useHistory();

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

  return (
    <table>
      <tr>
        <th>
          Sno.
        </th>
        <th>
          Title
        </th>
        <th>
          price
        </th>
        <th>
          category
        </th>
      </tr>
      {appState.products !== null && appState.products.map((p, i) => (
        <tr>
          <td>
            {i + 1}
          </td>
          <td>
            {p.title}
          </td>
          <td>
            {p.price}
          </td>
          <td>
            {p.category}
            <button onClick={() => addToCart(p)} style={{ background: 'white', color: 'green', float: 'right', cursor: 'pointer' }}>+</button>
          </td>
        </tr>
      ))}
    </table>
  )
}