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
    this.addLine(`export class ${poco.name} {`);
    this.indentLevel += 1;
    
    this.addLine('constructor(');
    this.indentLevel += 1;

    let propLines: string[] = [];
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

  private generateProperty(prop: Prop) : string {
      
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

  protected generateEnum(poco: Poco) {
    this.addLine(`export enum ${poco.name} {`);
    
    this.indentLevel += 1;
    
    let valueText: string[] = [];
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