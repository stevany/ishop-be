var History=require('../model/history');
var Product=require('../model/product')
var express=require('express');
var router=express.Router();


router.route("/product/history")
	.post(function(req,res){
		
		var response={};
		
		History.insertMany(req.body, function(err,data){
			if(err){
				response={"error" : true, "data" : "Error adding data"};
			}else{
				response={"error" : false, "data": data};
			}
			console.log(response)
			res.json(response)
		})
	})



module.exports=router;