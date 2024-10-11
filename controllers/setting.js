const fs = require('fs');
const path = require('path');

const settingsFilePath = path.join(__dirname, '../config/appConfig.json');
// Function to load settings from the JSON file
exports.loadSettings = async (req, res) => {
  try {
    // Read the file asynchronously
    const data = fs.readFileSync(settingsFilePath, 'utf-8');
    const appConfig = JSON.parse(data);
    return res.json(appConfig);
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
