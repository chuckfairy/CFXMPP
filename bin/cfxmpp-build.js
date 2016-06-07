#!/usr/bin/env node

/**
 * NW.js builder for GUI
 *
 */
"use strict";

var FS = require( "fs" );

var Path = require( "path" );

var NwBuilder = require('nw-builder');


//Copy main dir

var MAIN_LOCATION = Path.resolve( __dirname, ".." ) + "/";

console.log( MAIN_LOCATION );

var CACHE_LOCATION = "/tmp/cfxmpp-chat/"

copyFolderRecursiveSync( MAIN_LOCATION, CACHE_LOCATION );

var nw = new NwBuilder({
    files: CACHE_LOCATION + "**/**",
    platforms: [ "linux64" ],
    version: "0.12.0"
});

nw.on( "log", console.log );

nw.build(function( err ) {

    if( err ) { throw err; }

    console.log( "BUILD COMPLETE" );

});

function copyFolderRecursiveSync( source, target ) {

    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = Path.join( target, Path.basename( source ) );
    if ( !FS.existsSync( targetFolder ) ) {
        FS.mkdirSync( targetFolder );
    }

    //copy
    if ( FS.lstatSync( source ).isDirectory() ) {
        files = FS.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = Path.join( source, file );
            if ( FS.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

function copyFileSync( source, target ) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( FS.existsSync( target ) ) {
        if ( FS.lstatSync( target ).isDirectory() ) {
            targetFile = Path.join( target, Path.basename( source ) );
        }
    }

    FS.writeFileSync(targetFile, FS.readFileSync(source));
}
