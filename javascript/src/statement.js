
//TODO: Add Handling for Plain vs HTML
function statement (invoice, plays) {
    const usdFormat = getCurrencyFormat("en-US","USD", 2);
    let totalAmount = getTotalAmount(plays, invoice);
    let volumeCredits = getTotalVolumeCredits(plays,invoice);    
    let result = getCompleteResult(plays, invoice,usdFormat, volumeCredits, totalAmount )
    return result;
}
function getVolumeCredits(play, perf){
    let volumeCredits = 0;
     // add volume credits
     volumeCredits += Math.max(perf.audience - 30, 0);
     if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
     return volumeCredits;
}
function getTotalVolumeCredits(plays, invoice ){
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
        const play = getPlay(plays, perf);
        volumeCredits += getVolumeCredits(play, perf);
    }
    return volumeCredits;
}
function getAllResults(plays, invoice, format){
    let result = "";    
    for (let perf of invoice.performances) {
        const play = getPlay(plays, perf);
        let thisAmount = getAmount(play, perf);
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
    }
    return result;
}
function getCompleteResult(plays, invoice, format,volumeCredits, totalAmount){
    let result = `Statement for ${invoice.customer}\n`;
    result += getAllResults(plays, invoice, format);
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}
function getTotalAmount(plays, invoice ){
    let totalAmount = 0;    
    for (let perf of invoice.performances) {
        const play = getPlay(plays, perf);
        let thisAmount = getAmount(play, perf);
        totalAmount += thisAmount;
    }
    return totalAmount;
}

function getAmount( play, perf){
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

function getPlay(plays, perf){
    return plays[perf.playID]
}

function getCurrencyFormat(lang,currency, minFraction){
    return  new Intl.NumberFormat(lang,
    { style: "currency", currency: currency,
        minimumFractionDigits: minFraction }).format;
}


module.exports = statement;
