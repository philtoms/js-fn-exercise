const {map, flatten, compose, toPairs} = require('lodash/fp');

const keyValues = ([key, value]) => [key, `${key}-${value}`];

const mapAnswers = compose(
  flatten,
  map(keyValues),
  toPairs
);

module.exports = mapAnswers;
