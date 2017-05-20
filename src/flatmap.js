const fp = require('lodash/fp');

const flatmap = fp.flatMapDeep(obj => {
  return [
    obj,
    flatmap(obj.groups),
    flatmap(obj.questions)
  ]
});

module.exports = flatmap;
