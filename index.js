/**
 * Main wrapper for use
 *
 */
var CFXMPP = {

    REVISION: 1

};

CFXMPP.Server = require( __dirname + "/src/Server.js" );

CFXMPP.Client = require( __dirname + "/src/Client.js" );

CFXMPP.HTTPResponse = require( __dirname + "/src/HTTPResponse.js" );

CFXMPP.Utils = require( __dirname + "/src/utils/Utils.js" );

module.exports = CFXMPP;
