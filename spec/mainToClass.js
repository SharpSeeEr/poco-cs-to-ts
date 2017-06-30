// Disabled multiline warning, we're fine with ES5
// jshint -W043

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

var expectedOutput = "export class MyPoco {\n\
    public Id: number;\n\
    public Name: string;\n\
    public Title: string;\n\
    public ListFields: string[];\n\
    public IEnumerableFields: string[];\n\
    public ArrayFields: string[];\n\
    public NumberArray: number[];\n\
    public NumberList: number[];\n\
    public OptionalBool?: boolean;\n\
    public SomeDate: string;\n\
    public SomeDecimal: number;\n\
    public SomeGuid: string;\n\
    public DynamicContents: any;\n\
    public DynamicToAny: any;\n\
    public ObjectToAny: any;\n\
    \n\
    constructor(values?: Object) {\n\
        Object.assign(this, values);\n\
    }\n\
}\n";

var pocoGen = require('../src/index.js').pocoGen;

describe('typescript-cs-poco', function() {
	it('should transform a POCO as a class correctly', function() {
		var result = pocoGen(sampleFile, { generateClass: true });
        
        expect(result).toEqual(expectedOutput);
	});
});
