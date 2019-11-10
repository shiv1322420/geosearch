const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const dbConnection=require('./config/databaseConnection');
const customerRoute=require('./routes/customer-route');
const spRoute=require('./routes/sp-route');
const adminRoute=require('./routes/admin-route');
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger/');
const port = 3004;

//middlewares for docs swagger
//app.use('/api-docs', SWAGGER_UI.serve, SWAGGER_UI.setup(SWAGGER_DOCUMENT));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middleware for customer, sp and admin
app.use('/customer',customerRoute);
app.use('/sp',spRoute);
app.use('/admin',adminRoute);

app.listen(port, () => {
    console.log(`Server is listening on : ${port}`);
});
