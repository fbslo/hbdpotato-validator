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

app.get('/', (req, res) => {
  res.send("Hello There")
})

app.post("/", async (req, res) => {
  try {
    let { apiKey, transaction } = req.body
    if (!apiKey || !transaction || apiKey != process.env.API_KEY) res.json({ error: true, signature: null })
    else {
      typeof transaction == 'string' ? transaction = JSON.parse(transaction) : transaction
      if (acceptedOperations.includes(transaction.operations[0][0]) && transaction.operations.length == 1){
        let signedTransaction = await client.broadcast.sign(transaction, dhive.PrivateKey.from(process.env.PRIVATE_KEY));
        console.log('Returning signature')
        res.json({ error: false, signature: signedTransaction.signatures[0] })
      } else {
        res.json({ error: true, signature: null })
      }
    }
  } catch (e) {
    console.log(e)
    res.json({
      error: true,
      signature: false
    })
  }
})

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}!`))
