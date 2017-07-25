import { Options } from './Options'
import { SafeRegEx } from './SafeRegEx'
import { Poco } from './Poco'

export class PocoParser {
  
  public options: Options;

  public pocos: Poco[] = [];
  public lookup = {};

  constructor(options?: Object) {
    this.options = new Options(options);
  }

  private safeRegEx: SafeRegEx = new SafeRegEx();

  public parse(input): Poco[] {
    this.pocos = [];
    input = this.removeComments(input);
    
    this.parsePocos(input);

    return this.pocos;
  }

  private static expressions = {
    blockComments: /\/\*([\s\S]*)\*\//gm,
    lineComments: /\/\/(.*)/g,
    type: /( *)(?:public\s*|partial\s*|abstract\s*)*\s*(class|enum|struct|interface)\s+([\w\d_<>, ]+?)(?:\s*:\s*((?:(?:[\w\d\._<>, ]+?)(?:,\s+)?)+))?\s*\{((?:.|\n|\r)+?^\1\})/gm
  }

  private parsePocos(input) {
    let matches = this.safeRegEx.match(PocoParser.expressions.type, input); // this.safeRegEx.match(PocoParser.expressions.type, input);
    
    for (let match of matches) {
      let poco = new Poco(match[2], match[3], match[4], match[5], this.options);
      this.pocos.push(poco);
      this.lookup[poco.name] = poco;
    }
  }

  private removeComments(code: string) {
    const output = code.replace(PocoParser.expressions.blockComments, "");
    const lines = output
        .split("\n")
        .map(line => line.replace(PocoParser.expressions.lineComments, ""));

    return lines.join("\n");
  }

  
}