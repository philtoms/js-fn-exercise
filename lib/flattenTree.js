const {compose, map, filter} = require('lodash/fp');
const matchAnswers = require('../src/matchAnswers');
const mapOutput = require('../src/mapOutput');
const flatmap = require('../src/flatmap');

module.exports = (questionset, answers) => compose(
  map(mapOutput),
  filter(matchAnswers(answers)),
  flatmap
)(questionset);
