const InvoiceCalculator = require("./invoiceCalculator");

class TradegyInvoiceCalculator extends InvoiceCalculator {
    calculateAmount() {
        let thisAmount = super.calculateAmount()+ 40000;
        if (this.perf.audience > 30) {
            thisAmount += 1000 * (this.perf.audience - 30);
        }
        return thisAmount;
    }
    getVolumeCredits(){
        return super.getVolumeCredits()
    }
}

module.exports = TradegyInvoiceCalculator;
