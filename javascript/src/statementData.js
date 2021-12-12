const PlayTypes = require("../src/PlayType");
const InvoiceCalculator = require("./invoiceCalculator");

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

    function getVolumeCredits(play, perf) {
        let volumeCredits = 0;
        volumeCredits += Math.max(perf.audience - 30, 0);
        if (PlayTypes.COMEDY === play.type) volumeCredits += Math.floor(perf.audience / 5);
        return volumeCredits;
    }
    function getTotalVolumeCredits(invoice) {
        const reducer = (totalCredit, perf) => totalCredit + getVolumeCredits(getPlay(perf), perf);
        let volumeCredits = invoice.performances.reduce(reducer, 0);

        return volumeCredits;
    }

    function getTotalAmount(invoice) {
        let totalAmount = 0;
        for (let perf of invoice.performances) {
            const play = getPlay(perf);
            let thisAmount = getAmount(play, perf);
            totalAmount += thisAmount;
        }
        return totalAmount;
    }

    function getAmount(play, perf) {
        let thisAmount = 0;
        switch (play.type) {
            case PlayTypes.TRADEGY:
                thisAmount = new InvoiceCalculator(play, perf).calculateAmount();
                break;
            case PlayTypes.COMEDY:
                thisAmount = new InvoiceCalculator(play, perf).calculateAmount();
                break;
            default:
                throw new Error(`unknown type: ${play.type}`);
        }
        return thisAmount;
    }

    function getPlay(perf) {
        return plays[perf.playID];
    }
}

module.exports = statementData;
