const PlayTypes = require('../src/PlayType');
const InvoiceCalculator = require('./invoiceCalculator');

function statementData(invoice, plays) {
    let statementData = {};
    statementData.totalAmount = getTotalAmount(plays, invoice);
    statementData.volumeCredits = getTotalVolumeCredits(plays, invoice);
    statementData.customer = invoice.customer;
    statementData.performancesInfo = getPerformances(plays, invoice);
    return statementData;

    function getPerformances(plays, invoice) {
        let perfs = [];
        for (let perf of invoice.performances) {
            let p = Object.assign({}, perf);
            p.play = getPlay(plays, perf);
            p.amount = getAmount(p.play, perf);
            perfs.push(p);
        }
        return perfs;
    }

    function getVolumeCredits(play, perf) {
        let volumeCredits = 0;
        volumeCredits += Math.max(perf.audience - 30, 0);
        if (PlayTypes.COMEDY === play.type)
            volumeCredits += Math.floor(perf.audience / 5);
        return volumeCredits;
    }
    function getTotalVolumeCredits(plays, invoice) {
        let volumeCredits = 0;
        for (let perf of invoice.performances) {
            const play = getPlay(plays, perf);
            volumeCredits += getVolumeCredits(play, perf);
        }
        return volumeCredits;
    }

    function getTotalAmount(plays, invoice) {
        let totalAmount = 0;
        for (let perf of invoice.performances) {
            const play = getPlay(plays, perf);
            let thisAmount = getAmount(play, perf);
            totalAmount += thisAmount;
        }
        return totalAmount;
    }

    function getAmount(play, perf) {
        let thisAmount = 0;
        switch (play.type) {
            case PlayTypes.TRADEGY:
                thisAmount =  InvoiceCalculator(play, perf)
                break;
            case PlayTypes.COMEDY:
                thisAmount =  InvoiceCalculator(play,perf)
                break;
            default:
                throw new Error(`unknown type: ${play.type}`);
        }
        return thisAmount;
    }

    function getPlay(plays, perf) {
        return plays[perf.playID];
    }
}


module.exports = statementData;
