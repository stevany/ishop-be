var mongoose=require("mongoose");

//Create a schema
var transactionDetailSchema=new mongoose.Schema({
	
	header: {
		type:mongoose.Schema.Types.ObjectId,
		ref:'transactionHeader'
	},
	product:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'product'},
	
	qty:Number,
	price:Number,
	userUpdate:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
	},
	created_at:Date,
	updated_at:Date,
	status:Boolean
})
//create model if not exists
module.exports=mongoose.model('transactionDetail', transactionDetailSchema);
