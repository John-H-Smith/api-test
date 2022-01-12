const express = require( 'express' );
const router = express.Router();

let entries = [];

router.use( ( req, res, next ) => {
	res.header( 'Content-Type', 'application/json' );
	next();
});

// Get all entries
router.get( '/', async ( req, res ) => {
    res.status( 200 ).json( entries );
});

// Add an entry with 'name'
router.post( '/', async ( req, res ) => {
    if( req.body.name == null || req.body.name == '' ) {
        res.status( 400 ).end( "Please provide a name!" );
        return;
    }

    if( req.body.id == null || req.body.id == '' ) {
        res.status( 400 ).end( "Please provide an id!" );
        return;
    }

    if( isNaN( req.body.id ) ) {
        res.status( 400 ).end( "id has to be a number!" );
        return;
    }

    req.body.id = Number( req.body.id );

    const entry = entries.find( e => e.id === req.body.id );
    if( entry != null ) {
        res.status( 409 ).end( "id already exists!" );
        return;
    }

    entries.push( { name: req.body.name, id: req.body.id } );
    res.status( 201 ).end();
});

// Get single entry by 'id'
router.get( '/:id', async ( req, res ) => {

    if( isNaN( req.params.id ) ) {
        res.status( 400 ).end( "id has to be a number!" );
        return;
    }

    req.params.id = Number( req.params.id );

    const entry = entries.find( e => e.id === req.params.id );
    if( entry == null ) {
        res.status( 404 ).end();
        return;
    }

    res.status( 200 ).json( entry );
});

// Delete an entry by 'name'
router.delete( '/:id', async ( req, res ) => {

    if( isNaN( req.params.id ) ) {
        res.status( 400 ).end( "id has to be a number!" );
        return;
    }

    req.params.id = Number( req.params.id );

    const entry = entries.find( e => e.id === req.params.id );
    if( entry == null ) {
        res.status( 404 ).end();
        return;
    }

    entries = entries.filter( e => e.id !== req.params.id );
    res.status( 200 ).end();
});

// Update an entry by 'name'
router.put( '/:id', async ( req, res ) => {
    if( req.body.name == null || req.body.name == '' ) {
        res.status( 400 ).end( "Please provide a name!" );
        return;
    }

    if( isNaN( req.params.id ) ) {
        res.status( 400 ).end( "id has to be a number!" );
        return;
    }

    req.params.id = Number( req.params.id );

    let entry = entries.find( e => e.id === req.params.id );
    if( entry == null ) {
        res.status( 404 ).end();
        return;
    }

    entry.name = req.body.name;
    res.status( 200 ).end();
});

module.exports = router;