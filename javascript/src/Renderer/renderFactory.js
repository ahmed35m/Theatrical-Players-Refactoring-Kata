const TextRenderer = require("./textRenderer");
const HTMLRenderer = require("./htmlRenderer");

function createRenderer(data,type) {
    switch (type) {
        case "Text":
            return new TextRenderer(data);
        case "HTML":
            return new HTMLRenderer(data);
        default:
            return new TextRenderer(data);
    }

    
}

module.exports = createRenderer;
