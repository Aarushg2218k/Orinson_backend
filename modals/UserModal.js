const mongoose=require("mongoose");

function Getusermodal(){
    const users=mongoose.Schema({
        email:{type:String,unique:true,index:true,require:true},
        password:{type:String},
    },
    {
        versionKey: false, // to avoid __v field in table come by default
    }
    )
    const modal=mongoose.model("Users",users);
    return modal;
}
    module.exports={Getusermodal};