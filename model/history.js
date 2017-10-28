var mongoose=require("mongoose");

//Create a schema
var historySchema=new mongoose.Schema({

	product:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'product'
	},
	user:
	{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
	},
	qty:Number,
	price:Number,
	stock:Number,
	note:String,
	created_at:Date,
	updated_at:Date,
	


})
//create model if not exists
module.exports=mongoose.model('history', historySchema);
