var Role=require('../model/role');
var express=require('express');
var router=express.Router();

router.route('/roles')
	.get(function(req,res){
		var response={};
		Role.find({}, function(err,data){
			//Mongo command to fetch all data from collection.
			if(err){
				response={"err": true, "data": "Error fetching data "};
			}else{
				response={"error": false, "data" : data};
			}
			res.json(response);
		});
	});

module.exports=router;