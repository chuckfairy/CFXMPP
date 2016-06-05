/**
 * Static Main
 *
 * @requires [ window, CF.XMPP.App ]
 *
 */
CF.XMPP.Main = function() {

    var app = new CF.XMPP.App();

    window.__app = app;

};

window.onload = CF.XMPP.Main;
