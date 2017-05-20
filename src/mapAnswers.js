const fp = require('lodash/fp');

const parseId = (key, value) => `${key}-${value}`;

// map answer ids over all answers
// but substitute triggers for questions
const makeId = questions => fp.map(([key, value]) => {
  const id = parseId(key, value);
  const matched = questions.find(q => q.outputId === id && q.trigger)
  return matched
    ? matched.questions.map(q => [parseId(id, q.id), true])
    : [[id, true]];
});

const mapAnswers = (questions, answers) => {
  return fp.compose(
    fp.fromPairs,
    fp.flatten,
    makeId(questions),
    fp.toPairs
  )(answers);
}

module.exports = mapAnswers;
