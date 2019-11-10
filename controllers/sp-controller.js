 const spServices = require('../services/sp-services');
 const hashPassword = require('../util/hash-password');
  const token = require('../util/token');

let register = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let service_type=req.body.name;
    let password = await hashPassword.generateHashPassword(req.body.password);
    let location = req.body.location;
    console.log(req.body);

    //     save data in database
    spData = {
        name,
        email,
        service_type,
        password,
        location
    }
    let criteria = { email }
    //check customer exist or not
    let spExist = await spServices.checkSP(criteria)
    console.log(spExist)
    if (spExist.length > 0) {
        res.json({
            "message": "SP exist..",
            "status": 400,
            "data": {}
        })

    } else {
        try {
            let spDbData = await spServices.insertSP(spData);
            res.json({
                "message": "Successfully registered",
                "status": 200,
                "data": spData
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

let spLogin = async (req, res) => {
    let email = '', password = '';
    email = req.body.email;
    password = req.body.password;
    let criteria = { email }
    //check sp exist
    let spDbData = await spServices.checkSP(criteria)
    console.log(spDbData.length)
    console.log(spDbData)
    if (spDbData.length > 0) {


        try {
            let spId = spDbData[0].id;                                      //get sp id from database
            let checkPassword = await hashPassword.checkHashPassword(password, spDbData[0].password)
            if (checkPassword) {
                console.log(checkPassword)
                let getToken = await token.generateToken({ criteria, spId })
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
            "message": "sp not exist",
            "status": 400,
            "data": {}
        })

    }

}

let updateProfile = async (req, res) => {
    let id=req.params.spId;
    // let email = req.body.email;
    // let name = req.body.name;
    // let service_type=req.body.service_type;
    // let password = await hashPassword.generateHashPassword(req.body.password);
    // let location = req.body.location;
    // console.log(id);

    //     save data in database

     // {
    //     name,
    //     email,
    //     service_type,
    //     password,
    //     location
    // }
    spData=req.body;
         if(spData.password!=="")
    {
        spData.password=await hashPassword.generateHashPassword(req.body.password);
    }
    else
    {
        spData=req.body;
    }
    console.log("sp data--")
    console.log(spData)
    try {
        let spDbData = await spServices.updateSP(id,spData);
        res.json({
            "message": "Successfully updated",
            "status": 200,
            "data": spData
        })
    } catch (error) {
        console.log(error)
        res.json({
            "message": "Cannot updated details successfully",
            "status": 400,
            "data": error
        })
    }

}


let check = (req, res) => {
    res.send("success");
}
module.exports = {
    register,
    spLogin,
    updateProfile,
    check
}