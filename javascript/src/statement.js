function statement(invoice, plays) {
    const statementData = getStatementData(plays, invoice);
    let result = renderStatement(statementData );
    return result;
}
function getStatementData(plays, invoice){
    let statementData = {};
    statementData.totalAmount = getTotalAmount(plays, invoice);
    statementData.volumeCredits = getTotalVolumeCredits(plays, invoice);
    statementData.customer = invoice.customer;
    statementData.performancesInfo = getPerformances(plays, invoice);
    return statementData;
}
function getPerformances(plays, invoice){
    let perfs = [];
    for (let perf of invoice.performances) {
        let p = Object.assign({}, perf);
        p.play = getPlay(plays,perf)
        p.amount = getAmount(p.play, perf)
        perfs.push(p);
    }
    return perfs;
}
function renderPerformances(perfs) {
    let result = "";
    for (let perf of perfs) {
        result += ` ${perf.play.name}: ${getCurrencyFormatted( perf.amount)} (${perf.audience} seats)\n`;
    }
    return result;
}
function renderStatement(statementData) {
    let result = `Statement for ${statementData.customer}\n`;
    result += renderPerformances(statementData.performancesInfo);
    result += `Amount owed is ${getCurrencyFormatted(statementData.totalAmount)}\n`;
    result += `You earned ${statementData.volumeCredits} credits\n`;
    return result;
}

function getVolumeCredits(play, perf) {
    let volumeCredits = 0;
    volumeCredits += Math.max(perf.audience - 30, 0);
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
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
        case "tragedy":
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return thisAmount;
}

function getPlay(plays, perf) {
    return plays[perf.playID];
}

function getCurrencyFormatted(value) {
    let format =  new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format;
    return format(value/100);
}

module.exports = statement;
