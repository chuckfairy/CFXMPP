/**
 * Templater
 *
 * @requires[ THREE.AJAX, nunjucks ]
 *
 */
CF.Templater = new function() {

    var scope = this;

    var templates = {};

    var compiledTemplates = {};


    //Compile given templates or source

    scope.compile = function( templatesURLS, callback ) {

        var templatesURLS = templatesURLS;

        var tl = templatesURLS.length;

        var compiledCount = 0;

        var addTemplate = function( template ) {

            THREE.AJAX.get( template, function( response ) {

                templates[ template ] = response;

                scope.compileTemplate( template, response );

                compiledCount++;

                if( compiledCount === tl ) {

                    callback();

                }

            });

        };

        for( var i = 0; i < tl; i ++ ) {

            addTemplate( templatesURLS[ i ] );

        }

    };


    //Compile and add template

    scope.compileTemplate = function( name, text ) {

        compiledTemplates[ name ] = nunjucks.compile( text, THREE.Templater.Environment );
        compiledTemplates[ name ].path = "";

    };


    //Render a template

    scope.renderTemplate = function( name, variables ) {

        var template = compiledTemplates[ name ] ?
            compiledTemplates[ name ].render( variables ) :
            THREE.Templater.Environment.render( + name, variables );

        template = template.trim();

        return template;

    };

};

THREE.Templater.Engine = nunjucks;

THREE.Templater.Environment = new THREE.Templater.Engine.Environment( new THREE.Templater.Engine.WebLoader( '/' ) ),
