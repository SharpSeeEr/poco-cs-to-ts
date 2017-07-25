"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Options_1 = require("./Options");
class Generator {
    constructor(options) {
        this.indentLevel = 0;
        this.indent = '  ';
        this.options = new Options_1.Options(options);
    }
    generate(pocos, lookup) {
        this.lookup = lookup || {};
        this.lines = [];
        let firstPoco = true;
        for (let poco of pocos) {
            if (!firstPoco)
                this.lines.push('');
            if (poco.type === 'class')
                this.generateClass(poco);
            else
                this.generateEnum(poco);
            firstPoco = false;
        }
        return this.lines.join('\n');
    }
    addLine(line) {
        if (line && line.length > 0)
            line = this.getIndent() + line;
        else if (!line)
            line = '';
        this.lines.push(line);
    }
    getIndent() {
        let indent = '';
        for (let x = 0; x <= this.indentLevel; x++) {
            indent += this.indent;
        }
        return indent;
    }
}
exports.Generator = Generator;
