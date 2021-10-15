const app=require('express')()

const express = require('express');
const mongoose =require('mongoose');
const userRoutes=require('./routes/user');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');

const cors=require('cors')

mongoose.connect('mongodb://localhost:27017/rapid');

app.use(express.json());
app.use(cors());


app.use('/user',userRoutes);
app.use('/category',categoryRoutes);
app.use('/product',productRoutes);

app.listen(5000,()=>{
  console.log('hi from server!')
})