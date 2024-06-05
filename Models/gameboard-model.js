let gameposts = require("../Data/gameboard-urlimage.json");
// let gameposts = require("../Data/gameboard-id-name-urlimage.json");
const helper = require("../Helpers/helper.js");

// Method READ All
//
// All Post or Data On Game Board Page
function getPostsGameboard() {
  return new Promise((resolve, reject) => {
    if (gameposts.length === 0) {
      reject({
        message: " no database bawsque",
        status: 202,
      });
    }
    resolve(gameposts);
  });
}

// Method READ by Params Id
//
// Post or Data On Game Board Page By Id
// function getPostGameboard(id) {
//   return new Promise((resolve, reject) => {
//     helper
//       .mustBeInArray(gameposts, id)
//       .then((post) => resolve(post))
//       .catch((err) => reject(err));
//   });
// }

module.exports = {
  getPostsGameboard,
  // getPostGameboard,
};
