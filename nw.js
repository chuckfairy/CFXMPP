/**
 * Main NW build
 *
 */
"use strict";

var CFXMPP = require( __dirname + "/index.js" );

var Server = new CFXMPP.Server();

var GUI = require( "nw.gui" );

GUI.Window.open( "http://localhost:" + Server.httpPort );
