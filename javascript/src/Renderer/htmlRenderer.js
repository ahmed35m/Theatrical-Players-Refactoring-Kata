const Renderer = require("./render");

class HTMLRenderer extends Renderer {
    renderPerformances(perfs) {
        let result = "<table><th>Name</th><th>Amount</th><th><Audience/th>\n";
        const reducer = (result, currentRow) => {
            return (
                result +
                `<tr><td> ${currentRow.play.name} </td><td> ${this.getCurrencyFormatted(
                    currentRow.amount
                )} </td><td> (${currentRow.audience} seats)</td><td></tr>\n`
            );
        };

        return perfs.reduce(reducer, result);
    }
    renderStatement() {
        let result = `<h1>Statement for ${this.data.customer}</h1><br>\n`;
        result += this.renderPerformances(this.data.performancesInfo);
        result += `<h3>Amount owed is ${this.getCurrencyFormatted(
            this.data.totalAmount
        )}</h3><br>\n`;
        result += `<h3>You earned ${this.data.volumeCredits} credits<h3><br>\n`;
        return result;
    }
}

module.exports = HTMLRenderer;
