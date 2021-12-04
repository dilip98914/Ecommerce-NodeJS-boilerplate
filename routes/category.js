const express=require('express')
const router=express.Router()
const Category=require('../models/category')

router.post('/',(req,res)=>{
  const {title}=req.body;
  const category=new Category({
    title,
  })
  category.save()
    .then(cat=>{
      return res.status(200).json({
        message:"category saved",
        data:cat
      })
    })
    .catch(err=>{
      console.error(err)
      return res.status(500).json({
        message:"error creating category"
      });      
    })
})

router.get('/',(req,res)=>{
  Category.find()
    .then(cc=>{
      return res.status(200).json({
        cc
      })
    }).catch(err=>console.log(err))
})

module.exports=router;