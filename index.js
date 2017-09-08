'use strict';

// @flow

/*::
type Config = { name?: string, only?: boolean, skip?: boolean, [key: string | number]: mixed };
type Tester<Opts> = (opts: Opts, done?: () => void) => ?Promise<mixed>;
type TestCases<Opts> = Array<Opts> | { [name: string]: Opts };
*/

function cases /*:: <Opts: Config> */(title /*: string */, tester /*: Tester<Opts> */, testCases /*: TestCases<Opts> */) /*: void */ {
  let normalized;

  if (Array.isArray(testCases)) {
    normalized = testCases;
  } else {
    const safeRef = testCases;
    normalized = Object.keys(testCases).map(name => {
      return Object.assign({}, { name }, safeRef[name]);
    });
  }

  describe(title, () => {
    normalized.forEach((testCase, index) => {
      let name = testCase.name || `case: ${index + 1}`;

      let testFn;
      if (testCase.only) {
        testFn = test.only;
      } else if (testCase.skip) {
        testFn = test.skip;
      } else {
        testFn = test;
      }

      let cb;
      if (tester.length > 1) {
        cb = done => tester(testCase, done);
      } else {
        cb = () => tester(testCase);
      }

      testFn(name, cb);
    });
  });
}

module.exports = cases;
