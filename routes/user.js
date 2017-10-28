var User=require('../model/user');
var Role=require('../model/role')
var express=require('express');
var router=express.Router();

router.route('/users')
	.get(function(req,res){
		var response={};
		User.find({}).populate({path:'roles', select:'name'})
		.exec(function(err, data){
			if(err){
			response={"error ": true, "data" : "Error fetching data"};
		}else{
			response={"error" : false, "data" : data};
		}
		res.json(response);
		})
	});

router.route("/user")
	
	.post(function(req,res){
		var user=new User(req.body);
		user.created_at=Date.now();
		user.updated_at=Date.now();
		var response={};

		user.save(function(err,data){
			if(err){
				response={"error" : true, "data" : "Error adding data"};
			}else{
				response={"error" : false, "data" : data}
			}
		})
		user.populate({path:'roles', select:'name'},function(err, data){
			
			if(err){
				response={"error ": true, "data" : "Error fetching data"};
			}else{

				response={"error" : false, "data" : data};
			}
		
			res.json(response)	
			})

	
})

router.route("/user/id/:id")
	.get(function(req,res){
		var response={};
		User.findById(req.params.id,function(err,data){
			if(err){
				response={"error ": true, "data" : "Error fetching data"};
			}else{data
				response={"error" : false, "data" : data};
			}
			res.json(response);
		});
	})
	.put(function(req,res){
		var response={};
		//find the data
		User.findById(req.params.id,function(err,data){
			if(err){
				response={"error": true, "data" : "Error fetching data"};
			}else{
				console.log(req.body)
				//data exists
				if(req.body.name!==undefined){
					data.name=req.body.name;
				}
				if(req.body.username!==undefined){
					data.username=req.body.username
				}
				if(req.body.password!==undefined){
					data.password=req.body.password
				}
				if(req.body.address!==undefined){
					data.address=req.body.address
				}
				if(req.body.phone!==undefined){
					data.phone=req.body.phone
				}
				if(req.body.updated_at!==undefined){
					data.updated_at=Date.now()
				}
	
				if(req.body.active!==undefined){
					data.active=req.body
				}
				if(req.body.roles!==undefined){
				data.roles=req.body.roles
				}

				
				//save the data
				data.save(function(err,data){
					if(err){
						response={"error" : false, "data" : "Data is updated for " + req.params.id};
					}else{
						response={"error" : false, "data" : data}
					}
					})
				data.populate({path:'roles', select:'name'},function(err, data){
					
					if(err){
						response={"error ": true, "data" : "Error fetching data"};
					}else{

						response={"error" : false, "data" : data};
					}
			
					res.json(response)	
					})
			}
		
		})
	})
router.route("/user/name/:name")
.get(function(req,res){
	var response={};
		
		User.find({username:(req.params.name)}).populate({path:'roles', select:'name'})
		.exec(function(err, data){
			if(err){
			response={"error ": true, "data" : "Error fetching data"};
		}else{data
			response={"error" : false, "data" : data};
		}
		res.json(response);
		})
})
module.exports=router;