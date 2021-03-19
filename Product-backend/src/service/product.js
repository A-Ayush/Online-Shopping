const dbLayer = require( '../model/product' );

let product = {}

product.fetchProductDetails = async ( prodId ) => {
    let datatoShow = await dbLayer.fetctProductsDetails( prodId );
    return datatoShow;
}

product.fetchProductByName = async ( prodName ) => {
    let datatoShow = await dbLayer.fetchproductByName( prodName );
    return datatoShow;
}

product.fetchProductByCategory = async ( category ) => {
    let datatoShow = await dbLayer.fetchproductByCategory( category );
    return datatoShow;
}

product.updateproductquantity = async ( prod ) => {
    let data = await dbLayer.updateproductQuantity( prod );
    return data;
}

// product.addproduct = async ( prodDetails ) => {
//     let data = await dbLayer.addproduct( prodDetails );
//     return data;
// }

module.exports = product;