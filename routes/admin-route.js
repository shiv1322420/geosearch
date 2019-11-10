const express=require('express');
const validate=require('../validators/admin-validation')
const auth=require('../auth');
const router=express.Router();
const adminController=require('../controllers/admin-controller')
router.get('/',(req,res)=>{
res.send("Admin home page");
});
router.post('/register',validate.validateRegister,adminController.register);
router.post('/login',validate.loginValidation,adminController.adminLogin);
router.put('/updateProfile/:adminId',auth.adminAuthenticate,validate.updateValidation,adminController.updateProfile);
router.get('/customers',auth.adminAuthenticate,adminController.fetchAllCustomers);
router.get('/sps',auth.adminAuthenticate,adminController.fetchAllsp);
router.post('/logout',auth.adminAuthenticate,adminController.logout);
module.exports=router;