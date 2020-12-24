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

app.post("/", async (req, res) => {
  let { apiKey, transaction } = req.body
  if (!apiKey || !transaction || apiKey != process.env.API_KEY) res.json({ error: true, signature: null })
  else {
    typeof transaction == 'string' ? transaction = JSON.parse(transaction) : transaction
    if (accpetedOperations.includes(transaction.operations[0][0]) && transaction.operations.length == 1){
      let signedTransaction = await client.broadcast.sign(rawTransaction, dhive.PrivateKey.from(process.env.PRIVATE_KEY));
      res.json({ error: false, signature: signedTransaction.signatures[0] })
    } else {
      res.json({ error: true, signature: null })
    }
  }
})

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}!`))
