/**
 * Main websocket connection
 *
 * @requires [ io ]
 *
 */
var CF.XMPP.Connection = function() {

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

    }

}
