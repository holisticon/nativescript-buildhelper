// Adds simple release notes for fastlane
//  e.g. changelog.js 42 -> uses 42 as build number
declare var process, __dirname;

import * as fs from 'fs';
import {exec} from 'child_process';

const args = process.argv.slice(2);
const buildNo = args[0];

console.log('buildNo: ' + buildNo);
exec('git describe --tags --abbrev=0', function (err, tag) {
  if (err instanceof Error) {
    throw err;
  }
  exec('git log ' + tag.replace(/\n$/, '') + '..HEAD --oneline', function (err, releaseNotes) {
    if (err instanceof Error) {
      throw err;
    }
    var changes = releaseNotes.replace(/"/, '').replace(/[a-z0-9A-Z]+/, '-').substring(0, 494) + ' ...';
    console.log('changes: ' + changes);
    fs.writeFile(__dirname + '/../fastlane/metadata/android/de-DE/changelogs/' + buildNo + '.txt', changes, function (err) {
      if (err) throw err;
    });
  });
});
