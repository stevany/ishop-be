var Product=require('../model/product');
var fs=require('fs')
var path = require('path')

var express=require('express');
var router=express.Router();

router.route('/products')
	.get(function(req,res){
		var response={};
		Product.find({}).populate('unit', 'name').populate('group', 'name').populate('userUpdate','username')
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


router.route("/product/id/:id")
	.get(function(req,res){
		var response={};
		Product.findById(req.params.id).populate('unit', 'name').populate('group', 'name').populate('userUpdate','username')
		.exec(function(err, data){
			if(err){
			response={"error ": true, "data" : "Error fetching data"};
		}else{
			response={"error" : false, "data" : data};
		}
		res.json(response);
		})
	})
	
router.route("/product/id/:id/updateStock/:qty")//update stock
.put(function(req,res){
	var query = { _id: req.params.id };
	Product.findById(req.params.id,function(err,data){
			
			if(err){
				response={"error": true, "data" : "Error fetching data"};
			}else{
				Product.findOneAndUpdate(query, { qty: data.qty-req.params.qty })
				.exec(function(err,data){
					if(err){
						response={"error":true, "data":"Error update stock " + req.params.id}
					}else{
						response={"error":false, "data":data}
					}
					res.json(response);
				})
			}
	})

})

module.exports=router;