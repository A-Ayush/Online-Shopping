const collection = require('../utilities/connection');
let user = {}

let generateId = async () => {
    let model = await collection.getCollection();
    let ids = await model.distinct("userId");
    let numIds = ids.map( id => Number( id.substr( 1, ) ));
    let maxId = Math.max( ...numIds ) + 1;
    return 'U' + maxId;
}

//user credentials verification!
user.userLogin = async ( Email, Password ) => {
    const userColl = await collection.getCollection();
    const data = await userColl.find( { "uCredentials.uEmail": Email } );
    console.log(data)
    if( data.length === 1 ){
        if( Password == data[0]['uCredentials']['uPassword'] ){
            let res = await userColl.updateOne( { "uCredentials.uEmail": Email } )
            if( res ){
                return data;
            }
        }else{
            let err = new Error( "The password entered is incorrect" );
            err.status = 401;
            throw err;
        }
    }else{
        let err = new Error( "You are not registered. Please register to login" );
        err.status = 404;
        throw err;
    }
}

user.userRegisteration = async ( user ) => {
    let id = await generateId();
    user.userId = id;
    const userColl = await collection.getCollection();
    
    let isUserRegistered = await userColl.exists( { "uCredentials.uEmail": user.uCredentials.uEmaila } )
    if( isUserRegistered ){
        let err = new Error( `User with email id ${ user.uCredentials.uEmail } already exists` );
        err.status = 401;
        throw err;
    }

    await userColl.create( user );
    return { message: `Registeration successfull with email id ${ user.uCredentials.uEmail }` };

}

user.fetchUserDetails = async ( uEmail ) => {
    let model = await collection.getCollection();
    let data = await model.findOne( { "uCredentials.uEmail": uEmail } )
    if( data ){
        return data;
    }else{
        return null;
    }
}

module.exports = user;
