const router = require('express').Router()
const Order = require('../models/Order');
const {verifyAuth,verifyAuthandAdmin,verify} = require('./verify');

//creating Cart

router.post('/order', verify, async(req,res)=>{
    const order = new Order(req.body)
    try {
        const NewOrder = await order.save()
        res.status(200).json(NewOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})
//update Cart

router.put('/:id', verifyAuthandAdmin, async(req,res)=>{
    try {
        const order = await Order.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(order)
    } catch (err) {
        res.status(500).json(err)
    }
})
//Deleted
router.delete('/:id', verifyAuthandAdmin, async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order been Deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})
//get user Cart
router.get('/find/:id', verifyAuth, async(req,res)=>{
   try {
       const order = await Order.findOne(req.params.id)
       res.status(200).json(order);
   } catch (err) {
       res.status(500).json(err)
   }
})

//get all
router.get("/", verifyAuthandAdmin, async (req, res) => {
    try {
        const order = await Order.find();
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err)
    }
});

//get income

router.get('/income', verifyAuthandAdmin, async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

    try {
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: prevMonth}}},
            {
                $project:{
                    month:{$month: "$createdAt"},
                    sales:"$amount",
                },
            },
            {
                $group:{
                    _id: "$month",
                    total:{$sum: "$sales"},
                },
            },
          
        ]);
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err)
    }
})













module.exports = router;