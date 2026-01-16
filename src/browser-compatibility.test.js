const parser = require('../src');

describe('browser compatibility', () => {
  test('should parse transform in jsdom environment', () => {
    const result = parser.parse('translate(10px)');
    expect(result).toEqual([
      [
        {
          type: 'translate',
          x: [{ value: 10, unit: [['px']], location: expect.any(Number) }],
          z: null,
          location: expect.any(Number)
        }
      ]
    ]);
  });

  test('should work with DOM element transform style', () => {
    // In jsdom, document is available
    const div = document.createElement('div');
    div.style.transform = 'translate(10px) scale(2)';
    const parsed = parser.parse(div.style.transform);
    expect(parsed).toEqual([
      [
        {
          type: 'translate',
          x: [{ value: 10, unit: [['px']], location: expect.any(Number) }],
          z: null,
          location: expect.any(Number)
        }
      ],
      [
        {
          type: 'scale',
          x: 2,
          z: null,
          location: expect.any(Number)
        }
      ]
    ]);
  });

  test('should handle browser-specific transform values', () => {
    const div = document.createElement('div');
    div.style.transform = 'rotate(45deg)';
    const parsed = parser.parse(div.style.transform);
    expect(parsed).toEqual([
      [
        {
          type: 'rotate',
          x: null,
          y: null,
          z: { value: 45, unit: [['deg']], location: expect.any(Number) },
          location: expect.any(Number)
        }
      ]
    ]);
  });
});