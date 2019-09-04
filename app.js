const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let Block = require('./block');
let Blockchain = require('./blockchain');
let Transaction = require('./transaction');
let transactions = [];

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("hello world");
})

app.get('/blockchain', (req, res) => {
    let genesisBlock = new Block();
    let blockchain = new Blockchain(genesisBlock);
    let transaction = new Transaction('Mary', 'John', 100);
    let block1 = blockchain.getNextBlock([transaction]);
    blockchain.addBlock(block1);

    res.json(blockchain)
})

app.post('/transactions', (req, res) => {
    const { to, from, amount } = req.body;
    let transaction = new Transaction(from, to, amount);

    transactions.push(transaction);

    console.log(req.body.to)
    console.log(req.body.from)
    console.log(req.body.amount)

    res.json(transactions)
})

app.listen(3000, () => {
    console.log("server started")
})
