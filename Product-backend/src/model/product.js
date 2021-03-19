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
        throw err;
    }
}

product.fetchproductByName = async ( prodname ) => {
    let model = await collection.getCollection();
    let data = await model.find( { "pName": prodname } );
    if(data.length < 1){
        let err = new Error("No such product is present");
        err.status = 500;
        throw err;
    }else{
        return data;
    }
}

product.fetchproductByCategory = async ( category ) => {
    let model = await collection.getCollection();
    let data = await model.find({ "pCategory": category });
    if( data.length > 0 ){
        return data;
    }else{
        let err = new Error("No such product's category is present");
        err.status = 500;
        throw err;
    }
}

product.updateproductQuantity = async ( prodArr ) => {
    let model = await collection.getCollection();
    let update  = true;
    for( let prod of prodArr ){
        let prodId = prod.prodId;
        let quantity = prod.quantity;
        if( quantity > 0 ){
            let initial_quant = await model.findOne( { prodId: prodId }, { "pSeller.pQuantity": 1, _id:0 } );
            console.log(initial_quant)
            if( initial_quant.pSeller.pQuantity < quantity ){
                let error = new Error( `Available quantity is less than ${quantity}`  )
                error.status = 401;
                throw error;
            }
            else{
                let data = await model.updateOne( { prodId: prodId }, { $inc: { "pSeller.pQuantity": -quantity } } );
                if( data.nModified == 1 ){
                    return update;
                }else{
                    let error = new Error( 'something went wrong!!'  )
                    error.status = 404;
                    throw error;
                }
            }
        }else{
            let error = new Error( 'Quantity cant be less than zero!!'  )
            error.status = 401;
            throw error;
        }
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
//         }else{
//             let error = new Error( 'something went wrong!!'  )
//             error.status = 404;
//             throw error;
//         }
//     }else{
//         let error = new Error( 'Product is already present! you can add your quantity!!'  )
//         error.status = 404;
//         throw error;
//     }
// }


module.exports = product;