import { Options } from './Options'
import { SafeRegEx } from './SafeRegEx'
import { Poco } from './Poco'

export class PocoGenerator {
  public options: Options;

  constructor(options?: Object) {
    this.options = new Options(options);
  }
  private lines: string[];

  public toJs(pocos: Poco[]): string {
    this.lines = [];
    let firstPoco = true;
    for (let poco of pocos) {
      if (!firstPoco) this.lines.push('');
      this.pocoToJs(poco);
      firstPoco = false;
    }
    
    return this.lines.join('\n');
  }

  private pocoToJs(poco: Poco) {
    //console.log(poco.type)
    if (poco.type === 'class') this.classToJs(poco);
    else this.enumToJs(poco);
  }

  private classToJs(poco: Poco) {
    this.lines.push(`export const ${poco.name} = {`);
    this.indentLevel += 1;
    let propText: string[] = [];
    for (let prop of poco.properties) {
      propText.push(`${this.getIndent()}${prop.name}: ${prop.type.getDefaultValue()} /* ${prop.type.resolvedFrom} */`)
    }
    this.lines.push(propText.join(',\n'));
    this.indentLevel -= 1;
    this.lines.push('}');

    this.lines.push(`${poco.name}.prototype.create = function (obj) {`);
    this.indentLevel += 1;
    this.addLine('obj = obj || {};')
    this.addLine(`return Object.assign({}, ${poco.name}, obj);`);
    this.indentLevel -= 1;
    this.lines.push('}');
  }

  private enumToJs(poco: Poco) {

  }
  private indentLevel = 0;
  private indent = '  ';
  private addLine(line: string) {
    if (line && line.length > 0) line = this.getIndent() + line;
    else if (!line) line = '';
    this.lines.push(line);
  }

  private getIndent(): string {
    let indent = '';
    for (let x = 0; x <= this.indentLevel; x++) {
      indent += this.indent;
    }
    return indent;
  }
}