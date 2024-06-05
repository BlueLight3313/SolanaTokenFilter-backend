let blogposts = require("../Data/blog.json");
const helper = require("../Helpers/helper.js");

// Method READ All
//
// All Post or Data On blog
function getPostsBlog() {
  return new Promise((resolve, reject) => {
    if (blogposts.length === 0) {
      reject({
        message: " no database bawsque",
        status: 202,
      });
    }
    resolve(blogposts);
  });
}

//Method READ by Params Id
//
// Post or Data On Blog Page By Id
function getPostBlog(id) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(blogposts, id)
      .then((post) => resolve(post))
      .catch((err) => reject(err));
  });
}

module.exports = {
  getPostsBlog,
  getPostBlog,
};
