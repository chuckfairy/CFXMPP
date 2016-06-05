/**
 * Socket to server for client
 *
 * @param CFXMPP.Server Server
 * @param Object opts
 *
 */
"use strict";

var IO = require( "socket.io" );

var XMPP = require( "node-xmpp-server" );

var XMPPClient = require('node-xmpp-client')

var Utils = require( __dirname + "/utils/Utils.js" );

var Dispatcher = require( __dirname + "/utils/EventDispatcher.js" );


//Main class

function Client( Server, opts ) {

    var scope = this;

    scope.opts = Utils.setDefaults( opts, Client.Defaults );

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

    API: null,


    //Initialize

    init: function() {

        var scope = this;

        scope.setSocketServer();

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


    //Set socket

    setSocket: function( socket ) {

        var scope = this;

        socket.on( "stanza-message", function( data ) {

            scope.sendMessage( socket, data );

        });

        socket.xmpp = new XMPPClient({
            jid: scope.opts.jid + "@" + scope.opts.host,
            password: scope.opts.password,
            port: scope.server.port || 5222
        });

        socket.xmpp.on( "online", function () {

            console.log('client1: online');

        });

        socket.xmpp.on( "stanza", function( data ) {

            console.log( "STANZA EVENT", data );

        });

        socket.xmpp.on('error', function (error) {

            console.log('CLIENT ERROR', error);

        });

    },


    //Send XMPP Message

    sendMessage: function( socket, data ) {

        var scope = this;

        var host = data.host || scope.opts.host;

        var Stanza = new XMPP.Stanza( "message", { to: host });

        Stanza.c( "body" ).t( data.message );

        console.log( "Stanza attempting to send" );

        socket.xmpp.send( Stanza );

    }

};

Dispatcher.prototype.apply( Client.prototype );


//Defaults

Client.Defaults = {

    jid: "anon",

    host: "localhost",

    password: "secret"

};


//Export

module.exports = Client;
