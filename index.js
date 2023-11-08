const express = require("express");
require("dotenv").config()

const {connection} = require("./configs/db")
const swaggerUi = require('swagger-ui-express');
const {swaggerSpec} = require('./configs/swagger');


const cors=  require("cors");

const app = express()

const { userRouter }= require("./routes/user.route")


app.use(express.json())
app.use(cors());

app.get("/", (req,res) =>{
    res.status(200).send({"msg" : "Welcome to triveous"})


})

app.use("/user",userRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.port, async() =>{
    try{
        await connection 
        console.log("database connected!")
    } catch(error)
    {
        console.log("database not connected!")
        console.log(error)
    }

    console.log(`server is running on port :${process.env.port}`)
})
