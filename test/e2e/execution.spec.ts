
import { exec } from 'child_process';

declare var fail;

describe('execute command line binaries', () => {

  it('buildnumbering', (done) => {
    exec('node tns-buildnumbering.js ', (err) => {
      if (err) {
        fail();
      } else {
        done();
      }
    }, (err: any) => {
      throw new Error(err);
    });
  });

});
