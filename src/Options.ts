export class Options {
  baseNamespace: string;
  definitionFile: boolean;
  useStringUniontypes: boolean;
  ignoreVirtual: boolean;
  ignoreMethods: boolean;
  stripReadOnly: boolean;
  dateTimeToDate: boolean;
  ignoreInheritance: boolean;

  useCamelCase: boolean = true;
  usePascalCase: boolean;
  
  timeout: number = 30000;

  additionalInterfaceCodeResolver: Function;
  typeResolver: Function;
  interfaceNameResolver: Function;
  methodNameResolver: Function;
  propertyNameResolver: Function;

  defaultInterfaceNameResolver(name: string):string {
    return this.defaultNameResolver(name);
  }

  defaultMethodNameResolver(name: string):string {
    return this.defaultNameResolver(name);
  }

  defaultPropertyNameResolver(name: string):string {
    return this.defaultNameResolver(name);
  }

  private defaultNameResolver(name: string):string {
    if (this.useCamelCase) return this.camelCaseNameResolver(name);
    return name;
  }
  
  camelCaseNameResolver(name: string): string {
    return name.replace(/(^[A-Z]+)(?![a-z])|(^[A-Z])(?=[a-z])/g, function (match) {
      return match.toLowerCase();
    });
  }

  constructor(options?: Object) {
    this.interfaceNameResolver = this.defaultInterfaceNameResolver;
    this.methodNameResolver = this.defaultMethodNameResolver;
    this.propertyNameResolver = this.defaultPropertyNameResolver;
    if (options) Object.assign(this, options);
  }
}

export enum AccountType {
  None,
  Checking,
  Savings
}
