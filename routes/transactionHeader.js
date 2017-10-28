var TransactionHeader=require('../model/transactionHeader');
var TransactionDetail=require('../model/transactionDetail');
var User=require('../model/user');
var express=require('express');
var router=express.Router();

router.route('/transactionHeaders')
	.get(function(req,res){
		var response={};
		TransactionHeader.find({}).populate('userUpdate', 'name').populate('customer', 'name')
		.exec(function(err, data){
			//Mongo command to fetch all data from collection.
			if(err){
				response={"err": true, "data": "Error fetching data "};
			}else{
				response={"error": false, "data" : data};
			}
			res.json(response);
		});
	});

router.route("/transactionHeader")
	.get(function(req,res){

	})
	.post(function(req,res){
		var transactionHeader=new TransactionHeader(req.body);

		transactionHeader.createdDate=Date.now();
		transactionHeader.lastUpdate=Date.now();

		var response={};
	
		var response={};
		transactionHeader.save(function(err,data){
			if(err){
				response={"error" : true, "data" : "Error adding data"};
			}else{
				response={"error" : false, "data" : data}
			}
		})
		transactionHeader.populate('userUpdate', 'name').populate('customer', 'name',function(err, data){
			
			if(err){
				response={"error ": true, "data" : "Error fetching data"};
			}else{

				response={"error" : false, "data" : data};
			}

			res.json(response)	
			})
	})

router.route("/transactionHeader/id/:id")
	.get(function(req,res){
		var response={};
		TransactionHeader.findById(req.params.id).populate('userUpdate', 'name').populate('customer', 'name')
		.exec(function(err, data){
			if(err){
			response={"error ": true, "data" : "Error fetching data"};
		}else{data
			response={"error" : false, "data" : data};
		}
	
		res.json(response);
		})
	})
	
router.route("/transactionHeader/user/:id")
	.get(function(req,res){
		var response={};
		TransactionHeader.find({customer:req.params.id}).populate('userUpdate', 'name').populate('customer', 'name')
		.exec(function(err, data){
			if(err){
				response={"error ": true, "data" : "Error fetching data"};
			}else{
			
				let details=[]
				let headers=[]
				let header=data
				for(let i=0;i<data.length;i++){
				
				headers.push(data[i]._id)
				}
			
				TransactionDetail.find({header:{$in:headers}}).populate('product', ['name','qty','urls']).populate('userUpdate','username')
				.exec(function(err, data){
					//Mongo command to fetch all data from collection.
					if(err){
						response={"error ": true, "data" : "Error fetching data"};
					}else{
						response={"error" : false, "details" : data, headers:header};
						res.json(response)
					
					
					}
				})
				
			}
				
	
		})
	})
module.exports=router;