import { Options } from './Options';
import { PocoParser } from './PocoParser';
import { PocoGenerator } from './PocoGenerator';
import { PluginError } from 'gulp-util';
import * as through from 'through2';

function jsPocoGenParser(input: string, options: Options): string {
    const pocoParser = new PocoParser(options);

    let pocos = pocoParser.parse(input);
    
    const pocoGenerator = new PocoGenerator(options);
    return pocoGenerator.toJs(pocos);
}

var PLUGIN_NAME = 'gulp-cs-js-poco-gen';

function jsPocoGenGulp(passedOptions: any) {
	const options = new Options(passedOptions);

    var stream = through.obj(function(file, enc, cb) {
		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, "Streams not supported yet!"));
			return cb();
		}

		if (file.isBuffer()) {
			if (file.contents) {
				var stringContents = file.contents.toString();
				
				var result = jsPocoGenParser(stringContents, options);
				
				file.contents = new Buffer(result);

                var suffix = 'js'; // options.definitionFile === false || options.generateClass === true ? 'ts' : 'd.ts';
				file.path = file.path.substring(0, file.path.length - 2) + suffix;
			}
		}

		this.push(file);

		cb();
	});

	return stream;
};

export { jsPocoGenParser as parser }
export default jsPocoGenGulp;

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