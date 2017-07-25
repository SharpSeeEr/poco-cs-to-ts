import { Options } from './Options'
import { SafeRegEx } from './SafeRegEx'
import { Poco } from './Poco'

export abstract class Generator {
  public options: Options;

  constructor(options?: Object) {
    this.options = new Options(options);
  }

  protected lines: string[];
  protected lookup: any;

  public generate(pocos: Poco[], lookup: any): string {
    this.lookup = lookup || {};
    this.lines = [];
    let firstPoco = true;
    for (let poco of pocos) {
      if (!firstPoco) this.lines.push('');
      
      if (poco.type === 'class') this.generateClass(poco);
      else this.generateEnum(poco);

      firstPoco = false;
    }
    
    return this.lines.join('\n');
  }
  public abstract filenameExtension(): string;
  protected abstract generateClass(poco: Poco);

  protected abstract generateEnum(poco: Poco);
  
  protected indentLevel = 0;
  protected indent = '  ';
  protected addLine(line: string) {
    if (line && line.length > 0) line = this.getIndent() + line;
    else if (!line) line = '';
    this.lines.push(line);
  }

  protected getIndent(): string {
    let indent = '';
    for (let x = 0; x <= this.indentLevel; x++) {
      indent += this.indent;
    }
    return indent;
  }
}