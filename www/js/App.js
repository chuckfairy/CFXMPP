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

};
