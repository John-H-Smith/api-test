const express = require( 'express' );
const router = express.Router();

let entries = [];

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

    entries.push( { name: req.body.name } );
    res.status( 201 ).end();
});

// Get single entry by 'name'
router.get( '/:name', async ( req, res ) => {
    const entry = entries.find( e => e.name === req.params.name );
    if( entry == null ) {
        res.status( 404 ).end();
        return;
    }

    res.status( 200 ).json( entry );
});

// Delete an entry by 'name'
router.delete( '/:name', async ( req, res ) => {
    const entry = entries.find( e => e.name === req.params.name );
    if( entry == null ) {
        res.status( 404 ).end();
        return;
    }

    entries = entries.filter( e => e.name !== req.params.name );
    res.status( 200 ).end();
});

// Update an entry by 'name'
router.put( '/:name', async ( req, res ) => {
    if( req.body.name == null || req.body.name == '' ) {
        res.status( 400 ).end( "Please provide a name!" );
        return;
    }

    let entry = entries.find( e => e.name === req.params.name );
    if( entry == null ) {
        res.status( 404 ).end();
        return;
    }

    entry.name = req.body.name;
    res.status( 200 ).end();
});

module.exports = router;