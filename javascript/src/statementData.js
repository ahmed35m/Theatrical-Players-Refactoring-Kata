const PlayTypes = require("../src/PlayType");
const ComedyInvoiceCalculator = require("./comedyInvoiceCalculator");
const TradegyInvoiceCalculator = require("./tradegyInvoiceCalculator");

function statementData(invoice, plays) {
    let statementData = {};
    statementData.totalAmount = getTotalAmount(invoice);
    statementData.volumeCredits = getTotalVolumeCredits(invoice);
    statementData.customer = invoice.customer;
    statementData.performancesInfo = getPerformances(invoice);
    return statementData;

    function getPerformances(invoice) {
        let perfs = invoice.performances.map((p) => createPerformance(p));
        return perfs;
    }
    function createPerformance(perf) {
        let p = Object.assign({}, perf);
        p.play = getPlay(perf);
        p.amount = getAmount(p.play, perf);
        return p;
    }
    function getCalculator(play, perf) {
        switch (play.type) {
            case PlayTypes.TRADEGY:
                return new TradegyInvoiceCalculator(play, perf);
                break;
            case PlayTypes.COMEDY:
                return new ComedyInvoiceCalculator(play, perf);
                break;
            default:
                throw new Error(`unknown type: ${play.type}`);
            //for new Play types, add a new calculator and import it here as well
        }
    }
    function getVolumeCredits(play, perf) {
        return getCalculator(play, perf).getVolumeCredits();
    }
    function getTotalVolumeCredits(invoice) {
        const reducer = (totalCredit, perf) => totalCredit + getVolumeCredits(getPlay(perf), perf);
        let volumeCredits = invoice.performances.reduce(reducer, 0);

        return volumeCredits;
    }

    function getTotalAmount(invoice) {
        const reducer = (total, perf) => total + getAmount(getPlay(perf), perf);

        let totalAmount = invoice.performances.reduce(reducer, 0);
        return totalAmount;
    }

    function getAmount(play, perf) {
        let thisAmount = getCalculator(play, perf).calculateAmount();
        return thisAmount;
    }

    function getPlay(perf) {
        return plays[perf.playID];
    }
}

module.exports = statementData;
