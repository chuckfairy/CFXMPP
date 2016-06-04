/**
 * Main UI
 *
 * @requires [ nunjucks, CF.Templater, CF.Dispatcher ]
 *
 */
CF.XMPP.UI = function( opts ) {

    var scope = this;

    scope.domElement = document.getElementId( "app" );

    scope.messagesElement = document.createElement( "div" );

    scope.loginElement = document.createElement( "div" );

    scope.postElement = document.createElement( "div" );

    scope.compiled = {};

    scope.init();

};

CF.XMPP.UI.prototype = {

    constructor: CF.XMPP.UI,


    //Main dom renderers

    domElement: null,

    messagesElement: null,

    loginElement: null,

    postElement: null,


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

            scope.dispatch({ type: "compile" });

        });

        scope.setElements();

    },


    //Set templates

    setTemplates: function() {

        var scope = this;

        var loginHTML  = scope.Templater.renderTemplate( "templates/login.html" );

        var postHTML = scope.Templater.renderTemplate( "templates/posts.html" );

        scope.compiled[ "message" ] = scope.Templater.compiledTemplates[ "templates/message.html" ];

        scope.postElement.innerHTML = postHTML;
        scope.loginElement.innerHTML = loginHTML;

    },


    //set dom to app element

    setElements: function() {

        var scope = this;

        scope.domElement.appendChild( scope.loginElement );
        scope.domElement.appendChild( scope.messagesElement );
        scope.domElement.appendChild( scope.postElement);

    },

    //Add message

    addMessage: function( stanza ) {

        var scope = this;

        scope.messageElement.innerHTML = scope.compiled[ "message" ].render( stanza );

    }


};

CF.Dispatcher.prototype.apply( CF.XMPP.UI.prototype );
