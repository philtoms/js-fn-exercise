const {some} = require('lodash/fp');
const mapAnswers = require('./mapAnswers');

const triggered = question => answer => question.outputId === `${answer}-${question.id}`

const matchAnswers = answers => {
  const answerIds = mapAnswers(answers)
  // an answer matches either a top level question or a triggered output id
  return question => question.outputId === question.id || some(triggered(question), answerIds)
};

module.exports = matchAnswers;
