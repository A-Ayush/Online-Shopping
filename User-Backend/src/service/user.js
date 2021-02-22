const dbLayer = require( '../model/user' );


let user = {}

user.loginUser = async ( email, password ) => {
    let response = await dbLayer.userLogin( email, password );
    return response;
}

user.registerUser = async ( user ) => {
    let userObj = {
        uCredentials: {
            uEmail: user.email,
            uPassword: user.password,
        },
        uProfile: {
            uName: user.name,
            uPhone: user.phone,
            uDOB: new Date( user.dob ),
        }
    } 

    return await dbLayer.userRegisteration( userObj );
}

module.exports = user;