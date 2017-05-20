const test = require('ava');
const fp = require('lodash/fp');
const questionset = require('../examples/questionset.json');
const answers = require('../examples/answers.json');
const expectedOutput = require('../examples/expectedOutput.json');
const flattenTree = require('../lib/flattenTree.js');

test('flattens correctly the provided examples', t => {
  const result = flattenTree(questionset, answers)

  t.is(result.length, expectedOutput.length);

  //result[0] = Object.assign({}, result[0], {bust: true})

  // iterate the expectation to highlight specific fails..
  fp.zipWith((r, e) => console.log(r, e) || t.deepEqual(r, e), result, expectedOutput)
});
