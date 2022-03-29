const router = require('express').Router();
const User = require('../models/Users');
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');



//register

router.post('/register', async (req,res)=>{
    const emailExites = await User.findOne({email:req.body.email});
    if(emailExites) return res.status(403).json("email is already exits");
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO).toString()
        
    })
    try {
        const SavedPost = await user.save();
        res.status(200).json(SavedPost)
        
    } catch (err) {
        res.status(500).json(err)
        
    }
});

//login

router.post('/login', async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        !user && res.status(401).json("wrong username and password")

        const hashed = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO);
        const original = hashed.toString(CryptoJS.enc.Utf8)

        original !== req.body.password &&
        res.status(403).json("wrong username and password")
        const accessToken = JWT.sign({
            id: user._id,
            isAdmin:user.isAdmin
        }, process.env.JWT, {expiresIn:'3d'})
        const {password, ...others} = user._doc;
        res.status(200).json({...others,accessToken})
    } catch (err) {
        res.status(500).json(err)
    }
})









module.exports = router;