const token = require('./util/token');
const customerServices=require('./services/customer-services');
const spServices=require('./services/sp-services');
const adminServices=require('./services/admin-services')
let customerAuthenticate = async (req, res, next) => {

    try {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        //check if bearer is undiefined
        if (typeof bearerHeader !== 'undefined') {
            //split the space
            const bearer = bearerHeader.split(' ');
            //get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            let result = await token.verifyToken(req.token);
            console.log(result)
            let tokenId=result.customerId
            console.log(tokenId)
            req.reqid=tokenId;
            let checkId=customerServices.checkCustomerById(tokenId)
            if (result) {
                if(checkId)
                {
                    next();
                }
                else{
                    res.json({
                        status: 403,
                        message: "customer not found",
                        data: {}
        
                    })
                }
                
            }
            else {
                throw new error
            }
        }
        else {
            res.json({
                status: 403,
                message: "forbidden access",
                data: {}

            })
        }
    } catch (error) {
        res.json({
            status: 403,
            message: "forbidden access",
            data: error

        })

    }
}

let spAuthenticate = async (req, res, next) => {

    try {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        //check if bearer is undiefined
        if (typeof bearerHeader !== 'undefined') {
            //split the space
            const bearer = bearerHeader.split(' ');
            //get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            let result = await token.verifyToken(req.token);
            console.log(result)
            let tokenId=result.spId
            console.log(tokenId)
            let checkId=spServices.checkSPById(tokenId)
            if (result) {
                if(checkId)
                {
                    next();
                }
                else{
                    res.json({
                        status: 403,
                        message: "sp not found",
                        data: {}
        
                    })
                }
                
            }
            else {
                throw new error
            }
        }
        else {
            res.json({
                status: 403,
                message: "forbidden access",
                data: {}

            })
        }
    } catch (error) {
        res.json({
            status: 403,
            message: "forbidden access",
            data: error

        })

    }
}
let adminAuthenticate = async (req, res, next) => {

    try {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        //check if bearer is undiefined
        if (typeof bearerHeader !== 'undefined') {
            //split the space
            const bearer = bearerHeader.split(' ');
            //get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            let result = await token.verifyToken(req.token);
            console.log(result)
            let tokenId=result.adminId
            req.reqid=tokenId;
            console.log(tokenId)
            let checkId=adminServices.checkAdminById(tokenId)
            if (result) {
                if(checkId)
                {
                    next();
                }
                else{
                    res.json({
                        status: 403,
                        message: "admin not found",
                        data: {}
        
                    })
                }
                
            }
            else {
                throw new error
            }
        }
        else {
            res.json({
                status: 403,
                message: "forbidden access",
                data: {}

            })
        }
    } catch (error) {
        res.json({
            status: 403,
            message: "forbidden access",
            data: error

        })

    }
}

module.exports = {
    customerAuthenticate,
    spAuthenticate,
    adminAuthenticate
}