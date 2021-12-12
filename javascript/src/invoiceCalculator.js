const PlayTypes = require("../src/PlayType");

class InvoiceCalculator {
    constructor(play, perf) {
        this.play = play;
        this.perf = perf;
    }

    calculateAmount() {
        //common calculation logic/ base amount goes here
        return 0;
    }
    getVolumeCredits() {
        return Math.max(this.perf.audience - 30, 0);
    }
}

module.exports = InvoiceCalculator;
