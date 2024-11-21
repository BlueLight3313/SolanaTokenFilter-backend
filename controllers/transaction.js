const fs = require('fs');
const path = require('path');

const settingsFilePath = path.join(__dirname, '../config/appConfig.json');
// Function to load settings from the JSON file
exports.getTransactions = async (req, res) => {
  try {
    const { address, apiKey } = req.body;
    const base_url = `https://api.helius.xyz/v0/addresses/${address}/transactions/?api-key=${apiKey}`;  
    let url = base_url;  
    let lastSignature = null;  
    let txns = [];  

    while (true) { // Limit the number of attempts  
        if (lastSignature) url = `${base_url}&before=${lastSignature}`;  
        
        try {  
            const response = await fetch(url);  
            const transactions = await response.json();
            console.log(transactions);  

            // Validate the transactions structure  
            if (transactions?.length > 0) {
              lastSignature = transactions[transactions.length - 1].signature;  
              txns = [...txns, ...transactions];  
            } else {  
                break; // Exit if no transactions are returned  
            }  
        } catch (error) {  
            console.error('Error fetching transactions:', error);  
            break; // Exit the loop on error  
        }  
    }
    txns = txns.filter(txn => txn.type == "TRANSFER" || txn.type == "SWAP" || txn.type == "TOKEN_MINT" || txn.type == "UNKNOWN")
    console.log(txns);
    // Sort transactions by timestamp  
    txns.sort((a, b) => Number(a.timestamp) - Number(b.timestamp));    
    return res.json(txns);
  } catch (err) {
    // Handle errors related to file reading or JSON parsing
    console.error('Error reading or parsing settings file:', err);
    res.status(500).json({ error: 'Failed to load or parse settings' });
  }
};


// Example function to update specific settings
exports.updateSettings = async (req, res) => {
  const newSettings = req.body;

  // Validate input (optional, you can add custom validations)
  if (!newSettings || typeof newSettings !== 'object') {
    return res.status(400).json({ error: 'Invalid settings data' });
  }

  try {
    fs.writeFileSync(settingsFilePath, JSON.stringify(newSettings, null, 2));
    return res.json({success: true, message: "Config information saved successfully"});
  } catch (error) {
    return res.json({success: false, message: "Failed to save config information"});
  }
};
