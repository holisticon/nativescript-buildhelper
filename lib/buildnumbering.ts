#!/usr/bin/env node
import * as fs from 'fs';
import * as xml2js from 'xml2js';
import * as path from 'path';
import { exec } from 'child_process';
// Adds the build number to app versioning
//  e.g. release_notes.js 42 -> uses 42 as build number
const ARGS = process.argv.slice(2);

let xmlParser = new xml2js.Parser(),
  builder = new xml2js.Builder(),
  manifestPath = path.resolve('.', 'app/App_Resources/Android/AndroidManifest.xml'),
  buildNo = ARGS[0] || process.env['BUILD_NUMBER'] || 1,
  packageJSON = require(path.resolve('.', 'package.json')),
  manifestXML = fs.readFileSync(manifestPath);


console.log('Updating with build number: ' + buildNo);

xmlParser.parseString(manifestXML, function (err, manifestData) {
  let appId = packageJSON.nativescript.id,
    version = packageJSON.version;
  manifestData.manifest.$['android:versionCode'] = buildNo;
  manifestData.manifest.$['android:versionName'] = version;
  fs.writeFile(manifestPath, builder.buildObject(manifestData), function (err) {
    if (err) throw err;
  });
});

exec('/usr/libexec/PlistBuddy -c "Set :CFBundleVersion ' + buildNo + '" ' + __dirname + '"/../app/App_Resources/iOS/Info.plist"', function (err) {
  if (err) {
    throw err;
  }
});
