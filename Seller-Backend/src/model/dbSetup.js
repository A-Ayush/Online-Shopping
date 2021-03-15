const collection = require( '../utilities/connection' );

const sellerData = [
    {
        "emailId": "abc@gmail.com",
        "name": "abc",
        "phoneNo": "9876543210",
        "password": "abc!12",
        "accountNo": "9876543210",
        "tanNo": "1234",
        "gstNo": "5678", 
    }
]

let create = {}

create.setupDB = async () => {
    const userColl = await collection.getCollection();
    await userColl.deleteMany();
    const result = await userColl.insertMany( sellerData );
    if( result && result.length > 0 ){
        return result.length
    }else{
        return null;
    }
}

module.exports = create;

