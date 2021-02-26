const collection = require( '../utilities/connection' );



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

