/**
 * Main websocket connection
 *
 * @requires [ io ]
 *
 */
CF.XMPP.Connection = function() {

    var scope = this;

    scope.init();

};

CF.XMPP.Connection.prototype = {

    constructor: CF.XMPP.Connection,

    io: window.io,

    socket: null,


    //Initialize

    init: function() {

        var scope = this;

        scope.socket = scope.io();

    },


    //Socket funcs

    request: function( type, obj ) {

        this.socket.emit( type, obj );

    },

    response: function( type, callback ) {

        this.socket.on( type, callback );

    },



    //Main sender

    sendMessage: function( message ) {

        var scope = this;

        var data = { message: message };

        scope.request( "stanza-message", data );

    }

};

CF.Dispatcher.prototype.apply( CF.XMPP.Connection.prototype );
