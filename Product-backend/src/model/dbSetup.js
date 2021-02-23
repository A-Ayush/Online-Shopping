const collection = require( '../utilities/connection' );

const productData = [
    {
        "prodId": "1001",
        "pName": "iphone 11",
        "pDescription": "Economical Phone by Apple",
        "pRating": "4.5",
        "pCategory": "Electronics",
        "pPrice": "48999",
        "pColor": "Black",
        "pImage": "iphone 11.png",
        "specification": "A13 Bionic Chip with LCD Screen",
        "pSeller": {
            "sId": "S1001",
            "pDiscount": 0.2,
            "pQuantity": 500,
            "pShippingCharges": 0 
         }
    }
];

let create = {}

create.setupDB = async () => {
    const userColl = await collection.getCollection();
    await userColl.deleteMany();
    const result = await userColl.insertMany( productData );
    if( result && result.length > 0 ){
        return result.length
    }else{
        return null;
    }
}

module.exports = create;

