var Group=require('../model/group');
var express=require('express');
var router=express.Router();

router.route('/groups')
	.get(function(req,res){
		var response={};
		Group.find({}, function(err,data){
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