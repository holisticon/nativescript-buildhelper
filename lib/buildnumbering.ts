#!/usr/bin/env node
import * as fs from 'fs';
import * as xml2js from 'xml2js';
import * as path from 'path';
// Adds the build number to app versioning
//  e.g. release_notes.js 42 -> uses 42 as build number
const ARGS = process.argv.slice(2);

let xmlParser = new xml2js.Parser(),
  builder = new xml2js.Builder();

var manifestPath = path.resolve('.','app/App_Resources/Android/AndroidManifest.xml'),
  buildNo = ARGS[0] || process.env['BUILD_NUMBER'] || 1,
  packageJSON = require(path.resolve('.','package.json')),
  manifestXML = fs.readFileSync(manifestPath);

xmlParser.parseString(manifestXML, function (err, manifestData) {
  var appId = packageJSON.nativescript.id;
  var version = packageJSON.version;
  console.log('buildNo: ' + buildNo);
  console.log('appId: ' + appId);
  console.log('version: ' + version);
  manifestData.manifest.$['android:versionCode'] = buildNo;
  manifestData.manifest.$['android:versionName'] = version;
  var xml = builder.buildObject(manifestData);
  fs.writeFile(manifestPath, xml, function (err) {
    if (err) throw err;
  });
});
