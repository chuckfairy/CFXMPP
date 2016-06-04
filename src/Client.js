/**
 * Socket to server for client
 *
 */
"use strict";

var IO = require( "socket.io" );

var XMPP = require( "node-xmpp-server" );

var XMPPClient = require('node-xmpp-client')

var Utils = require( __dirname + "/utils/Utils.js" );


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


    //XMPP Client API

    setAPI: function() {

        var scope = this;

        scope.API = new XMPPClient({
            jid: scope.opts.jid + "@" + scope.opts.host,
            password: scope.opts.password
        });

    },


    //Set socket

    setSocket: function( socket ) {

        var scope = this;

        socket.on( "stanza-message", scope.sendMessage.bind( scope ) );

    },


    //Send XMPP Message

    sendMessage: function( data ) {

        var scope = this;

        var host = data.host || scope.opts.host;

        var Stanza = new XMPP.Stanza( "message", { to: host });

        Stanza.c( "body" ).t( data.message );

        scope.API.send( Stanza );

    }

};


//Defaults

Client.Defaults = {

    jid: "client",

    host: "localhost",

    password: "secret"

};


//Export

module.exports = Client;
