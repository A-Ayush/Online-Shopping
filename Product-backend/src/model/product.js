const e = require('express');
const collection = require( '../utilities/connection' );

let product = {}

product.generateId = async () => {
    let model = await collection.getCollection();
    let ids =  await model.distinct( "prodId" );
    let numId = ids.map( id => Number( id.substr(0,) ) );
    let maxId = Math.max( ...numId ) + 1;
    return maxId;
}

product.fetctProductsDetails = async ( prodId ) => {
    let model = await collection.getCollection();
    let data = await model.findOne( { 'prodId': prodId } );
    if( data ){
        return data;
    }else{
        let err = new Error("No such product");
        err.status = 500;
        throw error;
    }
}

product.fetchSellerByName = async ( prodname ) => {
    let model = await collection.getCollection();
    let data = await model.find( { "pName": { "$regex": `${prodname}`, $option: "i" } } );
    if(data.length < 1){
        let err = new Error("No such product is present");
        err.status = 500;
        throw error;
    }else{
        return data;
    }
}

// product.addproduct = async ( productObj ) => {
//     let model = await collection.getCollection();
//     let prod = await model.find( { "pName": productObj.pName } );
//     if(prod == null){
//         let id = await product.generateId();
//         productObj.prodId = id;
//         if( data && data.length > 0 ){
//             return id;
//         }else{}
//     }
// }


module.exports = product;