/**
 * Main App
 *
 * @requires [ CF.XMPP.Connection ]
 *
 */
var CF = CF || {};

CF.XMPP = {

    REVISION: 1

};


//Main App

CF.XMPP.App = function() {

    var scope = this;

    scope.Connection = new CF.XMPP.Connection();

    scope.UI = new CF.XMPP.UI();


    //Set events

    scope.UI.on( "message-submit", function() {

        scope.Connection.sendMessage( scope.UI.getMessage() );

    });

    scope.Connection.response( "stanza-received", function( data ) {

        console.log( data );

        scope.UI.addMessage( data );

    });

};
