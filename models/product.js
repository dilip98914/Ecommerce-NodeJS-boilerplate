const mongoose=require('mongoose')
const {Schema}=mongoose

const productSchema=new Schema({
  title:String,
  price:String,
  // category:{
  //   type:Schema.Types.ObjectId,
  //   ref:'Category'  
  // }
  category:String
})

module.exports=mongoose.model('Product',productSchema)