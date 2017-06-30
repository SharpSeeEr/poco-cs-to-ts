import { SafeRegEx } from './SafeRegEx';


export class TypeConversion {
  constructor(
    public source: string,
    public dest: string, 
    public defaultValue: any) {
  }
}

const defaultTypeTranslations = {
  int: () => new TypeConversion("int", "number", '0'),
  double: () => new TypeConversion("double", "number", '0'),
  float: () => new TypeConversion("float", "number", '0'),
  Int32: () => new TypeConversion("Int32", "number", '0'),
  Int64: () => new TypeConversion("Int64", "number", '0'),
  short: () => new TypeConversion("short", "number", '0'),
  long: () => new TypeConversion("long", "number", '0'),
  decimal: () => new TypeConversion("decimal", "number", '0'),
  bool: () => new TypeConversion("bool", "boolean", 'false'),
  DateTime: () => new TypeConversion("DateTime", "string", "''"),
  Guid: () => new TypeConversion("Guid", "string", "''"),
  string: () => new TypeConversion("string", "string", "''"),
  JObject: () => new TypeConversion("JObject", "any", '{}'),
  dynamic: () => new TypeConversion("dynamic", "any", '{}'),
  object: () => new TypeConversion("object", "any", '{}')
};

export class Type {
  public name: string;
  public resolvedFrom: string;
  private genericTypes: Type[];
  public get generics() { return this.genericTypes; }
  public set generics(value: Type[]) {
    this.genericTypes = value;
    if (!value || value.length == 0) this.hasGenerics = false;
    else this.hasGenerics = true;
  }

  public hasGenerics: Boolean;
  public isArray: Boolean;
  public isDictionary: Boolean;
  public isObject: Boolean;

  public defaultValue: string;

  private static defaultValues = {
    "number": "0",
    "boolean": "false",
    "string": "''",
    "any": "{}"
  };

  public getDefaultValue(): any {
    if (this.defaultValue) return this.defaultValue;
    if (this.isArray) return '[]';
    return '{}';
    //return this.defaultValue; // Type.defaultValues[this.name] || '{}';
  }

  private static typeTranslations = Object.assign({}, defaultTypeTranslations);

  private static safeRegEx: SafeRegEx = new SafeRegEx();
  
  static addCustomTypeTranslations(customTypeTranslations: any) {
    Object.assign(this.typeTranslations, customTypeTranslations);
  }

  private static readonly expressions = {
    collection: /^(I?List|IEnumerable|ICollection|HashSet)<([\w\d]+)>$/gm,
    dictionary: /^I?Dictionary<([\w\d]+),\s?([\w\d]+)>$/g,
    array: /^([\w\d]+)\[\]$/gm,
    genericProperty: /^([\w\d]+)<([\w\d\<\> ,]+)>$/gm
  }

  private static tryTranslateType(type: Type): boolean {
    let translater = this.typeTranslations[type.name];
    if (translater) {
      let typeConversion: TypeConversion = translater();
      type.name = typeConversion.dest;
      type.defaultValue = typeConversion.defaultValue;

      if (type.name === 'any') type.isObject = true;
      return true;
    }
    return false;
  }

  static parse(typeCandidate: string, scope?: string): Type {

    let type = new Type();
    type.name = typeCandidate;
    type.resolvedFrom = typeCandidate;

    this.tryTranslateType(type) ||
    this.tryParseArray(type) ||
    this.tryParseCollection(type) ||
    this.tryParseDictionary(type) ||
    this.tryParseGeneric(type);

    // if (this.tryParseCollection(type)) return type;
    // if (this.tryParseCollection(type)) return type;
    // if (this.tryParseCollection(type)) return type;
    // if (this.tryParseCollection(type)) return type;

    return type;
  }

  private static tryParseGeneric(type: Type): Boolean {
    const match = this.safeRegEx.match(this.expressions.genericProperty, type.name)[0];
    if (match) {
      //const generic = match[1];
      type.generics = match[2]
          .split(",")
          .map(x => this.parse(x.trim()));
    }
    return !!match;
  }

  private static tryParseArray(type: Type): Boolean {
    const match = this.safeRegEx.match(this.expressions.array, type.name)[0];
    if (match) {
      type.isArray = true;
      
    }
    return !!match;
  }

  private static tryParseCollection(type: Type): Boolean {
    const match = this.safeRegEx.match(this.expressions.collection, type.name)[0];
    if (match) {
      console.log(match);
      type.isArray = true;
      type.name = match[1];
      type.generics = [this.parse(match[2])];
    }
    return !!match;
  }

  private static tryParseDictionary(type: Type): Boolean {
    const match = this.safeRegEx.match(this.expressions.dictionary, type.name)[0];
    if (match) {
      console.log(match);
      type.isDictionary = true;
      
      let type1 = match[1];
      let type2 = match[2];

      type.generics = [this.parse(type1), this.parse(type2)];
    }
    return !!match;
  }
}