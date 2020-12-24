require('dotenv').config();
const express =  require("express");
const app = express();
const bodyParser = require("body-parser");
const dhive = require("@hiveio/dhive")

let client = new dhive.Client(['https://api.hive.blog', 'https://anyx.io', 'rpc.esteem.app', 'api.openhive.network'], {
  chainId: 'beeab0de00000000000000000000000000000000000000000000000000000000',
})

const acceptedOperations = ['convert', 'limit_order_cancel', "limit_order_create", "limit_order_create2"]

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json

app.post("/", (req, res) => {
  let { apiKey, transaction } = req.body
  if (!apiKey || !transaction || apiKey != process.env.API_KEY) res.json({ error: true })
  else {
    typeof transaction == 'string' ? transaction = JSON.parse(transaction) : transaction
    if (accpetedOperations.includes(transaction.operations[0][0])){
      let signedTransaction = await client.broadcast.sign(rawTransaction, dhive.PrivateKey.from(process.env.PRIVATE_KEY));
      res.json({ error: false, signatture: signedTransaction.signatures[0] })
    }
  }
})

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}!`))
