"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Options_1 = require("./Options");
const PocoParser_1 = require("./PocoParser");
const TypescriptGenerator_1 = require("./TypescriptGenerator");
const JavascriptGenerator_1 = require("./JavascriptGenerator");
const gulp_util_1 = require("gulp-util");
const through = require("through2");
function pocoGenParser(input, options) {
    const pocoParser = new PocoParser_1.PocoParser(options);
    let pocos = pocoParser.parse(input);
    let generator;
    if (options.outputTypescript) {
        generator = new TypescriptGenerator_1.TypescriptGenerator(options);
    }
    else if (options.outputJavascript) {
        generator = new JavascriptGenerator_1.JavascriptGenerator(options);
    }
    else
        return '/* Neither outputTypescript nor outputJavascript was specified in the options - no output generated */';
    return generator.generate(pocos, pocoParser.lookup);
}
exports.parser = pocoGenParser;
var PLUGIN_NAME = 'gulp-cs-js-poco-gen';
function pocoGenGulp(passedOptions) {
    const options = new Options_1.Options(passedOptions);
    let stream = through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gulp_util_1.PluginError(PLUGIN_NAME, "Streams not supported yet!"));
            return cb();
        }
        if (file.isBuffer()) {
            if (file.contents) {
                let stringContents = file.contents.toString();
                let result = pocoGenParser(stringContents, options);
                file.contents = new Buffer(result);
                let suffix = 'ts'; // options.definitionFile === false || options.generateClass === true ? 'ts' : 'd.ts';
                file.path = file.path.substring(0, file.path.length - 2) + suffix;
            }
        }
        this.push(file);
        cb();
    });
    return stream;
}
;
exports.default = pocoGenGulp;
// function pocoGen(input, options) {
//     input = removeComments(input);
//     var result = "";
//     if (!options) {
//         options = {};
//     }
//     for (let match of safeRegex(expressions.type, input, options)) {
//         let poco = new Poco(match[2], match[3], match[4], match[5]);
//         const type = match[2];
//         const typeName = match[3];
//         const inherits = match[4];
//         if (result.length > 0) {
//             result += "\n";
//         }
//         if (type === "class" || type === "struct") {
//             result += generateClass(typeName, inherits, match[5], type === "interface", options);
//         } else if (type === "enum") {
//             if (!options.baseNamespace) {
//               result += "declare ";
//             }
//             result += generateEnum(typeName, match[5], options);
//         }
//     }
//     if (options.baseNamespace) {
//         let firstLine;
//         if (options.definitionFile === false) {
//             firstLine = `module ${options.baseNamespace} {`;
//         } else {
//             firstLine = `declare module ${options.baseNamespace} {`;
//         }
//         let lines = [firstLine];
//         lines = lines.concat(result.split("\n").map(line =>
//             `    ${/^(?:interface|enum|type)/.test(line) ? `export ${line}` : line}`));
//         lines = lines.slice(0, lines.length - 1);
//         lines = lines.concat("}");
//         result = lines.join("\n");
//     }
//     return result;
// };
// export { pocoGen }; 
