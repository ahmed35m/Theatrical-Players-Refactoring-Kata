const statement = require('../src/statement');
const fs=require('fs');

const invoice = JSON.parse(fs.readFileSync('javascript/test/invoice.json', 'utf8'));
const plays = JSON.parse(fs.readFileSync('javascript/test/plays.json', 'utf8'));

console.log(statement(invoice, plays));    