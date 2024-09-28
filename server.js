const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const { format } = require('date-fns');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const web3 = require("@solana/web3.js");

dotenv.config();

const port = process.env.PORT || 8888;

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

const RAYDIUM_AUTHORITY_ADDRESS = "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1";
const SOL_ADDRESS = "So11111111111111111111111111111111111111112";

// Global variable to hold the JSON object
let jsonData = { address: "" };

// Lock for managing access
let isWriting = false;

const getFormattedTimestamp = () => {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSSSS');
}

// Middleware to check if writing is in progress
const lockMiddleware = (req, res, next) => {
  if (isWriting) {
    // If writing is in progress, wait and try again
    return setTimeout(() => lockMiddleware(req, res, next), 100); // Retry after 100ms
  }
  next();
};

app.get("/", (req, res) => {
  res.send("Solana token filter backend Project Start!");
});

app.post("/webhook", lockMiddleware, async (req, res) => { 
  const payload = req.body;

  try {  
    isWriting = true; // Acquire lock for writing

    const newToken = await startMonitoring(payload);
    
    // Update the global variable
    jsonData.address = newToken == null ? jsonData.address : newToken;
    
    // console.log(`[${getFormattedTimestamp()}] RECV TOKEN ADDR: ${jsonData.address}`);
    return res.status(200).send("Received and processed");  
  } catch (error) {  
    console.error("Error in processing webhook:", error);  
    return res.status(500).send("Internal Server Error");  
  } finally {
    isWriting = false; // Release lock
  }
}); 

// Endpoint for third-party service to read the latest token
app.get("/getNewToken", (req, res) => {
  // Return the global variable
  const now = new Date();
  // console.log(`[${getFormattedTimestamp()}] SEND TOKEN ADDR: ${jsonData.address}`);
  res.status(200).send(jsonData);
});

function checkValidateTokenAddress(address) {
  try {
    let pubKey = new web3.PublicKey(address);
    return web3.PublicKey.isOnCurve(pubKey.toBuffer());
  } catch {
    return false;
  }
}

function getTokenAddress(payload) {
  let address = "";

  const tokenTransfer = payload[0].tokenTransfers;
  tokenTransfer.forEach((transfer) => {
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
