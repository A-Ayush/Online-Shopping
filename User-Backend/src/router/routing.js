const express = require( 'express' );
const routing = express.Router();
const service = require( '../service/user' );

routing.post( '/login', async (req, res, next) => {
    try{
        let Email = req.body.email;
        let Pass = req.body.password;
        let item = await service.loginUser( Email, Pass);
        res.json( { data: item } );
    }catch( error ){
        next(error);
    }
})

routing.post( '/register', async ( req, res, next ) => {
    try{
        let data = await service.registerUser( req.body );
        res.json( data );
    }catch( error ){
        next( error )
    }
})

module.exports = routing;
