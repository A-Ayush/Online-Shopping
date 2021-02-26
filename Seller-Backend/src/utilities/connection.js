const { Schema } = require('mongoose');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex',true);

const url = "mongodb://localhost:27017/UserDB";

const sellerSchema = Schema({
    emailId: { type:String, required: [ true, 'emailId is required' ] },
    name: { type:String, required: [ true, 'name is required' ] },
    phoneNo: { type:Number, required: [ true, 'phone No is required' ] },
    password: { type:String, required: [ true, 'password No is required' ] },
    accountNo: { type:Number, required: [ true, 'account No is required' ] },
    tanNo: { type:String, required: [ true, 'tan No is required' ] },
    gstNo: { type:String, required: [ true, 'gst No is required' ] },
    products: [ 
        { type:String } 
    ],
}, { collection: "Sellers", timestamps:true })

let connection = {}

connection.getCollection = async () => {
    let connect = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } )
    if(connect){
        let database = await connect.model('Sellers', sellerSchema);
        return database;
    }else{
        err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    }
}

module.exports = connection;