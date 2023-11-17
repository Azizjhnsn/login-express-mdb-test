const mongoose= require('mongoose')
const connect = mongoose.connect("mongodb://127.0.0.1:27017/MongoFirst")

// Check db connected or not
connect.then(()=>{
    console.log("succes");
})
.catch((error)=>{
    console.log(error);
})

// Creating a schema
const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    }
});

const collection = new mongoose.model("users", LoginSchema);

module.exports= collection