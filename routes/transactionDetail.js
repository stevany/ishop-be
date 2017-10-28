var TransactionDetail=require('../model/transactionDetail');
var express=require('express');
var router=express.Router();

router.route("/transactionHeader/id/:id/details")
	.get(function(req,res){
		var response={};
		TransactionDetail.find({header:req.params.id}).populate('product', ['name','qty','urls']).populate('userUpdate','username')
		.exec(function(err, data){
			//Mongo command to fetch all data from collection.
			if(err){
				response={"err": true, "data": "Error fetching data "};
			}else{
				response={"error": false, "data" : data};
			}
	
			res.json(response);
		});
	})
	.post(function(req,res){
		
		var response={};
		console.log(req.body)
		TransactionDetail.insertMany(req.body, function(err,data){
			if(err){
				response={"error" : true, "data" : "Error adding data"};
			}else{
				response={"error" : false, "data" : data}
			}
		
			res.json(response)

			
				
			})
	})

module.exports=router;