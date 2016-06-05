#!/usr/bin/env node

/**
 * Chat startup commandline
 *
 * @requires [ CFXMPP ]
 *
 */
"use strict";

var OPN = require( "opn" );

var CFXMPP = require( "../" );

var Server = new CFXMPP.Server();

OPN( "http://localhost:" + Server.httpPort );
