
const statementData = require('../src/statementData');
const renderStatement = require('../src/renderStatement');

function statement(invoice, plays) {
    const data = statementData(invoice,plays);
    let result = renderStatement(data );
    return result;
}

module.exports = statement;
