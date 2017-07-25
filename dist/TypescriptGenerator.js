"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator_1 = require("./Generator");
class TypescriptGenerator extends Generator_1.Generator {
    constructor(options) {
        super(options);
    }
    filenameExtension() { return 'ts'; }
    generateClass(poco) {
        this.addLine(`export class ${poco.name} = {`);
        this.indentLevel += 1;
        this.addLine('constructor(');
        this.indentLevel += 1;
        let propLines = [];
        for (let prop of poco.properties) {
            propLines.push(this.generateProperty(prop));
        }
        this.lines.push(propLines.join(',\n'));
        this.indentLevel -= 1;
        this.addLine(') {');
        this.addLine('}');
        this.indentLevel -= 1;
        this.lines.push('}');
    }
    generateProperty(prop) {
        let commentPrefix = '';
        let defaultValue = prop.type.getDefaultValue();
        if (this.lookup && this.lookup[prop.type.name]) {
            if (this.lookup[prop.type.name].type === 'enum') {
                defaultValue = 0;
                commentPrefix = 'enum ';
            }
        }
        return `${this.getIndent()}${prop.name}: ${prop.type.resolvedFrom} = ${defaultValue};`;
    }
    generateEnum(poco) {
        this.lines.push(`export enum ${poco.name} {`);
        this.indentLevel += 1;
        let valueText = [];
        for (let value of poco.enumValues) {
            valueText.push(`${this.getIndent()}${poco.name}${value.name} = ${value.value}`);
        }
        this.lines.push(valueText.join(',\n'));
        this.indentLevel -= 1;
        this.lines.push('}');
        //     ${poco.name}[${poco.name}["${value.name}"] = ${value.value}] = "${value.name}";
        //     ${poco.name}[${poco.name}["Checking"] = 1] = "Checking";
        //     ${poco.name}[${poco.name}["Savings"] = 2] = "Savings";
        // })(${poco.name} = exports.Acco${poco.name}ntType || (exports.${poco.name} = {}));
    }
}
exports.TypescriptGenerator = TypescriptGenerator;
