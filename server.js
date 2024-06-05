require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const web3 = require("@solana/web3.js");
const port = process.env.PORT || 8888;
const { readFileSync, writeFile } = require("fs");
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./Public")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./Routes/index"));

const RAYDIUM_AUTHORITY_ADDRESS =
  "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1";
const SOL_ADDRESS = "So11111111111111111111111111111111111111112";
app.get("/", (req, res) => {
  res.send("Antonio Project Start!");
});
app.post("/webhook", async (req, res) => {
  const payload = req.body;
  const newToken = await startMonitoring(payload);
  writeFile(
    "Solana.json",
    JSON.stringify({ address: newToken }, null, 1),
    (error) => {
      if (error) {
        console.log("An error has occurred ", error);
        return;
      }
      console.log("Data written successfully to disk");
    }
  );
  res.status(200).send("Received and processed");
});
app.get("/getNewToken", (req, res) => {
  const newToken = JSON.parse(readFileSync("Solana.json"));
  console.log(newToken);
  res.status(200).send(newToken);
});
function checkValidateTokenAddress(address) {
  // Check validation of address
  try {
    // Check Solana wallet validation.
    let pubKey = new web3.PublicKey(address);
    web3.PublicKey.isOnCurve(pubKey.toBuffer());
    return true;
  } catch {
    return false;
  }
}
function getTokenAddress(payload) {
  const tokenTransfer = payload[0].tokenTransfers;
  let address = "";
  tokenTransfer.map((transfer) => {
    if (
      transfer.toUserAccount === RAYDIUM_AUTHORITY_ADDRESS &&
      transfer.mint !== SOL_ADDRESS
    )
      address = transfer.mint;
  });
  return address;
}
async function startMonitoring(payload) {
  let response = "";
  const tokenAddress = getTokenAddress(payload);
  const validation = checkValidateTokenAddress(tokenAddress);
  if (validation) {
    console.log("ski312-tokenAddress", tokenAddress);
    response = tokenAddress;
  } else {
    response = null;
  }
  return response;
}

// Listen Port
app.listen(port, () => {
  console.log(`🍩 Solana Backend by 🧔 now running 🚀 on  heroku`);
});
