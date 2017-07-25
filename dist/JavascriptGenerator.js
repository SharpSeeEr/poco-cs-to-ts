"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator_1 = require("./Generator");
class JavascriptGenerator extends Generator_1.Generator {
    constructor(options) {
        super(options);
    }
    filenameExtension() { return 'js'; }
    generateClass(poco) {
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
    generateEnum(poco) {
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
}
exports.JavascriptGenerator = JavascriptGenerator;
