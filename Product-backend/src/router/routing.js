const e = require('express');
const express = require( 'express' );
const routing = express.Router();
const service = require( '../service/product' );

routing.get( '/:prodId', async (req, res, next) => {
    try{
        let data = await service.fetchProductDetails( req.params.prodId );
        res.json(data);
    }catch (error){
        next( error );
    }
} )

routing.get('/productCategory/:category', async (req, res, next) => {
    try{
        let data = await service.fetchProductByCategory( req.params.category );
        res.json(data);
    }catch(error){
        next(error)
    }
} )

routing.get('/productName/:prodname', async (req, res, next) => {
    try{
        let data = await service.fetchProductByName( req.params.prodname );
        res.json(data);
    }catch(error){
        next(error)
    }
} )

routing.put('/updatequantity', async ( req, res, next ) => {
    try{
        let data = await service.updateproductquantity( req.body );
        if( data ){
            res.json( "Successfully Updated" );
        }
    }catch( error ){
        next( error );
    }
})

routing.post('/addproduct', async (req, res, next) => {
    try{
        let data = await service.addproduct( req,body );
        if(data){
            res.json( data )
        }
    }catch( error ){
        next( error );
    }
})

module.exports = routing;