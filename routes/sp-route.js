const express=require('express');
const validate=require('../validators/sp-validation')
const auth=require('../auth');
const router=express.Router();
const spController=require('../controllers/sp-controller')
router.get('/',(req,res)=>{
res.send("SP home page");
});
 router.post('/register',validate.validateRegister,spController.register);
 router.post('/login',validate.loginValidation,spController.spLogin);
 router.put('/updateProfile/:spId',auth.spAuthenticate,spController.updateProfile);
 router.post('/logout',auth.spAuthenticate,spController.logout);
module.exports=router;