const PlayTypes = require('../src/PlayType');

function invoiceCalculator (play, perf) {
    return calculateAmount(play, perf)
   function calculateAmount(play, perf) {
        if (play.type == PlayTypes.COMEDY) {
            let thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            return thisAmount;
        }
        if (play.type == PlayTypes.TRADEGY) {
            let thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            return thisAmount;
        }
    }
    
}
module.exports = invoiceCalculator;
