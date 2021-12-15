const PlayTypes = require("../src/PlayType");
const ComedyInvoiceCalculator = require("./InvoiceCalculator/comedyInvoiceCalculator");
const TradegyInvoiceCalculator = require("./InvoiceCalculator/tradegyInvoiceCalculator");

function statementData(invoice, plays) {
    let statementData = {};
    statementData.totalAmount = getTotalAmount(invoice);
    statementData.volumeCredits = getTotalVolumeCredits(invoice);
    statementData.customer = invoice.customer;
    statementData.performancesInfo = getPerformances(invoice);
    return statementData;

    function getCalculator(play, perf) {
        switch (play.type) {
            case PlayTypes.TRADEGY:
                return new TradegyInvoiceCalculator(play, perf);
            case PlayTypes.COMEDY:
                return new ComedyInvoiceCalculator(play, perf);
            default:
                throw new Error(`unknown type: ${play.type}`);
            //for new Play types, add a new calculator and import it here as well
        }
    }
    function getPerformances(invoice) {
        return invoice.performances.map((p) => createPerformance(p));
        
    }
    function createPerformance(perf) {
        let p = Object.assign({}, perf);
        p.play = getPlay(perf);
        p.amount = getAmount(p.play, perf);
        return p;
    }

    function getVolumeCredits(play, perf) {
        return getCalculator(play, perf).getVolumeCredits();
    }
    
    function getTotalVolumeCredits(invoice) {
        const reducer = (totalCredit, perf) => totalCredit + getVolumeCredits(getPlay(perf), perf);
        return invoice.performances.reduce(reducer, 0);
    }

    function getTotalAmount(invoice) {
        const reducer = (total, perf) => total + getAmount(getPlay(perf), perf);         
        return invoice.performances.reduce(reducer, 0);
    }

    function getAmount(play, perf) {
        return getCalculator(play, perf).calculateAmount();
    }

    function getPlay(perf) {
        return plays[perf.playID];
    }
}

module.exports = statementData;
