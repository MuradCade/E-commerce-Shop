const JWT = require('jsonwebtoken')

const verify = (req,res,next) =>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        JWT.verify(token, process.env.JWT,(err,user)=>{
            if(err) res.status(401).json("token is valid")
            req.user = user ;
            next()
        })
    }else{
        res.status(403).json("you aren't authentiction")
    }
}

const verifyAuth = (req,res,next)=>{
    verify(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("your aren't allowed")
        }
    })
}
const verifyAuthCart = (req,res,next)=>{
    verify(req,res,()=>{
        if(req.user.id === req.params.userId || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("your aren't allowed")
        }
    })
}
const verifyAuthandAdmin = (req,res,next)=>{
    verify(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("your aren't allowed")
        }
    })
}

module.exports = {verifyAuth,verifyAuthandAdmin,verify,verifyAuthCart};