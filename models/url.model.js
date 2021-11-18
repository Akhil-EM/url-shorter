var mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    url:{type:String,required:true},
    authKey:{type:String,required:true}
},{timestamps:true});


module.exports = mongoose.model("url",urlSchema);