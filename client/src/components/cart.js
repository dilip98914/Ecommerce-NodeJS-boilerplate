import { useState, useEffect ,useContext} from 'react'
import { AppContext } from '../App';
import {baseURL} from '../config/constant';
import {useHistory} from 'react-router-dom';


export default function (props) {
  const { appState, setAppState } = useContext(AppContext);
  const history=useHistory();

  // useEffect(()=>{
  //   if(appState.user===null){
  //     history.push('/');
  //     alert('you should be logged in to view content!')
  //   }
  // },[])

  const emptyCart=()=>{
    setAppState({
      ...appState,
      cart:{
        ...appState.cart,
        items:[]
      }
    })
  }

  const verifyPayment = (url, { razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    return fetch(url, { method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature })})
      .then(a => a.json())
      .then(response => {
        console.log(response);
        alert(response.message);
        setAppState({
          ...appState,
          cart:{
            items:[]
          }
        });
        history.push('/shop')
      }).catch(err => console.log(err))
  }
  
  
  const createOrder = (url,amount) => {
    console.log(amount,"dg")
    return new Promise((resolve, reject) => {
      fetch(url, { method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount})})
        .then(a => a.json())
        .then(response => {
          resolve(response);
        }).catch(err =>reject(err))
    })
  }

  const handleCheckout = () => {
    const amount=calculateSubTotal();
    createOrder(`${baseURL}/product/create-order`,amount).then(response=>{
      const { orderId, key_id, name, amount, currency } = response;
      console.log(orderId);
      const options = {
        "key": key_id,
        "amount": amount,
        "currency": currency,
        "name": name,
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId,
        "handler": function (rsp) {
          verifyPayment(`${baseURL}/product/payment-verify`, rsp)
        },
        "theme": {
          "color": "#3399cc"
        }
      }
      const rz = new window.Razorpay(options);
      rz.on('payment.failed', (e) => {
        console.log(e);
      })
      rz.open();
    }).catch(err => console.log(err))
  }

  const calculateSubTotal=()=>{
    let total=0;
    if(!appState.cart.items) return 0;
    appState.cart.items.forEach(item=>{
      const {quantity,price}=item;
      total+=quantity*price;
    })
    return total;
  }

  return (
    <>
    <table style={{width:'50%',margin:'auto'}}>
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
          quantity
        </th>
      </tr>
      {appState.cart.items.length!==0 && appState.cart.items.map((p, i) => (
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
            {p.quantity}
          </td>
        </tr>
      ))}
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>SUBTOTAL</td>
        <td>{calculateSubTotal()}$</td>
        <td>
          <button onClick={()=>{emptyCart()}} style={{ background: 'white', color: 'red',float:'right',cursor:'pointer' }}>Empty the cart</button>
        </td>
        <td>
          <button onClick={()=>{handleCheckout()}} style={{ background: 'white', color: 'green',float:'right',cursor:'pointer' }}>Checkout</button>
        </td>
      </tr>
        
    </table>
    <div className='centered' style={{color:'violet'}}>
      {appState.cart.items.length===0 ? <h5>Cart is empty!!! FILL IT</h5>:null }
    </div>
    </>
  )
}