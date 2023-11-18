// Importing dependencies
const express = require('express')
const pasth= require('path')    
const bcrypt= require('bcrypt')
const collection = require('./src/config')


const app= express()
const Port= 4400
// convert data into jason
app.use(express.json()),

app.use(express.urlencoded({extended: false}));

// Setting view engine
app.set('view engine', 'ejs')

// Adding static file
app.use(express.static('public'))

// Home route
app.get('/',(req,res)=>{
    res.render('index')
})
// Settin routes
app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.get('/signup', (req,res)=>{
    res.render('signup.ejs')
})

// Sign up user
app.post('/signup', async(req,res)=>{
    // Getting the data
    const data = {
        name: req.body.username,
        password: req.body.password
    }
// Check if user exists
const existingUser = await collection.findOne({name: data.name});
if(existingUser) {
    console.log('User alredy exists try a different User name');
}else{
    // Hashing password
    const saltRound = 10 //Number of saltrounds for bcrypt
    const hashPassword = await bcrypt.hash(data.password, saltRound)

    data.password = hashPassword // Replace the original password with the hashpassword

    const userdata = await collection.insertMany(data);
    console.log(userdata);
    res.redirect('/')
}

})


// log in user
app.post("/login", async(req,res)=>{
    try{
        // Checking if username is valid
        const check = await collection.findOne({name: req.body.username});
        if(!check) {
            console.log("User name not found")
        }
        // Comparing hash password in db with current user input
        const isPasswordMatch= await bcrypt.compare(req.body.password, check.password)
        if(isPasswordMatch){
            return res.redirect('/')
        }else{
            console.log();("wrong password")
        }
    }catch{
        console.log();("wrong Details")
    }
})



app.listen(Port,async()=>{
    console.log(` server listening on port: http://localhost:${Port}`);
})