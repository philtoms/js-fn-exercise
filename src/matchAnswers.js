const fp = require('lodash/fp');
const mapAnswers = require('./mapAnswers');

// an answer matches either a top level question or an output id
const matchAnswers = answers => {
  const match = mapAnswers(answers);
  return question => {
    return question.outputId.length === 1 ||
            match[question.outputId.join('-')];
  }
};

module.exports = matchAnswers;
