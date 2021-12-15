const Renderer = require("./render");

class TextRenderer extends Renderer {
    renderPerformances(perfs) {
        const reducer = (result, currentRow) => {
            return (
                result +
                ` ${currentRow.play.name}: ${this.getCurrencyFormatted(currentRow.amount)} (${
                    currentRow.audience
                } seats)\n`
            );
        };
        return perfs.reduce(reducer, "");
    }
    renderStatement() {
        let result = `Statement for ${this.data.customer}\n`;
        result += this.renderPerformances(this.data.performancesInfo);
        result += `Amount owed is ${this.getCurrencyFormatted(this.data.totalAmount)}\n`;
        result += `You earned ${this.data.volumeCredits} credits\n`;
        return result;
    }
}

module.exports = TextRenderer;
