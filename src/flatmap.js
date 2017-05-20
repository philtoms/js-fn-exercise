const fp = require('lodash/fp');
const mapOutputId = require('./mapOutputId');
const mapGroups = require('./mapGroups')('groups');
const mapQuestions = require('./mapGroups')('questions');

const flatmap = fp.flatMapDeep(obj => {
  obj = mapOutputId(obj.outputId, obj.id || obj.trigger)(obj)
  return [
    obj,
    flatmap(mapGroups(obj)),
    flatmap(mapQuestions(obj))
  ]
});

module.exports = flatmap;
