"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Options {
    constructor(options) {
        this.useCamelCase = true;
        this.timeout = 30000;
        this.interfaceNameResolver = this.defaultInterfaceNameResolver;
        this.methodNameResolver = this.defaultMethodNameResolver;
        this.propertyNameResolver = this.defaultPropertyNameResolver;
        if (options)
            Object.assign(this, options);
    }
    defaultInterfaceNameResolver(name) {
        return this.defaultNameResolver(name);
    }
    defaultMethodNameResolver(name) {
        return this.defaultNameResolver(name);
    }
    defaultPropertyNameResolver(name) {
        return this.defaultNameResolver(name);
    }
    defaultNameResolver(name) {
        if (this.useCamelCase)
            return this.camelCaseNameResolver(name);
        return name;
    }
    camelCaseNameResolver(name) {
        return name.replace(/(^[A-Z]+)(?![a-z])|(^[A-Z])(?=[a-z])/g, function (match) {
            return match.toLowerCase();
        });
    }
}
exports.Options = Options;
