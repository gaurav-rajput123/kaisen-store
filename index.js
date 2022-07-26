const express  = require('express')
const app= express()

app.use('/products', productRouter)

app.listen(8080, ()=>{
    console.log("Started on port 8080")
})