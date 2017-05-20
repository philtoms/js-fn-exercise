const mapOutput = ({outputId, question, type}) => Object.assign({}, {
  id: outputId,
  text: question,
  type: type === 'integer' ? 'number' : type
});

module.exports = mapOutput;
