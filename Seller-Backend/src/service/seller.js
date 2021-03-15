const dbLayer = require( '../model/seller' );

let seller = {}

seller.loginSeller = async ( loginFormData ) => {
    return await dbLayer.loginSeller( loginFormData );
}

seller.registerSeller = async ( sellerData ) => {
    let data = await dbLayer.registerSeller( sellerData )
    return data;
}

seller.getSellerDetails = async ( emailId ) => {
    let data = await dbLayer.getSellerDetails( emailId );
    return data;
}

seller.pushProductDetails = async ( emailId, product ) => {
    let data = await dbLayer.pushproductdetails( emailId, product );
    return data;
}

module.exports = seller;