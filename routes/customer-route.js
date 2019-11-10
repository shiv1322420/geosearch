const express=require('express');
const validate=require('../validators/customer-validation')
const auth=require('../auth');
const router=express.Router();
const customerController=require('../controllers/customer-controller')
router.get('/',(req,res)=>{
res.send("Customer home page");
});
router.post('/register',validate.validateRegister,customerController.register);
router.post('/login',validate.loginValidation,customerController.customerLogin);
router.put('/updateProfile/:customerid',auth.customerAuthenticate,validate.updateValidation,customerController.updateProfile)
router.get('/findsps',auth.customerAuthenticate,customerController.findNearbySps)
router.post('/logout',auth.customerAuthenticate,customerController.logout)
module.exports=router;