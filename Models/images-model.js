let imagesposts = require("../Data/images.json");
// const filename = "./Data/images.json";
const helper = require("../Helpers/helper.js");

// Method READ All
//
// All Post or Data On Images
function getPostsImages() {
  return new Promise((resolve, reject) => {
    if (imagesposts.length === 0) {
      reject({
        message: " no database bawsque",
        status: 202,
      });
    }
    resolve(imagesposts);
  });
}

// Method READ by Params Id
//
// Post or Data On Images Page By Id
function getPostImages(id) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(imagesposts, id)
      .then((post) => resolve(post))
      .catch((err) => reject(err));
  });
}

module.exports = {
  getPostsImages,
  getPostImages,
};
