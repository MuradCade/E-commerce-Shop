const router = require('express').Router();
const User = require('../models/Users');
const CryptoJS = require('crypto-js');
const {verifyAuth,verifyAuthandAdmin} = require('./verify')


//update

router.put('/:id', verifyAuth, async(req,res)=>{
    if(req.body.password){
        req.body.password =  CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO).toString() 
    }
    try {
        const update = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete users
router.delete('/:id', verifyAuth, async(req,res)=>{ 
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted user")
    } catch (err) {
        res.status(500).json(err)
    }
})

//status
router.get('/stats', verifyAuthandAdmin, async(req,res)=>{
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
 
    try {
      const data = await User.aggregate([
          {$match: {createdAt: {$gte: lastYear}}},
          {
              $project:{
                  month:{$month: "$createdAt"},
              },
          },
          {
              $group:{
                  _id: "$month",
                  total:{$sum: 1},
              },
          },
        
      ]);
      
      res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err)
  }
})

//get users
router.get('/:id', verifyAuth, async(req,res)=>{ 
  try {
     const find = await User.findById(req.params.id);
      res.status(200).json(find)
  } catch (err) {
      res.status(500).json(err)
  }
})
//getAll users
router.get('/', verifyAuthandAdmin, async(req,res)=>{ 
  try {
     const find = await User.find();
      res.status(200).json(find)
  } catch (err) {
      res.status(500).json(err)
  }
})








module.exports = router;