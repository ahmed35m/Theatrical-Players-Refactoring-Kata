function renderStatement(statementData) {
    let result = `Statement for ${statementData.customer}\n`;
    result += renderPerformances(statementData.performancesInfo);
    result += `Amount owed is ${getCurrencyFormatted(
        statementData.totalAmount
    )}\n`;
    result += `You earned ${statementData.volumeCredits} credits\n`;
    return result;

    function renderPerformances(perfs) {
        let result = "";
        for (let perf of perfs) {
            result += ` ${perf.play.name}: ${getCurrencyFormatted(
                perf.amount
            )} (${perf.audience} seats)\n`;
        }
        return result;
    }
    function getCurrencyFormatted(value) {
        let format = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format;
        return format(value / 100);
    }
}
module.exports = renderStatement;
