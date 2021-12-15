class Renderer {
    constructor(data) {
        this.data = data;
    }
    renderPerformances() {}
    renderStatementRender() {}

    getCurrencyFormatted(value) {
        let format = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format;
        return format(value / 100);
    }
}

module.exports = Renderer;
