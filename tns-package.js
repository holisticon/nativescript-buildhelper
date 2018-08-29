#!/usr/bin/env node

const release = require('./lib/release');
const argv = require('yargs')
    .boolean('debug')
    .alias('d', 'debug')
    .array('platforms')
    .alias('p', 'platforms')
    .argv;

// release: boolean, keyStorePath: string, keyStorePassword: string, keyStoreAlias: string, keyStoreAliasPassword: string, debug = false
//.argv;

// arguments

console.log(argv);

// Adds the build number to app versioning
//  e.g. release_notes.js 42 -> uses 42 as build number

release.buildApp(argv.platforms, argv.release, argv.debug).then(console.log).catch(console.error);