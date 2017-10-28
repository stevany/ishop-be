var mongoose=require("mongoose");

//Create a schema
var roleSchema=new mongoose.Schema({

	name: String
})
//create model if not exists
module.exports=mongoose.model('role', roleSchema);
