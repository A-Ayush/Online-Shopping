const e = require('express');
const collection = require( '../utilities/connection' );

let seller = {}

seller.loginSeller = async ( loginData ) => {
    const sellerColl = await collection.getCollection();
    const data = await sellerColl.findOne( { "emailId": loginData.emailId } );
    if( data ){
        if(data.password === loginData.password){
            return data;
        }else{
            let err = new Error( 'Incorrect Password' );
            err.status = 401;
            throw err;
        }
    }else{
        let err = new Error( 'You are not registered as Seller! Please regisetered as seller to login' );
        err.status = 401;
        throw err;
    }
}

seller.registerSeller = async ( sellerData ) => {
    const sellerColl = await collection.getCollection();
    const data = await sellerColl.findOne( { "emailId": sellerData.emailId } );
    if( data ){
        let err = new Error( 'You are already registered as seller!' );
        err.status = 401;
        throw err;
    }else{
        let newData = await sellerColl.create( sellerData );
        if( newData ){
            return data;
        }else{
            let err = new Error( 'Something went wrong!' );
            err.status = 401;
            throw err;
        }
    }
}

seller.getSellerDetails = async ( emailId ) => {
    const sellerColl = await collection.getCollection();
    let data = await sellerColl.findOne( { "emailId": emailId } );
    if( data ){
        return data;
    }else{
        let err = new Error( 'You are not registered as seller! Please register as seller to login' );
        err.status = 401;
        throw err;
    }
}

seller.pushproductdetails = async ( emailId, product ) => {
    const sellerColl = await collection.getCollection();
    const data = await sellerColl.updateOne({ "emailId":emailId }, { $push: { products:product }  });
    if( data.nModified == 1 ){
        return true;
    }else{
        let err = new Error( 'Something went wrong!!' );
        err.status = 404;
        throw err;
    }
}

module.exports = seller;