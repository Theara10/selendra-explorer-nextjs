let h = require("highlight.js")
export function init() {
    require("highlightjs-solidity")(h);
    console.log("registrar")
}

export function hl(data) {
    return h.highlight(data, { language: 'solidity' }).value
}