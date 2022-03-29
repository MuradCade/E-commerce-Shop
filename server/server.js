//importing the dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express()
const authRoute = require('./router/auth')
const UserRoute = require('./router/user')
const ProductRouter = require('./router/products')
const CartRouter = require('./router/carts')
const OrderRouter = require('./router/order')

//making connecting Mongo db
mongoose.connect(process.env.MONGODB, () =>{
    console.log("DB is connecting");
})

//making routing
app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use('/users', UserRoute)
app.use('/auth/users', authRoute)
app.use('/auth/products', ProductRouter)
app.use('/auth/carts', CartRouter)
app.use('/auth/orders', OrderRouter)
//making ports
const port = 5000;
app.listen(port, () =>{
    console.log(`backend connecting port;${port}`);
})