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
  manifestPath = 'app/App_Resources/Android/AndroidManifest.xml',
  plistPath = 'app/App_Resources/iOS/Info.plist',
  buildNo = ARGS[0] || process.env['BUILD_NUMBER'] || 1,
  packageJSON = require(path.resolve('.', 'package.json'));

console.log('Updating with build number: ' + buildNo);

fs.stat(manifestPath, (error) => {
  if (!error) {
    let manifestXML = fs.readFileSync(manifestPath);
    xmlParser.parseString(path.resolve('.', manifestPath), function (err, manifestData) {
      let appId = packageJSON.nativescript.id,
        version = packageJSON.version;
      manifestData.manifest.$['android:versionCode'] = buildNo;
      manifestData.manifest.$['android:versionName'] = version;
      fs.writeFile(manifestPath, builder.buildObject(manifestData), function (err) {
        if (err) throw err;
      });
    });
  } else {
    console.log('Skipping platform Android');
  }
});

fs.stat(plistPath, (error) => {
  if (!error) {
    exec('/usr/libexec/PlistBuddy -c "Set :CFBundleVersion ' + buildNo + '" ' + path.resolve('.', plistPath), function (err) {
      if (err) {
        throw err;
      }
    });
  } else {
    console.log('Skipping platform iOS');
  }
});

