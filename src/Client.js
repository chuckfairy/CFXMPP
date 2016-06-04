/**
 * Socket to server for client
 *
 */
"use strict";

var IO = require( "socket.io" );


//Main class

function Client( Server, opts ) {

    var scope = this;

    scope.server = Server;

    scope.sockets = [];

    scope.init();

}

Client.prototype = {

    constructor: Client,


    //Server props

    server: null,

    sockets: null,

    io: null,


    //Initialize

    init: function() {

    },


    //Socket socket.io server for client

    setSocketServer: function() {

        var scope = this;

        scope.io = IO( scope.server.http );

        scope.io.on( "connection", function( socket ) {

            console.log( "Socket initalizing" );

            scope.setSocket( socket );

            scope.dispatch( { type: "connect" } );

        });


    },


    setSocket: function( socket ) {


    }

};
