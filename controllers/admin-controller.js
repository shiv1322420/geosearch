const adminServices = require('../services/admin-services');
const hashPassword = require('../util/hash-password');
const token = require('../util/token');

let register = async (req, res) => {
   let email = req.body.email;
   let name = req.body.name;
   let password = await hashPassword.generateHashPassword(req.body.password);
   let logoutKey="false";
   console.log(req.body);

   //     save data in database
   adminData = {
       name,
       email,
       password,
       logoutKey
   }
   let criteria = { email }
   //check customer exist or not
   let adminExist = await adminServices.checkAdmin(criteria)
   console.log(adminExist)
   if (adminExist.length > 0) {
       res.json({
           "message": "Admin exist..",
           "status": 400,
           "data": {}
       })

   } else {
       try {
           let adminDbData = await adminServices.insertAdmin(adminData);
           res.json({
               "message": "Successfully registered",
               "status": 200,
               "data": adminData
           })
       } catch (error) {
           console.log(error)
           res.json({
               "message": "Cannot registered successfully",
               "status": 400,
               "data": error
           })
       }
   }


}

let adminLogin = async (req, res) => {
   let email = '', password = '';
   email = req.body.email;
   password = req.body.password;
   let criteria={
       email
   }
   //check admin exist
   let adminDbData = await adminServices.checkAdmin(criteria)
   console.log(adminDbData.length)
   console.log("aaaa")
   console.log(adminDbData)
   if (adminDbData.length > 0) {


       try {
           let adminId = adminDbData[0].id;  
           console.log("hhhh")                                    //get  id from database
         console.log(adminId);
         console.log(adminDbData[0].logoutKey)
           let logoutKey=adminDbData[0].logoutKey;
           console.log(adminDbData[0].name)
           console.log("id")
           console.log(logoutKey)
           let payload={
               adminId,
               email,
               logoutKey
           }
           let checkPassword = await hashPassword.checkHashPassword(password, adminDbData[0].password)
           if (checkPassword) {
               console.log(checkPassword)
               let getToken = await token.generateToken(payload)
               let logoutKey={
                logoutKey:"false"
            };
            let adminDbData = await adminServices.updateAdmin(adminId,logoutKey);
               console.log(getToken)
               res.json({
                   "message": "Successfully login",
                   "status": 200,
                   "token": getToken
               })
           }
           else {
               res.json({
                   "message": "Password doesn't match..",
                   "status": 400,
                   "data": {}
               })

           }

       } catch (error) {
           res.json({
               "message": error.message,
               "status": 400,
               "data": error
           })
       }

   }
   else {
       res.json({
           "message": "admin not exist",
           "status": 400,
           "data": {}
       })

   }

}

let updateProfile = async (req, res) => {
 let id=req.params.adminId;
//    let email = req.body.email;
//    let name = req.body.name;
//    let password = await hashPassword.generateHashPassword(req.body.password);
    console.log(id);
    adminData=req.body;
    if(adminData.password!=="")
    {
     adminData.password=await hashPassword.generateHashPassword(req.body.password);
    }
    else
    {
       adminData=req.body;
    }
   //     save data in database
//    adminData = {
//        name,
//        email,
//        password,
//    }
   console.log("admin data--")
   console.log(adminData)
   try {
       let adminDbData = await adminServices.updateAdmin(id,adminData);
       res.json({
           "message": "Successfully updated",
           "status": 200,
           "data": adminDbData
       })
   } catch (error) {
       console.log(error)
       res.json({
           "message": "Cannot update details successfully",
           "status": 400,
           "data": error
       })
   }

}

//fetch all customers
let fetchAllCustomers=async(req,res)=>{
    
    try {
        let customerDbData = await adminServices.getAllCustomer()
        console.log(customerDbData)
       res.send(customerDbData)
       
        // res.json({
        //     "message": "Fetching data Successfuly",
        //     "status": 200,
        //     "data": customerDbData
        // })
    } catch (error) {
        console.log(error)
       res.json({
           "message": "Error during fetching data",
           "status": 400,
           "data": error
       })
    }
}
let fetchAllsp=async(req,res)=>{
    
    try {
        let spDbData = await adminServices.getAllsp()
        console.log(spDbData)
       res.send(spDbData)
       
      
    } catch (error) {
        console.log(error)
       res.json({
           "message": "Error during fetching data",
           "status": 400,
           "data": error
       })
    }
}

let logout=async (req, res)=>
{
    try {
        console.log("in logout");
        let id=req.reqid;
        console.log("req.id =",id)
        let logoutKey={
            logoutKey:"true"
        };
        let adminDbData = await adminServices.updateAdmin(id,logoutKey);
        console.log("in logout data",adminDbData)
        res.json({
            "message": "Logout successfully",
            "status": 200,
            "data": {}
        })    
    } catch (error) {
        res.json({
            "message": "Logout failed",
            "status": 400,
            "data": error
        }) 
    }
   
}

module.exports = {
   register,
   adminLogin,
   updateProfile,
   fetchAllCustomers,
   fetchAllsp,
   logout
}