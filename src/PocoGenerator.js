"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Options_1 = require("./Options");
class PocoGenerator {
    constructor(options) {
        this.indentLevel = 0;
        this.indent = '  ';
        this.options = new Options_1.Options(options);
    }
    toJs(pocos, lookup) {
        this.lookup = lookup || {};
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
            let commentPrefix = '';
            let defaultValue = prop.type.getDefaultValue();
            if (this.lookup && this.lookup[prop.type.name]) {
                if (this.lookup[prop.type.name].type === 'enum') {
                    defaultValue = 0;
                    commentPrefix = 'enum ';
                }
            }
            propText.push(`${this.getIndent()}${prop.name}: ${defaultValue} /* ${commentPrefix}${prop.type.resolvedFrom} */`);
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
        this.lines.push(`var ${poco.name};`);
        this.lines.push(`(function (${poco.name}) {`);
        this.indentLevel += 1;
        let valueText = [];
        for (let value of poco.enumValues) {
            valueText.push(`${this.getIndent()}${poco.name}[${poco.name}["${value.name}"] = ${value.value}] = "${value.name}";`);
        }
        this.lines.push(valueText.join('\n'));
        this.indentLevel -= 1;
        this.lines.push(`})(${poco.name} = exports.${poco.name} || (exports.${poco.name} = {}));`);
        //     ${poco.name}[${poco.name}["${value.name}"] = ${value.value}] = "${value.name}";
        //     ${poco.name}[${poco.name}["Checking"] = 1] = "Checking";
        //     ${poco.name}[${poco.name}["Savings"] = 2] = "Savings";
        // })(${poco.name} = exports.Acco${poco.name}ntType || (exports.${poco.name} = {}));
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
