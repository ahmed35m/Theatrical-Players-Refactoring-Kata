const PlayTypes = require('../src/PlayType');

class InvoiceCalculator {
    constructor(play, perf) {
        this.amount = 0;
        this.type = play.type;
        this.perf = perf;
    }

    calculateAmount() {
        if (this.type == PlayTypes.COMEDY) {
            let thisAmount = 30000;
            if (this.perf.audience > 20) {
                thisAmount += 10000 + 500 * (this.perf.audience - 20);
            }
            thisAmount += 300 * this.perf.audience;
            return thisAmount;
        }
        if (this.type == PlayTypes.TRADEGY) {
            let thisAmount = 40000;
            if (this.perf.audience > 30) {
                thisAmount += 1000 * (this.perf.audience - 30);
            }
            return thisAmount;
        }
    }
    
}

module.exports = InvoiceCalculator;
