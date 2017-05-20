const matchAnswers = require('../src/matchAnswers');
const mapOutput = require('../src/mapOutput');
const flatmap = require('../src/flatmap');

module.exports = (questionset, answers) => {
  const questions = flatmap(questionset);
  const answerd = matchAnswers(questions, answers);

  return questions.filter(answerd).map(mapOutput);
}
