const express = require( 'express' );
const router = express.Router();

let entries = [];

// Get all entries
router.get( '/', async ( req, res ) => {
    res.status( 200 ).send( entries );
});

// Add an entry
router.post( '/:name', async ( req, res ) => {
    entries.push( req.params.name );
    res.status( 201 ).end();
});

// Get single entry
router.get( '/:name', async ( req, res ) => {
    const entry = entries.find( e => e === req.params.name );
    if( entry == null ) {
        res.status( 404 ).end();
        return;
    }

    res.status( 200 ).send( entry );
});

// Delete an entry
router.delete( '/:name', async ( req, res ) => {
    const entry = entries.find( e => e === req.params.name );
    if( entry == null ) {
        res.status( 404 ).end();
        return;
    }

    entries = entries.filter( e => e !== req.params.name );
    res.status( 200 ).end();
});

// Update an entry, overwrite name with name2
router.put( '/:name/:name2', async ( req, res ) => {
    let index = entries.indexOf( req.params.name );
    if( index == null ) {
        res.status( 404 ).end();
        return;
    }

    entries[index] = req.params.name2;
    console.log(entries);
    res.status( 200 ).end();
});

module.exports = router;