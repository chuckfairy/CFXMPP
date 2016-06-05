/**
 * Main server
 *
 */
"use strict";


//Main XMPP Server module

var XMPP = require( "node-xmpp-server" );

var Path = require( "path" );

var HTTPResponse = require( __dirname + "/HTTPResponse.js" );

var Client = require( __dirname + "/Client.js" );


//Main class

function Server( options ) {

    var scope = this;

    scope.HTTPResponse = new HTTPResponse({
        port: scope.httpPort,
        location: scope.httpLocation
    });

    scope.http = scope.HTTPResponse.server;

    scope.init();

}

Server.prototype = {

    constructor: Server,

    C2S: null,

    HTTPResponse: null,

    http: null,

    httpPort: 4200,

    httpLocation: Path.resolve( __dirname, "../", "www" ) + "/",

    port: 6666,


    //Initializer

    init: function() {

        var scope = this;

        scope.setXMPP();

        scope.setClient();

    },


    setXMPP: function() {

        var scope = this;

        scope.C2S = new XMPP.C2S.TCPServer({
            port: scope.port,
            domain: "localhost"
        });

        scope.C2S.on( "connection", function( client ) {

            console.log( client );

            client.on( "register", function( opts, cb ) {

                cb( true );

            });

            client.on( "online", function() {

                console.log( "JID FOUND", client.jid.local );

            });

            client.on( "stanza", function (stanza) {

                var data = {
                    from: stanza.attrs.from,
                    to: stanza.attrs.to,
                    message: stanza.toString()
                };

                scope.Client.io.emit( "stanza-received", data );

            });

        });

    },


    setClient: function() {

        var scope = this;

        scope.Client = new Client( scope );

    }


};

module.exports = Server;
