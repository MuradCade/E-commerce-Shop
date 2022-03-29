const router = require('express').Router()
const Product = require('../models/Products');
const {verifyAuth,verifyAuthandAdmin,verify} = require('./verify');

//creating product

router.post('/product', verifyAuthandAdmin, async(req,res)=>{
    const product = new Product(req.body)
    try {
        const NewProduct = await product.save()
        res.status(200).json(NewProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})
//update product

router.put('/:id', verifyAuthandAdmin, async(req,res)=>{
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})
//Deleted
router.delete('/:id', verifyAuthandAdmin, async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted a product")
    } catch (err) {
        res.status(500).json(err)
    }
})
//get a product
router.get('/find/:id', async(req,res)=>{
   try {
       const products = await Product.findById(req.params.id)
       res.status(200).json(products);
   } catch (err) {
       res.status(500).json(err)
   }
})

//get all
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategories = req.query.Categories;
    try {
      let products
        if(qNew){
            products = await Product.find().sort({ createdAt: -1 }).limit(1)
        } else if(qCategories){
            products = await Product.find({categories:{
                $in:[qCategories]
            }});
        }else{
            products = await Product.find()
        }
        
      res.status(200).json(products);
     } catch (err) {
      res.status(500).json(err);
     }
});













module.exports = router;