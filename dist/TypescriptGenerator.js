"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator_1 = require("./Generator");
class TypescriptGenerator extends Generator_1.Generator {
    constructor(options) {
        super(options);
    }
    filenameExtension() { return 'ts'; }
    generateClass(poco) {
        this.addLine(`export class ${poco.name} {`);
        this.indentLevel += 1;
        this.addLine('constructor(');
        this.indentLevel += 1;
        let propLines = [];
        for (let prop of poco.properties) {
            propLines.push(this.generateProperty(prop));
        }
        this.addLine(propLines.join(`,\n${this.getIndent()}`));
        this.indentLevel -= 1;
        this.addLine(') { }');
        // this.addLine();
        // this.addLine('}');
        this.indentLevel -= 1;
        this.addLine('}');
    }
    generateProperty(prop) {
        let commentPrefix = '';
        let defaultValue = prop.type.getDefaultValue();
        if (this.lookup && this.lookup[prop.type.name]) {
            let lookupType = this.lookup[prop.type.name];
            if (lookupType.type === 'enum') {
                let firstValue = lookupType.enumValues[0].name;
                defaultValue = `${lookupType.name}.${firstValue}`;
            }
        }
        return `public ${prop.name}: ${prop.type.conversion.dest} = ${defaultValue}`;
    }
    generateEnum(poco) {
        this.addLine(`export enum ${poco.name} {`);
        this.indentLevel += 1;
        let valueText = [];
        for (let value of poco.enumValues) {
            valueText.push(`${this.getIndent()}${value.name} = ${value.value}`);
        }
        this.addLine(valueText.join(`,\n${this.getIndent()}`));
        this.indentLevel -= 1;
        this.addLine('}');
        //     ${poco.name}[${poco.name}["${value.name}"] = ${value.value}] = "${value.name}";
        //     ${poco.name}[${poco.name}["Checking"] = 1] = "Checking";
        //     ${poco.name}[${poco.name}["Savings"] = 2] = "Savings";
        // })(${poco.name} = exports.Acco${poco.name}ntType || (exports.${poco.name} = {}));
    }
}
exports.TypescriptGenerator = TypescriptGenerator;
