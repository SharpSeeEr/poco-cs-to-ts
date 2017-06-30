"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vm = require("vm");
class SafeRegEx {
    constructor(timeout = 30000) {
        this.timeout = timeout;
    }
    execAll(regex, input) {
        let results = [];
        const sanitizedInput = input
            .replace(/[\n\r]+/gm, "\n");
        //.replace(/\'/g, "\\'");
        while (true) {
            let result = regex.exec(sanitizedInput);
            if (!result)
                break;
            results.push(result);
        }
        return results;
    }
    match(regex, input) {
        //console.log('in match - timeout: ', this.timeout);
        //console.log(input);
        if (!input)
            return [];
        const sandbox = {
            results: [],
            regex: regex,
            result: null
        };
        const context = vm.createContext(sandbox);
        const sanitizedInput = input
            .replace(/[\n\r]+/gm, "\\n")
            .replace(/\'/g, "\\'");
        //console.log(sanitizedInput);
        // console.log('exec results:')
        // console.log(regex.exec(sanitizedInput));
        //while (sandbox.result = regex.exec(sanitizedInput)) {
        //console.log(sandbox.result)
        //sandbox.results.push(sandbox.result);
        //}
        const scriptString = `while(result=regex.exec('${sanitizedInput}')){results.push(result);}`;
        const script = new vm.Script(scriptString);
        try {
            let timeout = this.timeout;
            if (!timeout)
                timeout = 30000;
            script.runInContext(context, {
                timeout: timeout
            });
        }
        catch (e) {
            throw new Error(`Regular expression timeout for pattern '${regex}' and data '${input}', with ${sandbox.results.length} results gathered so far.\n\nInner error: ${e}`);
        }
        //console.log(sandbox);
        return sandbox.results;
    }
}
exports.SafeRegEx = SafeRegEx;
