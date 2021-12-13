function renderStatement(statementData) {
    return renderAsText(statementData);
    // return renderAsHTML(statementData);

    function renderAsText(data) {
        let result = `Statement for ${data.customer}\n`;
        result += renderPerformancesAsText(data.performancesInfo);
        result += `Amount owed is ${getCurrencyFormatted(data.totalAmount)}\n`;
        result += `You earned ${data.volumeCredits} credits\n`;
        return result;
    }

    function renderAsHTML(data){
        let result = `<h1>Statement for ${data.customer}</h1><br>\n`;
        result += renderPerformancesAsHTML(data.performancesInfo);
        result += `<h3>Amount owed is ${getCurrencyFormatted(data.totalAmount)}</h3><br>\n`;
        result += `<h3>You earned ${data.volumeCredits} credits<h3><br>\n`;
        return result;
    }
    function renderPerformancesAsHTML(perfs) {
        let result = "<table><th>Name</th><th>Amount</th<th><Audience/th>\n";
        for (let perf of perfs) {
            result += `<tr><td> ${perf.play.name} </td><td> ${getCurrencyFormatted(perf.amount)} </td><td> (${
                perf.audience
            } seats)</td><td></tr>\n`;
        }
        return result;
    }

    function renderPerformancesAsText(perfs) {
        let result = "";
        for (let perf of perfs) {
            result += ` ${perf.play.name}: ${getCurrencyFormatted(perf.amount)} (${
                perf.audience
            } seats)\n`;
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
