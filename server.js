let port = 9091;

const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();

app.use( ( req, res, next ) => {
	res.header( 'Cache-Control', 'public, max-age=0' );
    res.header( "Access-Control-Allow-Origin", "*");
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    res.header( 'Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS' );
	next();
});

//Routes
app.use( '/simple-text-api', require( './routes/simple-text-api' ) );

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
app.use( '/simple-json-api', require( './routes/simple-json-api' ) );
//Fallback if no route is matched
app.use( ( req , res ) => res.status( 404 ).end() );

app.listen( port, () => {
    console.log( `Server running on port ${port}` );
});