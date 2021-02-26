const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const router = require('./router/routing');
const create = require('./model/dbSetup');

const port = 3002;


app.use( bodyparser.json() );
app.use( bodyparser.urlencoded( { extended: true } ) );
app.use( '/product', router );



app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/product/setupDB', async ( req,res,next ) => {
    try{
        let response = await create.setupDB();
        if(response){
            res.json( { message: "Successfully inserted" + response + "Data inserted"  } )
        }
    }catch( error ){
        next(error)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});