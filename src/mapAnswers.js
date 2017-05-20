const fp = require('lodash/fp');

// map answer ids over all answers
const makeId = fp.map(([key, value]) => ([`${key}-${value}`, true]));
const mapAnswers = fp.compose(fp.fromPairs, makeId, fp.toPairs);

module.exports = mapAnswers;
