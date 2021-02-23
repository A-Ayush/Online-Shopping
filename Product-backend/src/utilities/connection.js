const { Schema } = require('mongoose');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex',true);

const url = "mongodb://localhost:27017/UserDB";

const productSchema = Schema({
    prodId: { type: String, required: [ true, 'prodId is required' ] },
    pName: { type: String, required: [ true, 'porduct Name is required' ] },
    pDescription: { type: String, required: [ true, ' product Description is required' ] },
    pRating: { type: Number, required: [ true, ' product Rating is required' ] },
    pCategory: { type: String, required: [ true, 'product Category is required' ] },
    pPrice: { type: Number , required: [ true, 'product price is required' ] },
    pColor: { type:String, required: [ true, 'color is required' ] },
    pImage: { type:String, required: [ true, 'image is required' ] },
    specification: { type:String, default: "" },
    pSeller: {
        sId: { type: String, required: [ true, 'sId is required'] },
        pDiscount: { type: Number, required: [ true, 'product Discount is required' ] },
        pQuantity: { type: Number, required: [ true, 'product Quantity is required' ] },
        pShippingCharges: { type: Number, required: [ true, 'product Shipping is required' ] }
    }
}, { collection: "Products", timestamps:true })

let connection = {}

connection.getCollection = async () => {
    let connect = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } )
    if(connect){
        let database = await connect.model('Products', productSchema);
        return database;
    }else{
        err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    }
}

module.exports = connection;