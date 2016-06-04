/**
 * Main server
 *
 */
"use strict";


//Main XMPP Server module

var XMPP = require( "xmpp-server" );

var WS = require( "ws" );


//Main class

function Server( options ) {

    var scope = this;

}

Server.prototype = {

    constructor: Server,

    C2S: null,


    //Initializer

    init: function() {

        var scope = this;

        scope.C2S = XMP.C2S.TCPServer({
            port: 5222,
            domain: "localhost"
        });

        scope.C2S.on( "connection", function( client ) {

            client.on( "register", function( opts, cb ) {

                cb( true );

            });

            client.on( "online", function() {

                console.log( "JID FOUND", client.jid.local );

            });

        });

    },


};

