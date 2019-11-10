const mongoose = require('mongoose');

const spRegisterSchema=mongoose.Schema({
name:{type:String,required: true},
email:{type:String,required: true},
service_type:{type:String, required:true},                         
password:{type:String,required: true},
location: {
    type: {
      type: String, 
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: Array,
      required: true
    }
  }
},
{
    timestamps:true   //it is used t to automatically add two new fields - createdAt and updatedAt to the schema.
});

spRegisterSchema.index({location:"2dsphere"})
module.exports=mongoose.model('sp_register',spRegisterSchema)
