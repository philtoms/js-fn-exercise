const fp = require('lodash/fp');
const mapId = require('./mapOutputId');

// map output id over all group / question nodes
const mapAll = key => obj => fp.map(mapId(obj.outputId), obj[key])

module.exports = mapAll;
