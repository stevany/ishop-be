var mongoose=require("mongoose");

//Create a schema
var transactionHeaderSchema=new mongoose.Schema({
	
	dateTransaction:Date,
	notes:String,
	total:Number,
	customer:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
	},
	userUpdate:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
	},

	updated_at:Date,
	status:Boolean,
})
//create model if not exists
module.exports=mongoose.model('transactionHeader', transactionHeaderSchema);
