/**
 * @file util tools
 */

function getShare(key) {
  return require('electron').remote.getGlobal(key);
}

export default {
  getShare
};
