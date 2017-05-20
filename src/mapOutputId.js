const fp = require('lodash/fp');

// map a new output id accumulator onto the object.
// These props will be used to construct the answer keys later on
const mapOutputId = (oid, id) => obj => Object.assign({}, obj, {
  outputId: fp.flatten([oid, id].filter(fp.identity)).join('-')
});

module.exports = mapOutputId;
