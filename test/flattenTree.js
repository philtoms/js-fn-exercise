const test = require('ava');
const fp = require('lodash/fp');
const questionset = require('../examples/questionset.json');
const answers = require('../examples/answers.json');
const expectedOutput = require('../examples/expectedOutput.json');

const mapOutputId = require('../src/mapOutputId');
const mapGroups = require('../src/mapGroups')('groups');
const mapQuestions = require('../src/mapGroups')('questions');
const mapAnswers = require('../src/mapAnswers');
const matchAnswers = require('../src/matchAnswers');
const mapOutput = require('../src/mapOutput');
const flatmap = require('../src/flatmap');
const flattenTree = require('../lib/flattenTree');

const tree = [{
  id: 1,
  groups: [{
    trigger: 2,
    questions: [{
      id: 3,
      question: 'q',
      type: 'yesno',
      groups: [{
        trigger: 4,
        questions: [
          {id: 5},
          {id: 6}
        ]
      }]
    }]
  }]
}];

test('map a new output id accumulator onto the object', t => {
  t.deepEqual(mapOutputId([1], 2)({}).outputId, '1-2')
});

test('ensure normalised output ids', t => {
  t.deepEqual(mapOutputId([1], undefined)({}).outputId, '1')
});

test('add output ids to each nested question', t => {
  t.deepEqual(mapQuestions({outputId: 1, questions: [{}, {}]}), [{outputId: '1'}, {outputId: '1'}]);
});

test('add output ids to each nested group', t => {
  t.deepEqual(mapGroups({outputId: 1, groups: [{}, {}]}), [{outputId: '1'}, {outputId: '1'}]);
});

test('flatmap the tree and preserve order', t => {
  t.deepEqual(flatmap(tree).map(({id, trigger}) => id || trigger), [1, 2, 3, 4, 5, 6]);
});

test('flatmap the tree and generate output id paths', t => {

  t.deepEqual(flatmap(tree).map(({outputId}) => outputId), [
    '1',
    '1-2',
    '1-2-3',
    '1-2-3-4',
    '1-2-3-4-5',
    '1-2-3-4-6'
  ]);
});

test('generate answerIds', t => {
  t.deepEqual(mapAnswers({1: 2, 3: 4}), [
    '1',
    '1-2',
    '3',
    '3-4'
  ]);
});

test('filter the answered questions', t => {
  t.deepEqual(flatmap(tree).filter(matchAnswers({'1-2': 3})).map(q => q.id), [3]);
});

test('map matched Questions onto output', t => {
  t.deepEqual(mapOutput(flatmap(tree)[2]), {
    id: '1-2-3',
    type: 'yesno',
    text: 'q'
  })
});

test('flattens correctly the provided examples', t => {
  const result = flattenTree(questionset, answers);

  t.is(result.length, expectedOutput.length);

  // iterate the expectation to highlight specific fails..
  fp.zipWith((r, e) => t.deepEqual(r, e), result, expectedOutput);
});
