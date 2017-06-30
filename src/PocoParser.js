"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Options_1 = require("./Options");
const SafeRegEx_1 = require("./SafeRegEx");
const Poco_1 = require("./Poco");
class PocoParser {
    constructor(options) {
        this.pocos = [];
        this.safeRegEx = new SafeRegEx_1.SafeRegEx();
        this.options = new Options_1.Options(options);
    }
    parse(input) {
        this.pocos = [];
        input = this.removeComments(input);
        this.parsePocos(input);
        return this.pocos;
    }
    parsePocos(input) {
        let matches = this.safeRegEx.match(PocoParser.expressions.type, input); // this.safeRegEx.match(PocoParser.expressions.type, input);
        for (let match of matches) {
            let poco = new Poco_1.Poco(match[2], match[3], match[4], match[5], this.options);
            this.pocos.push(poco);
        }
    }
    removeComments(code) {
        const output = code.replace(PocoParser.expressions.blockComments, "");
        const lines = output
            .split("\n")
            .map(line => line.replace(PocoParser.expressions.lineComments, ""));
        return lines.join("\n");
    }
}
PocoParser.expressions = {
    blockComments: /\/\*([\s\S]*)\*\//gm,
    lineComments: /\/\/(.*)/g,
    type: /( *)(?:public\s*|partial\s*|abstract\s*)*\s*(class|enum|struct|interface)\s+([\w\d_<>, ]+?)(?:\s*:\s*((?:(?:[\w\d\._<>, ]+?)(?:,\s+)?)+))?\s*\{((?:.|\n|\r)+?^\1\})/gm
};
exports.PocoParser = PocoParser;
