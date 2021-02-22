const { Schema } = require('mongoose');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex',true);

const url = "mongodb://localhost:27017/UserDB";

const usersSchema = Schema({
    userId: { type: String, required: [true, 'userId is required'] },
    uCredentials: {
        uEmail: { type: String, required: [true, "Email is required"] },
        uPassword: { type: String, required: [true, "Password is required is required"] }
    },
    uProfile: {
        uName: { type: String, required: [true, 'Name is required'] },
        uDOB: { type: Date, required: [true, 'DOB is required'] },
        uPhone: { type: Number, required: [true, 'Phone is required'] },
        uIsSeller: { type: Boolean, default: false},
        uDateJoined: { type: Date, default: new Date().toISOString() }
        //last lagin required
    },
    ucart: [{
        prodId: { type: String },
        prodName: { type: String },
        sellerId: { type: String },
        quantity: { type: Number },
        prodPrice: { type: Number },
        prodDiscount: { type: Number }
    }]
}, { collection: "Users", timestamps:true })

let connection = {}

connection.getCollection = async () => {
    let connect = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } )
    if(connect){
        let database = await connect.model('Users', usersSchema);
        return database;
    }else{
        err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    }
}

module.exports = connection;