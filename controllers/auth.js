const path = require('path');
const fs = require('fs');

const getAppConfig = () => {
  const appConfigPath = path.join(__dirname, '../config/appConfig.json');
  const appConfig = JSON.parse(fs.readFileSync(appConfigPath, 'utf8'));
  return appConfig;
}

exports.registerUser = async (req, res) => {
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const appConfig = getAppConfig();
    console.log(appConfig);
    const account = appConfig.account;
    if (!account) return res.status(400).json({ msg: 'Invalid email' });

    const isMatchEmail = (email == account.email);
    if (!isMatchEmail) return res.status(400).json({ msg: 'Email does not match!' });
    const isMatchPassword = (password == account.password);
    if (!isMatchPassword) return res.status(400).json({ msg: 'Password does not match!' });
    res.json({ user: account });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
