const InvoiceCalculator = require("./invoiceCalculator");

class ComedyInvoiceCalculator extends InvoiceCalculator {
    calculateAmount() {
        let thisAmount = super.calculateAmount() + 30000;
        if (this.perf.audience > 20) {
            thisAmount += 10000 + 500 * (this.perf.audience - 20);
        }
        thisAmount += 300 * this.perf.audience;
        return thisAmount;
    }
    getVolumeCredits() {
        return super.getVolumeCredits() + Math.floor(this.perf.audience / 5);
    }
}

module.exports = ComedyInvoiceCalculator;
