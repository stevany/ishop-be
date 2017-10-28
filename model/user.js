var mongoose=require("mongoose");

//Create a schema
var userSchema=new mongoose.Schema({
	
	name: String,
	username:{type:String, required:true, unique:true},
	password:{type:String, required:true},
	address:{type:String, required:true},
	phone:String,
	created_at:Date,
	updated_at:Date,
	active:Boolean,

	roles:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'role'
	}]
})
//create model if not exists
module.exports=mongoose.model('user', userSchema);
