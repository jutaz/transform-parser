const nearley = require("nearley");
const grammar = require("./grammar.js");

let parser;

module.exports = {
  parse (attribute) {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed(attribute);

    return parser.results[0];
  }
}
