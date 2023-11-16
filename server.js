// Importing dependencies
const express = require('express')
const pasth= require('path')
const bcrypt= require('bcrypt')

const app= express()
const Port= 4400

// Setting view engine
app.set('view engine', 'ejs')

// Adding static file
app.use(express.static('public'))

// Settin routes
app.get('/',(req,res)=>{
    res.render('login.ejs')
})

app.get('/signup', (req,res)=>{
    res.render('signup.ejs')
})


app.listen(Port,()=>{
    console.log(` server listening on port: http://localhost:${Port}`);
})