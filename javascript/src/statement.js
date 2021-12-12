
const statementData = require('../src/statementData');
const renderStatement = require('../src/renderStatement');

function statement(invoice, plays) {
    //get data for statement
    const data = statementData(invoice,plays);

    //get statement rendered
    let result = renderStatement(data );
    
    return result;
}

module.exports = statement;
