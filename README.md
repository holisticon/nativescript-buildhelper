# NativeScript build helper

Basic NPM package for helping on automate releasing of NativeScript Apps

** CURRENTLY A PRE-RELEASE **

## Requirements

* Node 4+
* NativeScript 2.5+
* Git versioning system
* fastlane (if automatic upload is need)

## Usage

For those who haven't deployed any apps in v2.4 of NativeScript; one of the new features that is turned on by default is SnapShots.    Now most the time this is a AWESOME thing, however occasionally this can cause issues.   For example I have one app of mine that this crashes at startup when using SnapShots.

Now the docs do list how to disable snapshots; but it is a lot easier for me to find the notes on my own site than trying to figure out which doc has the info.

The environmental variable you need to adjust is: <strong>TNS_ANDROID_SNAPSHOT</strong>

0 = Force Snapshots off always
1 = Force snapshots on (including in debug mode)
Unset = Snapshots only in Release mode
