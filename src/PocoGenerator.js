"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Options_1 = require("./Options");
class PocoGenerator {
    constructor(options) {
        this.indentLevel = 0;
        this.indent = '  ';
        this.options = new Options_1.Options(options);
    }
    toJs(pocos) {
        this.lines = [];
        let firstPoco = true;
        for (let poco of pocos) {
            if (!firstPoco)
                this.lines.push('');
            this.pocoToJs(poco);
            firstPoco = false;
        }
        return this.lines.join('\n');
    }
    pocoToJs(poco) {
        //console.log(poco.type)
        if (poco.type === 'class')
            this.classToJs(poco);
        else
            this.enumToJs(poco);
    }
    classToJs(poco) {
        this.lines.push(`export const ${poco.name} = {`);
        this.indentLevel += 1;
        let propText = [];
        for (let prop of poco.properties) {
            propText.push(`${this.getIndent()}${prop.name}: ${prop.type.getDefaultValue()} /* ${prop.type.resolvedFrom} */`);
        }
        this.lines.push(propText.join(',\n'));
        this.indentLevel -= 1;
        this.lines.push('}');
        this.lines.push(`${poco.name}.prototype.create = function (obj) {`);
        this.indentLevel += 1;
        this.addLine('obj = obj || {};');
        this.addLine(`return Object.assign({}, ${poco.name}, obj);`);
        this.indentLevel -= 1;
        this.lines.push('}');
    }
    enumToJs(poco) {
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
exports.PocoGenerator = PocoGenerator;
