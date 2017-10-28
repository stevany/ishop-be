var mongoose=require("mongoose");

//Create a schema
var groupSchema=new mongoose.Schema({

	name: String
})
//create model if not exists
module.exports=mongoose.model('group', groupSchema);
