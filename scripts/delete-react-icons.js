const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
rimraf('./react-icons/solid/*');
rimraf('./react-icons/outline/*');