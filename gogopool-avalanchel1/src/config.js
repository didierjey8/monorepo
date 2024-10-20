require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3004,
  KEYSTORE: process.env.KEYSTORE,
  PASSKEYSTORE: process.env.PASSKEYSTORE,
  AUTHSTORE: process.env.AUTHSTORE,

  AVALANCHERPC: process.env.AVALANCHERPC,
  AVALANCHECHAINID: process.env.AVALANCHECHAINID,
  AVALANCHEEXPLORER: process.env.AVALANCHEEXPLORER,

  VALIDRPC: process.env.VALIDRPC,
  VALIDCHAINID: process.env.VALIDCHAINID,
  VALIDEXPLORER: process.env.VALIDEXPLORER,
};
