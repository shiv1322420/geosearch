let modal=require('../modal/spRegisterSchema')



//Insert Customer in DB
let insertSP = function (objToSave) {
	return new Promise((resolve, reject)=>{
		 new modal(objToSave).save((err,result)=>{
			if(err)
				reject (err)
			else
				resolve (result)
		});
	})
};

// update sp detail in db

let updateSP = function (id,updateDetail) {
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

// check sp in database

let checkSP = function (criteria) {
	return new Promise((resolve, reject)=>{
		modal.find(criteria, (err,result)=>{
			if(err)
				reject (err)
			else
				resolve (result)
		});
	})
};

//check sp by id

let checkSPById = function (id) {
	return new Promise((resolve, reject)=>{
		modal.findOne({_id:id}, (err,result)=>{
			if(err)
				reject (err)
			else
				resolve (result)
		});
	})
};


module.exports={
insertSP:insertSP,
 checkSP:checkSP,
 checkSPById:checkSPById,
 updateSP:updateSP
}