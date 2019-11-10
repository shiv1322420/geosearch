let modal=require('../modal/adminRegisterSchema')
let customrModal=require('../modal/CustomerRegisterSchema');
let spModal=require('../modal/spRegisterSchema');
//Insert Admin in DB
let insertAdmin = function (objToSave) {
	return new Promise((resolve, reject)=>{
		 new modal(objToSave).save((err,result)=>{
			if(err)
				reject (err)
			else
				resolve (result)
		});
	})
};

// update admin detail in db

let updateAdmin = function (id,updateDetail) {
	console.log("in updateAdmin",updateDetail)
	return new Promise((resolve, reject)=>{
		console.log(id);
		modal.findByIdAndUpdate(id,updateDetail, (err,result)=>{
			if(err)
			reject (err)
		else
			resolve (result)
		});
	})
};

// check admin in database

let checkAdmin = function (criteria) {
	return new Promise((resolve, reject)=>{
		modal.find(criteria, (err,result)=>{
			if(err)
				reject (err)
			else
				resolve (result)
		});
	})
};

//check admin by id

let checkAdminById = function (id) {
	return new Promise((resolve, reject)=>{
		modal.findOne({_id:id}, (err,result)=>{
			if(err)
				reject (err)
			else
				resolve (result)
		});
	})
};

//fetch all customer

let getAllCustomer = function (projection) {
	return new Promise((resolve, reject)=>{
		customrModal.find(projection, (err,result)=>{
			if(err)
				reject (err)
			else
				resolve (result)
		});
	})
};

let getAllsp = function (projection) {
	return new Promise((resolve, reject)=>{
		spModal.find(projection, (err,result)=>{
			if(err)
				reject (err)
			else
				resolve (result)
		});
	})
};

	

module.exports={
insertAdmin:insertAdmin,
 checkAdmin:checkAdmin,
 checkAdminById:checkAdminById,
 updateAdmin:updateAdmin,
 getAllCustomer:getAllCustomer,
 getAllsp:getAllsp
}