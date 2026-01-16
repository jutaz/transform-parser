const nearley = require('nearley');
const grammar = require('./grammar.js');

// Pre-compile the grammar once for performance
const compiledGrammar = nearley.Grammar.fromCompiled(grammar);

module.exports = {
  /**
   * Parses a CSS/SVG transform attribute string into a structured object.
   * @param {string} attribute - The transform attribute string to parse.
   * @param {object} [options] - Parsing options.
   * @param {boolean} [options.strict=true] - If true, fail on any invalid syntax. If false, attempt to recover by skipping invalid parts.
   * @returns {object} The parsed transform object or an error object if parsing fails.
   */
  parse(attribute, options = { strict: true }) {
    if (attribute == null || attribute === '') {
      return { error: true, message: 'Input is empty or null' };
    }

    if (options.strict) {
      try {
        // Create a new parser instance for each call to ensure clean state
        const parser = new nearley.Parser(compiledGrammar, { keepHistory: true });

        parser.feed(attribute);

        if (parser.results.length === 0) {
          return { error: true, message: 'No valid parse found for the input' };
        }

        return parser.results[0];
      } catch (e) {
        return { error: true, message: 'Invalid syntax: ' + e.message };
      }
    } else {
      // Recovery mode: parse individual valid transform functions, skip invalid parts
      const transformRegex = /(matrix|translate|scale|rotate|skew|perspective)\([^)]*\)/gi;
      const results = [];
      const matches = attribute.matchAll(transformRegex);
      for (const match of matches) {
        try {
          const parser = new nearley.Parser(compiledGrammar, { keepHistory: true });
          parser.feed(match[0]);
          if (parser.results.length > 0) {
            results.push(...parser.results[0]);
          }
        } catch (e) {
          // Skip invalid matches
        }
      }
      return results;
    }
  },
};
