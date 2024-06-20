const mongoose = require("mongoose");

 

const user= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    private:[
        {
            category:{
                type:String
            },
            keyword:{
                type:String,
                required:true,
                trim:true
            },
            code:{
                type:String
            },
            scope:{
                type:String
            },
            description:{
                type:String
            }         
        }
    ],
    public:[
        {
            category:{
                type:String
            },
            keyword:{
                type:String,
                required:true,
                trim:true
            },
            code:{
                type:String
            },
            scope:{
                type:String
            },
            description:{
                type:String
            }         
        }
    ]
});


module.exports=mongoose.model("User",user);



