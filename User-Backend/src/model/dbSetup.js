const collection = require('../utilities/connection');
const userData = [
    {
        "userId": "U1001",
        "uCredentials": {
            "uEmail": "abc@gmail.com",
            "uPassword": "abc@111",
        },
        "uProfile": {
            "uName": "ABC",
            "uDOB": "1997-02-17",
            "uPhone": 9876504321,
            "uIsSeller": false,
            "uDateJoined": "2021-02-17",
        }
    }
]

let create = {}

create.setupDB = async () => {
    const userColl = await collection.getCollection();
    await userColl.deleteMany();
    const result = await userColl.insertMany( userData );
    if( result && result.length > 0 ){
        return result.length
    }else{
        return null;
    }
}

module.exports = create;