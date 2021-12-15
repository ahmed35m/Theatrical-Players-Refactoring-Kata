const statementData = require("../src/statementData");
const createRenderer = require("./Renderer/renderFactory");

function statement(invoice, plays) {
    //get data for statement
    const data = statementData(invoice, plays);

    //get statement rendered
    const renderer = createRenderer(data)
    let result = renderer.renderStatement();

    return result;
}

module.exports = statement;
