// Module FS(File System) Digunakan untuk Bisa Create (ngepost)id ke file JSON yang kita setup.
// 
// Tapi Object yang sudah kita create tidak bisa di DELETE,
// cuma bisa di PUT atau PATCH
// 
//const fs = require("fs");

const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  }
};

const newDate = () => new Date().toString();

function mustBeInArray(array, id) {
  return new Promise((resolve, reject) => {
    const row = array.find((r) => r.id == id);
    if (!row) {
      reject({
        message: "Check Your ID Gaess",
        status: 404,
      });
    }
    resolve(row);
  });
}


// Codingan Untuk bisa CREATE, PUT atau PATCH Ke Path: Data/[nama-file.json] 
//
// function writeJSONFile(filename, content) {
//   fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// }

module.exports = {
  getNewId,
  newDate,
  mustBeInArray,
  // writeJSONFile,
};
