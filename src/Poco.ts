import { Options } from './Options'
import { SafeRegEx } from './SafeRegEx'
import { Type } from './Type'

export class Poco {
  constructor(
      public type: any, 
      public name: string, 
      public inherits: string,
      public body: string,
      public options: Options) {
        if (this.type === 'class') this.parseClass();
        else if (this.type === 'enum') this.parseEnum();
  }

  public properties: Prop[] = [];
  public methods: Method[] = [];
  public enumValues: EnumValue[] = [];

  private static expressions = {
    property: /(?:(?:((?:public)?)|(?:private)|(?:protected)|(?:internal)|(?:protected internal)) )+(?:(virtual|readonly) )?([\w\d\._<>, \[\]]+?)(\??) ([\w\d]+)\s*(?:{\s*get;\s*(?:private\s*)?set;\s*}|;)/gm,
    method: /(?:(?:((?:public)?)|(?:private)|(?:protected)|(?:internal)|(?:protected internal)) )+(?:(virtual|readonly) )?(?:(async) )?(?:([\w\d\._<>, \[\]]+?) )?([\w\d]+)\(((?:.?\s?)*?)\)\s*/gm,
    arguments: /\s*(?:\[[\w\d]+\])?([^?\s]*) ([\w\d]+)(?:\,\s*)?/gm,
    enumEntry: /(\w+)\s*=?\s*(-*\d+)?[,|\s]/gm,
    decorators: /\[\w+\(\s*(?:\w+\s*\=\s*)?"[A-Öa-ö\s]*"\s*\)\]/gm
  };
  
  parseEnum() {
    let nextValue = 0;
    for (let match of Poco.safeRegEx.match(Poco.expressions.enumEntry, this.body)) {
      //console.log("Property Match: ", match);
      let enumValue = new EnumValue(match[1], match[2] || nextValue);
      this.enumValues.push(enumValue);
      nextValue = enumValue.value + 1;
    }
  }

  parseClass() {
    this.parseProperties();
  }

  private static safeRegEx: SafeRegEx = new SafeRegEx();

  private parseProperties() {
    for (let match of Poco.safeRegEx.match(Poco.expressions.property, this.body)) {
      
      let prop = new Prop(this.options.propertyNameResolver(match[5]));
      
      //console.log("Property match: ", match[0]);
      prop.visibility = match[1]
      prop.isReadOnly = match[2] === "readonly";
      prop.isOptional = match[4] === "?";
      prop.type = Type.parse(match[3], "property-type")
      //console.log("Property obj: ", prop);
      this.properties.push(prop);
    }
  }

  private parseMethods() {
    for (let methodResult of Poco.safeRegEx.match(Poco.expressions.method, this.body)) {
      var methodName = methodResult[5];
      if(methodName.toLowerCase() === this.name.toLowerCase()) continue;
      
      let method = new Method(this.options.methodNameResolver(methodName));
      method.returnType = Type.parse(methodResult[4], "method-return-type");
      method.isAsync = methodResult[3] === 'async';
      if (method.isAsync) {
        method.returnType.name = method.returnType.name.replace('Task', 'Promise');
      }
      method.isVirtual = methodResult[2] === 'virtual';
      
      // arguments
      method.arguments = this.parseMethodArguments(methodResult[6]);
      this.methods.push(method);
    }
  }

  private parseMethodArguments(raw: string): Argument[] {
    let args: Argument[] = [];
    for (let result of Poco.safeRegEx.match(Poco.expressions.arguments, raw)) {
      
      let argument = new Argument(result[2]);
      argument.type = Type.parse(result[1], 'method-argument-type');
      args.push(argument);
    }
    return args;
  }
}

export class EnumValue {
  constructor(public name: String, public value: number) {

  }
}

export class Prop {
  public type: Type;
  public visibility: String;
  public isReadOnly: Boolean;
  public isOptional: Boolean;
  public isVirtual: Boolean;

  constructor(public name: string) {
      
  }

}

export class Method {
  public visibility: String;
  public isAsync: Boolean;
  public isVirtual: Boolean;
  public returnType: Type;
  public arguments: Argument[] = [];

  constructor(public name: string) {
      
  }
}

export class Argument {
  
  public type: Type;

  constructor(public name: String) {

  }
}

var sampleFile = "\
using System;\n\
\n\
namespace MyNamespace.Domain\n\
{\n\
    public class MyPoco\n\
    {\n\
        public MyPoco()\n\
        {\n\
        }\n\
\n\
        public MyPoco(RichObject value)\n\
        {\n\
            this.Id = value.Id;\n\
            this.Name = value.Name;\n\
            this.Title = value.Title;\n\
        }\n\
\n\
        [SomeAttribute(42)]\n\
        public int Id { get; set; }\n\
        public string Name { get; set; }\n\
        //public string IgnoreMe { get; set; }\n\
        // public string IgnoreMe2 { get; set; }\n\
        /* public string IgnoreMe3 {get; set; } */\n\
        /*\n\
        public string IgnoreMe4 {get; set; }\n\
        */\n\
        public string Title\n\
        {\n\
            get;\n\
            set;\n\
        }\n\
        public List<string> ListFields { get; set; }\n\
        public IEnumerable<string> IEnumerableFields { get; set; }\n\
        public string[] ArrayFields { get; set; }\n\
        public int[] NumberArray { get; set; }\n\
        public List<int> NumberList { get; set; }\n\
        public bool? OptionalBool {get; set;}\n\
        public DateTime SomeDate {get;set;}\n\
        public decimal SomeDecimal {get;set;}\n\
        public Guid SomeGuid {get;set;}\n\
        public JObject DynamicContents { get; set; }\n\
        public dynamic DynamicToAny { get; set; }\n\
        public object ObjectToAny { get; set; }\n\
    }\n\
}\n";