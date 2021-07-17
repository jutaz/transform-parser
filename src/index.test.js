const parser = require('../src');

describe('parser', () => {
  test('should parse multiple operations', () => {
    expect(parser.parse(
      'translate(2508.000000, 32.000000) scale(-1, 1) translate(-2508.000000, -32.000000) translate(2482.000000, 1.000000)'
    )).toMatchSnapshot()
  })
})
