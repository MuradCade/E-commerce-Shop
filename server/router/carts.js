const router = require('express').Router()
const Cart = require('../models/Cart');
const {verifyAuth,verifyAuthandAdmin,verify,verifyAuthCart} = require('./verify');

//creating Cart

router.post('/cart', verify, async(req,res)=>{
    const cart = new Cart(req.body)
    try {
        const NewCart = await cart.save()
        res.status(200).json(NewCart)
    } catch (err) {
        res.status(500).json(err)
    }
})
//update Cart

router.put('/:id', verifyAuth, async(req,res)=>{
    try {
        const UpdateCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(UpdateCart)
    } catch (err) {
        res.status(500).json(err)
    }
})
//Deleted
router.delete('/:id', verifyAuth, async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart been Deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})
//get user Cart
router.get('/find/:userId', async(req,res)=>{
   try {
       const Cart = await Cart.findOne({userId:req.params.userId})
       res.status(200).json(Cart);
   } catch (err) {
       res.status(500).json(err)
   }
})

//get all
router.get("/", verifyAuthandAdmin, async (req, res) => {
    try {
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err)
    }
});













module.exports = router;