const express=require('express')
const router=express.Router()
const Product=require('../models/product')
const Razorpay=require('razorpay');
const shortid=require('shortid');
const crypto = require("crypto");


var instance = new Razorpay({
  key_id: '',
  key_secret: '',
});

const key_id='rzp_test_DCuOZsjNoaWJ5k';
const key_secret='emApi7uA0WDVFcrWM0lRGDmW';

router.post('/',(req,res)=>{
  const {title,price,category}=req.body;
  const product=new Product({
    title,price,category
  })
  product.save()
    .then(u=>{
      res.status(200).json(u);
    })
    .catch(err=>console.error(err))
})

router.get('/',(req,res)=>{
  const {id}=req.params;
  if(id){
    Product.findOne({_id:id})
    .then(u=>{
      return res.status(200).json(u);
    })
    .catch(err=>{
      console.error(err)
      return res.status(500)
    })
  }
  console.log('lala')
  Product.find()
    .then(u=>{
      console.log('come',u)
      return res.status(200).json(u);
    })
    .catch(err=>{
      console.error(err)
      return res.status(500)
    })
})

router.post('/',(req,res)=>{
  const {title,price,category}=req.body;
  const product=new Product({
    title,price,category
  })
  product.save()
    .then(u=>{
      res.status(200).json(u);
    })
    .catch(err=>console.error(err))
})

router.post('/create-order',(req,res)=>{
  const {amount}=req.body;
  console.log("dilipgup",req.body);
  var options = {
    amount:amount*100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: shortid.generate()
  };
  instance.orders.create(options)
    .then(order=>{
      console.log('order',order);
      return res.status(200).json({
        message:'order successfully created',
        orderId:order.id,
        key_id,
        name:'rapid ecomm corporation',
        amount,
        currency:"INR"
      })
    }).catch(err=>console.log(err));
})

router.post('/payment-verify',(req,res)=>{
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
  let body=razorpay_order_id+"|"+razorpay_payment_id;
  const sign=crypto.createHmac('sha256',key_secret)
          .update(body.toString())
          .digest('hex');
  console.log(sign,razorpay_signature,"signing");          
  if(sign===razorpay_signature){
    return res.status(200).json({
      message:"Signature is matched"
    })
  }else{
    return res.status(500).json({
      message:"Signature is not matched!, it's invalid"
    })
  }
})

module.exports=router;