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

module.exports = product;