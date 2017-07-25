import { Options } from './Options'
import { SafeRegEx } from './SafeRegEx'
import { Poco, Prop } from './Poco'
import { Generator } from './Generator'

export class TypescriptGenerator extends Generator {

  constructor(options?: Object) {
    super(options);
  }

  public filenameExtension(): string { return 'ts'; }

  protected generateClass(poco: Poco) {
    this.addLine(`export class ${poco.name} = {`);
    this.indentLevel += 1;
    
    this.addLine('constructor(');
    this.indentLevel += 1;

    let propLines: string[] = [];
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

  private generateProperty(prop: Prop) : string {
      
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

  protected generateEnum(poco: Poco) {
    this.lines.push(`export enum ${poco.name} {`);
    
    this.indentLevel += 1;
    
    let valueText: string[] = [];
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