import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../App';
import { baseURL } from '../config/constant';
import { useHistory } from 'react-router-dom';


export default function (props) {
  const { appState, setAppState } = useContext(AppContext);
  const history = useHistory();

  // useEffect(()=>{
  //   if(appState.user===null){
  //     history.push('/');
  //     alert('you should be logged in to view content!')
  //   }
  // },[])

  const emptyCart = () => {
    setAppState({
      ...appState,
      cart: {
        ...appState.cart,
        items: []
      }
    })
  }

  const verifyPayment = (url, { razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
    })
      .then(a => a.json())
      .then(response => {
        console.log(response);
        alert(response.message);
        setAppState({
          ...appState,
          cart: {
            items: []
          }
        });
        history.push('/shop')
      }).catch(err => console.log(err))
  }


  const createOrder = (url, amount) => {
    console.log(amount, "dg")
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      })
        .then(a => a.json())
        .then(response => {
          resolve(response);
        }).catch(err => reject(err))
    })
  }

  const handleCheckout = () => {
    const amount = calculateSubTotal();
    createOrder(`${baseURL}/product/create-order`, amount).then(response => {
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

  const calculateSubTotal = () => {
    let total = 0;
    if (!appState.cart.items) return 0;
    appState.cart.items.forEach(item => {
      const { quantity, price } = item;
      total += quantity * price;
    })
    return total;
  }

  const getRandom = () => {
    return Math.round(Math.random() * 100)
  }

  return (
    <>
      <p id='cart-heading'>Cart Summary</p>
      <div className='cart' id='cart'>
        <div className='left-wrapper'>
          {appState.cart.items.length !== 0 && appState.cart.items.map((p, i) => (
            <div id='cart-item'>
              <div className='left'>
                <img
                  src={`https://loremflickr.com/320/240?random=${getRandom()}`}
                  className="card-img-top"
                  alt="..."
                  style={{ width: '80px', height: '160px',marginRight:'40px',borderRadius:'10px' }}
                />
              </div>
              <div className='right'>
                <small style={{color:'black'}}><strong>{p.title}</strong></small><br/>
                <small><strong>Price: <span style={{color:'black'}}>{p.price}$</span></strong></small><br/>
                <small><strong> Quantity: <span style={{color:'black'}}>{p.quantity}</span></strong></small><br/>
                <i style={{color:'red'}} class="fas fa-heart"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                <i style={{color:'#2867B2'}} class="fas fa-trash"></i>
              </div>
            </div>
          ))}
        </div>
        <div className='right-wrapper'>
            <p id='cart-heading0'><strong>Subtotal: {calculateSubTotal()}</strong></p>
            <button onClick={() => emptyCart()} className="btn btn-danger btn-block">Clear Cart</button>
            <button onClick={() => handleCheckout()} className="btn btn-primary btn-block">Checkout</button>
        </div>
      </div>
    </>
  )
}

