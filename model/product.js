var mongoose=require("mongoose");

//Create a schema
var productSchema=new mongoose.Schema({
	
	name: {type:String},
	alias:{type:String},
	urls:[{
		name:String,
		path:String
	}],
	group:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'group'
	},
	price:Number,
	qty:Number,
	userUpdate:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
	},
	created_at:Date,
	updated_at:Date,
	active:Boolean,
})
//create model if not exists
module.exports=mongoose.model('product', productSchema);
