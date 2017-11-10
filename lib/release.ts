#!/usr/bin/env node
import { exec } from 'child_process';




/**
 * Builds the current app
 * @param release set to true if a release build is needed, involves the correct code signing
 * @param keyStorePath path to Android KeyStore
 * @param keyStorePassword KeyStore password
 * @param keyStoreAlias KeyStore alias
 * @param keyStoreAliasPassword  KeyStore alias password
 * @param debug set to true to build a version of the app for debugging purposes
 *
 */
export function buildApp(release: boolean, keyStorePath: string, keyStorePassword: string, keyStoreAlias: string, keyStoreAliasPassword: string, debug = false): Promise<any> {
  let promise = new Promise((resolve, reject) => {
    // Adding debug AAR if needed
    if (debug) {
      exec('cd platforms/android/libs/runtime-libs/ && rm -r nativescript-optimized.aar && mv nativescript-regular.aar nativescript-optimized.aar', (err) => {
        if (err) {
          throw err;
        }
      });
    }
    // TODO trigger normal build
  });
  return promise;
}
