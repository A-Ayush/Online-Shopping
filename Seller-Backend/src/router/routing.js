const express = require( 'express' );
const routing = express.Router();
const service = require( '../service/seller' );

routing.post('/login', async (req, res, next) => {
    try{
        let data = await service.loginSeller( req.body );
        res.status( 201 ).json( data );
    }catch( error ){
        next(error)
    }
} )

routing.post('/register', async (req, res, next) => {
    try{
        let data = await service.registerSeller( req.body );
        res.status( 201 ).json( data );
    }catch( error ){
        next(error)
    }
} )

routing.get('/sellerDetails/:emailId', async (req, res, next) => {
    try{
        let data = await service.getSellerDetails( req.params.emailId );
        res.status( 201 ).json( data );
    }catch( error ){
        next(error)
    }
} )

routing.put('/pushproduct', async (req, res, next) => {
    try{
        let data = await service.pushProductDetails( req.body.emailId, req.body.product );
        res.status( 201 ).json( "successfully added !" );
    }catch( error ){
        next(error)
    }
} )



module.exports = routing;