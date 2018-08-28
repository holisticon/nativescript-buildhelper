#!/usr/bin/env node
import * as fs from 'fs';
import * as xml2js from 'xml2js';
import * as path from 'path';
import * as util from 'util';
import { exec } from 'child_process';

// Adds the build number to app versioning
//  e.g. release_notes.js 42 -> uses 42 as build number

const ARGS = process.argv.slice(2);
const DEBUG_ENV = 'holisticon_tns';

let debugLog = util.debuglog(DEBUG_ENV);

let xmlParser = new xml2js.Parser(),
  builder = new xml2js.Builder(),
  manifestPath = process.env['MANIFEST_PATH'] || 'app/App_Resources/Android/AndroidManifest.xml',
  plistPath = process.env['PLIST_PATH'] || 'app/App_Resources/iOS/Info.plist',
  buildNo = ARGS[0] || process.env['BUILD_NUMBER'] || 1,
  packageJSON = require(path.resolve('.', 'package.json')),
  version = packageJSON.version;

console.log('Updating with build number: ' + buildNo);

fs.stat(manifestPath, (error) => {
  if (!error) {
    let manifestXML = fs.readFileSync(manifestPath);
    debugLog('Using following manifest: ', manifestXML);
    xmlParser.parseString(manifestXML, (err, manifestData) => {
      let appId = packageJSON.nativescript.id;
      manifestData.manifest.$['android:versionCode'] = buildNo;
      manifestData.manifest.$['android:versionName'] = version;
      let updatedManifest = builder.buildObject(manifestData);
      debugLog('Updating manifest with: ', manifestXML);
      fs.writeFile(manifestPath, updatedManifest, (err) => {
        if (err) throw err;
      });
    });
  } else {
    console.log('Skipping platform Android');
  }
});

fs.stat(plistPath, (error) => {
  if (!error) {
    exec('/usr/libexec/PlistBuddy -c "Set :CFBundleVersion ' + buildNo + '" ' + path.resolve('.', plistPath), (err) => {
      if (err) {
        throw err;
      }
    });

    exec('/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ' + version + '" ' + path.resolve('.', plistPath), (err) => {
      if (err) {
        throw err;
      }
    });
  } else {
    console.log('Skipping platform iOS');
  }
});


