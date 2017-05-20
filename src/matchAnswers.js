const fp = require('lodash/fp');
const mapAnswers = require('./mapAnswers');

// an answer matches either a top level question or an output id
const matchAnswers = (questions, answers) => {
  const match = mapAnswers(questions, answers)
  return question => question.outputId === question.id || match[question.outputId]
};

module.exports = matchAnswers;
