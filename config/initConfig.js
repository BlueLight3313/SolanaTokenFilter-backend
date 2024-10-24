// initializeConfig.js
const defaultConfig = {
  "account": {
    "username": "Memecoin123",
    "email": "test@mail.com",
    "password": "asdf"
  },
  "services": {
    "helius_api_key": "be5c2bf4-d358-4ff0-83fd-c1b4450a1c90",
    "dextools": "https://www.dextools.io/app/en/solana/pool-explorer",
    "dexscreener": "https://dexscreener.com/solana"
  },
  "filter": {
    "preminedPercent": {
      "min": "51",
      "max": "1001"
    },
    "pooledSol": {
      "min": "234",
      "max": "10000"
    }
  },
  "usage": {
    "autoStart": true,
    "dataRequestPeriod": "67",
    "currency": "USD",
    "notificationShowTime": "78"
  }
}

const initConfig = async () => {
  return defaultConfig;
};

module.exports = {
  initConfig, // Export the initConfig function
};