/**
 * Main UI
 *
 * @requires [ nunjucks, CF.Templater, CF.Dispatcher ]
 *
 */
CF.XMPP.UI = function( opts ) {

    var scope = this;

    scope.domElement = document.getElementById( scope.appId );

    scope.messagesElement = document.createElement( "div" );

    scope.loginElement = document.createElement( "div" );

    scope.postElement = document.createElement( "div" );

    scope.compiled = {};

    scope.init();

};

CF.XMPP.UI.prototype = {

    constructor: CF.XMPP.UI,


    //Main dom renderers

    appId: "app",

    formId: "message-form",

    messageId: "message-input",

    domElement: null,

    messagesElement: null,

    loginElement: null,

    postElement: null,

    form: null,

    messageInput: null,


    //Templater

    Templater: CF.Templater,


    //Templates to compile and use

    templates: [
        "templates/message.html", "templates/login.html",
        "templates/post.html"
    ],


    //Compiled use

    compiled: null,


    //Initialize

    init: function() {

        var scope = this;

        scope.Templater.compile( scope.templates, function() {

            scope.setTemplates();

            scope.setForm();

            scope.dispatch({ type: "compile" });

        });

        scope.setElements();

    },


    //Set templates

    setTemplates: function() {

        var scope = this;

        var loginHTML  = scope.Templater.renderTemplate( "templates/login.html", {} );

        var postHTML = scope.Templater.renderTemplate( "templates/post.html", {} );

        scope.compiled[ "message" ] = scope.Templater.getTemplate( "templates/message.html" );

        scope.postElement.innerHTML = postHTML;
        scope.loginElement.innerHTML = loginHTML;

    },


    //set dom to app element

    setElements: function() {

        var scope = this;

        scope.messagesElement.className = "message-area";

        scope.domElement.appendChild( scope.loginElement );
        scope.domElement.appendChild( scope.messagesElement );
        scope.domElement.appendChild( scope.postElement);

    },


    //Set form

    setForm: function() {

        var scope = this;

        scope.form = document.getElementById( scope.formId );

        scope.form.onsubmit = function( e ) {

            e.preventDefault();

            scope.dispatch({ type: "message-submit" });

        };

        scope.messageInput = document.getElementById( scope.messageId );

    },


    //Get input message

    getMessage: function() {

        var scope = this;

        var message = scope.messageInput.value;

        scope.messageInput.value = "";

        return message;

    },


    //Add message

    addMessage: function( stanza ) {

        var scope = this;

        var div = document.createElement( "div" );

        div.innerHTML = scope.compiled[ "message" ].render( stanza );

        var bod = div.getElementsByTagName( "body" );

        bod = bod[ 0 ];

        scope.messagesElement.appendChild( div );

    }

};

CF.Dispatcher.prototype.apply( CF.XMPP.UI.prototype );
