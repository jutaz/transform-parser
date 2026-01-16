const parser = require('../src');

describe('parser', () => {
  test('should parse multiple operations', () => {
    expect(
      parser.parse(
        'translate(2508.000000, 32.000000) scale(-1, 1) translate(-2508.000000, -32.000000) translate(2482.000000, 1.000000)',
      ),
    ).toEqual([
      [
        {
          type: 'translate',
          x: [{ value: 2508, unit: null, location: expect.any(Number) }],
          y: undefined,
          z: null,
          location: expect.any(Number)
        }
      ],
      [
        {
          type: 'scale',
          x: -1,
          y: undefined,
          z: null,
          location: expect.any(Number)
        }
      ],
      [
        {
          type: 'translate',
          x: [{ value: -2508, unit: null, location: expect.any(Number) }],
          y: undefined,
          z: null,
          location: expect.any(Number)
        }
      ],
      [
        {
          type: 'translate',
          x: [{ value: 2482, unit: null, location: expect.any(Number) }],
          y: undefined,
          z: null,
          location: expect.any(Number)
        }
      ],
    ]);
  });

  test('should handle empty input', () => {
    expect(parser.parse('')).toEqual({
      error: true,
      message: 'Input is empty or null',
    });
  });

  test('should handle null input', () => {
    expect(parser.parse(null)).toEqual({
      error: true,
      message: 'Input is empty or null',
    });
  });

  test('should handle invalid syntax', () => {
    const result = parser.parse('invalid');
    expect(result.error).toBe(true);
    expect(result.message).toMatch(/Invalid syntax/);
  });

  // Translate tests
  describe('translate', () => {
    test('translate(x)', () => {
      expect(parser.parse('translate(10px)')).toEqual([
        [
          { type: 'translate', x: [{ value: 10, unit: [['px']], location: expect.any(Number) }], y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('translate(x, y)', () => {
      expect(parser.parse('translate(10px, 20em)')).toEqual([
        [
          {
            type: 'translate',
            x: [{ value: 10, unit: [['px']], location: expect.any(Number) }],
            y: undefined,
            z: null,
            location: expect.any(Number)
          }
        ]
      ]);
    });

    test('translate with percentage', () => {
      expect(parser.parse('translate(50%, 25%)')).toEqual([
        [
          { type: 'translate', x: 0.5, y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('translate with zero', () => {
      expect(parser.parse('translate(0, 0)')).toEqual([
        [
          {
            type: 'translate',
            x: [{ value: 0, unit: null, location: expect.any(Number) }],
            y: undefined,
            z: null,
            location: expect.any(Number)
          }
        ]
      ]);
    });

    test('translate with negative', () => {
      expect(parser.parse('translate(-10px, -5em)')).toEqual([
        [
          {
            type: 'translate',
            x: [{ value: -10, unit: [['px']], location: expect.any(Number) }],
            y: undefined,
            z: null,
            location: expect.any(Number)
          }
        ]
      ]);
    });

    test('translate with decimal', () => {
      expect(parser.parse('translate(1.5px, 2.75em)')).toEqual([
        [
          {
            type: 'translate',
            x: [{ value: 1.5, unit: [['px']], location: expect.any(Number) }],
            y: undefined,
            z: null,
            location: expect.any(Number)
          }
        ]
      ]);
    });
  });

  describe('translateX', () => {
    test('translateX(x)', () => {
      expect(parser.parse('translateX(10px)')).toEqual([
        [
          { type: 'translate', x: [{ value: 10, unit: [['px']], location: expect.any(Number) }], y: null, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('translateX with vh', () => {
      expect(parser.parse('translateX(50vh)')).toEqual([
        [
          { type: 'translate', x: [{ value: 50, unit: [['vh']], location: expect.any(Number) }], y: null, z: null, location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('translateY', () => {
    test('translateY(y)', () => {
      expect(parser.parse('translateY(20%)')).toEqual([
        [
          { type: 'translate', x: null, y: 0.2, z: null, location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('translateZ', () => {
    test('translateZ(z)', () => {
      expect(parser.parse('translateZ(5px)')).toEqual([
        [
          { type: 'translate', x: null, y: null, z: [{ value: 5, unit: [['px']], location: expect.any(Number) }], location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('translate3d', () => {
    test('translate3d(x, y, z)', () => {
      expect(parser.parse('translate3d(10px, 20em, 5cm)')).toEqual([
        [
          {
            type: 'translate',
            x: [{ value: 10, unit: [['px']], location: expect.any(Number) }],
            y: [{ value: 20, unit: [['em']], location: expect.any(Number) }],
            z: { value: 5, unit: [['cm']], location: expect.any(Number) },
            location: expect.any(Number)
          }
        ]
      ]);
    });
  });

  // Scale tests
  describe('scale', () => {
    test('scale(s)', () => {
      expect(parser.parse('scale(2)')).toEqual([
        [
          { type: 'scale', x: 2, y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('scale(sx, sy)', () => {
      expect(parser.parse('scale(2, 0.5)')).toEqual([
        [
          { type: 'scale', x: 2, y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('scale with zero', () => {
      expect(parser.parse('scale(0, 1)')).toEqual([
        [
          { type: 'scale', x: 0, y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('scale with negative', () => {
      expect(parser.parse('scale(-1, -2)')).toEqual([
        [
          { type: 'scale', x: -1, y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('scale with decimal', () => {
      expect(parser.parse('scale(1.5, 0.75)')).toEqual([
        [
          { type: 'scale', x: 1.5, y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('scale with percentage', () => {
      expect(parser.parse('scale(50%, 25%)')).toEqual([
        [
          { type: 'scale', x: 0.5, y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('scaleX', () => {
    test('scaleX(sx)', () => {
      expect(parser.parse('scaleX(3)')).toEqual([
        [
          { type: 'scale', x: 3, y: null, z: null, location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('scaleY', () => {
    test('scaleY(sy)', () => {
      expect(parser.parse('scaleY(0.8)')).toEqual([
        [
          { type: 'scale', x: null, y: 0.8, z: null, location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('scaleZ', () => {
    test('scaleZ(sz)', () => {
      expect(parser.parse('scaleZ(1.2)')).toEqual([
        [
          { type: 'scale', x: null, y: null, z: 1.2, location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('scale3d', () => {
    test('scale3d(sx, sy, sz)', () => {
      expect(parser.parse('scale3d(1, 2, 3)')).toEqual([
        [
          { type: 'scale', x: 1, y: 2, z: 3, location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('perspective', () => {
    test('perspective(length)', () => {
      expect(parser.parse('perspective(1000px)')).toEqual([
        [
          { type: 'perspective', value: [{ value: 1000, unit: [['px']], location: expect.any(Number) }], location: expect.any(Number) }
        ]
      ]);
    });

    test('perspective(none)', () => {
      expect(parser.parse('perspective(none)')).toEqual([
        [
          { type: 'perspective', value: ['none'], location: expect.any(Number) }
        ]
      ]);
    });
  });

  // Rotate tests
  describe('rotate', () => {
    test('rotate(angle)', () => {
      expect(parser.parse('rotate(45deg)')).toEqual([
        [
          { type: 'rotate', x: null, y: null, z: { value: 45, unit: [['deg']], location: expect.any(Number) }, location: expect.any(Number) }
        ]
      ]);
    });

    test('rotate with rad', () => {
      expect(parser.parse('rotate(1.57rad)')).toEqual([
        [
          { type: 'rotate', x: null, y: null, z: { value: 1.57, unit: [['rad']], location: expect.any(Number) }, location: expect.any(Number) }
        ]
      ]);
    });

    test('rotate with grad', () => {
      expect(parser.parse('rotate(100grad)')).toEqual([
        [
          { type: 'rotate', x: null, y: null, z: { value: 100, unit: [['grad']], location: expect.any(Number) }, location: expect.any(Number) }
        ]
      ]);
    });

    test('rotate with turn', () => {
      expect(parser.parse('rotate(0.5turn)')).toEqual([
        [
          { type: 'rotate', x: null, y: null, z: { value: 0.5, unit: [['turn']], location: expect.any(Number) }, location: expect.any(Number) }
        ]
      ]);
    });

    test('rotate with zero', () => {
      expect(parser.parse('rotate(0)')).toEqual([
        [
          { type: 'rotate', x: null, y: null, z: { value: 0, unit: null, location: expect.any(Number) }, location: expect.any(Number) }
        ]
      ]);
    });

    test('rotate with negative', () => {
      expect(parser.parse('rotate(-90deg)')).toEqual([
        [
          { type: 'rotate', x: null, y: null, z: { value: -90, unit: [['deg']], location: expect.any(Number) }, location: expect.any(Number) }
        ]
      ]);
    });

    test('rotate with x axis', () => {
      expect(parser.parse('rotate(x 45deg)')).toEqual([
        [
          { type: 'rotate', x: null, y: null, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('rotate with y axis', () => {
      expect(parser.parse('rotate(y 45deg)')).toEqual([
        [
          { type: 'rotate', x: null, y: null, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('rotate with z axis', () => {
      expect(parser.parse('rotate(z 45deg)')).toEqual([
        [
          { type: 'rotate', x: null, y: null, z: null, location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('rotateX', () => {
    test('rotateX(angle)', () => {
      expect(parser.parse('rotateX(30deg)')).toEqual([
        [
          { type: 'rotate', x: { value: 30, unit: [['deg']], location: expect.any(Number) }, y: null, z: null, location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('rotateY', () => {
    test('rotateY(angle)', () => {
      expect(parser.parse('rotateY(60rad)')).toEqual([
        [
          { type: 'rotate', x: null, y: { value: 60, unit: [['rad']], location: expect.any(Number) }, z: null, location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('rotateZ', () => {
    test('rotateZ(angle)', () => {
      expect(parser.parse('rotateZ(45turn)')).toEqual([
        [
          { type: 'rotate', x: null, y: null, z: { value: 45, unit: [['turn']], location: expect.any(Number) }, location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('rotate3d', () => {
    test('rotate3d(x, y, z, angle)', () => {
      expect(parser.parse('rotate3d(1, 0, 0, 90deg)')).toEqual([
        [
          {
            type: 'rotate3d',
            x: 1,
            y: 0,
            z: 0,
            angle: { value: 90, unit: [['deg']], location: expect.any(Number) },
            location: expect.any(Number)
          }
        ]
      ]);
    });
  });

  // Skew tests
  describe('skew', () => {
    test('skew(ax)', () => {
      expect(parser.parse('skew(10deg)')).toEqual([
        [
          { type: 'skew', x: { value: 10, unit: [['deg']], location: expect.any(Number) }, y: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('skew(ax, ay)', () => {
      expect(parser.parse('skew(10deg, 20deg)')).toEqual([
        [
          {
            type: 'skew',
            x: { value: 10, unit: [['deg']], location: expect.any(Number) },
            y: { value: 20, unit: [['deg']], location: expect.any(Number) },
            location: expect.any(Number)
          }
        ]
      ]);
    });

    test('skew with zero', () => {
      expect(parser.parse('skew(0, 0)')).toEqual([
        [
          {
            type: 'skew',
            x: { value: 0, unit: null, location: expect.any(Number) },
            y: { value: 0, unit: null, location: expect.any(Number) },
            location: expect.any(Number)
          }
        ]
      ]);
    });

    test('skew with negative', () => {
      expect(parser.parse('skew(-5deg, -10rad)')).toEqual([
        [
          {
            type: 'skew',
            x: { value: -5, unit: [['deg']], location: expect.any(Number) },
            y: { value: -10, unit: [['rad']], location: expect.any(Number) },
            location: expect.any(Number)
          }
        ]
      ]);
    });
  });

  describe('skewX', () => {
    test('skewX(ax)', () => {
      expect(parser.parse('skewX(15deg)')).toEqual([
        [
          { type: 'skew', x: { value: 15, unit: [['deg']], location: expect.any(Number) }, y: null, location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('skewY', () => {
    test('skewY(ay)', () => {
      expect(parser.parse('skewY(25grad)')).toEqual([
        [
          { type: 'skew', x: null, y: { value: 25, unit: [['grad']], location: expect.any(Number) }, location: expect.any(Number) }
        ]
      ]);
    });
  });

  // Matrix tests
  describe('matrix', () => {
    test('matrix(a, b, c, d, e, f)', () => {
      expect(parser.parse('matrix(1, 0, 0, 1, 10, 20)')).toEqual([
        [
          { type: 'matrix', matrix: [1, 0, 0, 1, 10, 20], location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('matrix3d', () => {
    test('matrix3d(16 values)', () => {
      expect(parser.parse('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)')).toEqual({
        error: true,
        message: expect.stringMatching(/Invalid syntax/)
      });
    });
  });

  // Whitespace handling
  describe('whitespace handling', () => {
    test('extra spaces', () => {
      expect(parser.parse('translate( 10px , 20px )')).toEqual([
        [
          {
            type: 'translate',
            x: [{ value: 10, unit: [['px']], location: expect.any(Number) }],
            y: undefined,
            z: null,
            location: expect.any(Number)
          }
        ]
      ]);
    });

    test('tabs and newlines', () => {
      expect(parser.parse('translate(\t10px\n,\n20px\t)')).toEqual([
        [
          {
            type: 'translate',
            x: [{ value: 10, unit: [['px']], location: expect.any(Number) }],
            y: undefined,
            z: null,
            location: expect.any(Number)
          }
        ]
      ]);
    });

    test('multiple spaces in scale', () => {
      expect(parser.parse('scale(  2  ,  0.5  )')).toEqual([
        [
          { type: 'scale', x: 2, y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('multiple newlines and mixed whitespace', () => {
      expect(parser.parse('translate(\n\n10px\t,\n  20px\n\t)')).toEqual([
        [
          {
            type: 'translate',
            x: [{ value: 10, unit: [['px']], location: expect.any(Number) }],
            y: undefined,
            z: null,
            location: expect.any(Number)
          }
        ]
      ]);
    });

    test('whitespace in complex chains', () => {
      expect(parser.parse('translate(10px)\n\tscale(2)\n  rotate(45deg)')).toEqual([
        [
          { type: 'translate', x: [{ value: 10, unit: [['px']], location: expect.any(Number) }], y: undefined, z: null, location: expect.any(Number) }
        ],
        [
          { type: 'scale', x: 2, y: undefined, z: null, location: expect.any(Number) }
        ],
        [
          { type: 'rotate', x: null, y: null, z: { value: 45, unit: [['deg']], location: expect.any(Number) }, location: expect.any(Number) }
        ]
      ]);
    });
  });

  // Extreme numbers and precision
  describe('extreme numbers and precision', () => {
    test('very large numbers', () => {
      expect(parser.parse('translate(999999999999px)')).toEqual([
        [
          { type: 'translate', x: [{ value: 999999999999, unit: [['px']], location: expect.any(Number) }], y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('very small decimals', () => {
      expect(parser.parse('scale(0.0000001, 0.000001)')).toEqual([
        [
          { type: 'scale', x: 0.0000001, y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('large negative numbers', () => {
      expect(parser.parse('translate(-1000000000px, -500000000em)')).toEqual([
        [
          {
            type: 'translate',
            x: [{ value: -1000000000, unit: [['px']], location: expect.any(Number) }],
            y: undefined,
            z: null,
            location: expect.any(Number)
          }
        ]
      ]);
    });

    test('maximum safe integer', () => {
      const maxSafe = Number.MAX_SAFE_INTEGER;
      expect(parser.parse(`translate(${maxSafe}px)`)).toEqual([
        [
          { type: 'translate', x: [{ value: maxSafe, unit: [['px']], location: expect.any(Number) }], y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('minimum safe integer', () => {
      const minSafe = Number.MIN_SAFE_INTEGER;
      expect(parser.parse(`translate(${minSafe}px)`)).toEqual([
        [
          { type: 'translate', x: [{ value: minSafe, unit: [['px']], location: expect.any(Number) }], y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('high precision decimals', () => {
      expect(parser.parse('rotate(45.123456789deg)')).toEqual([
        [
          { type: 'rotate', x: null, y: null, z: { value: 45.123456789, unit: [['deg']], location: expect.any(Number) }, location: expect.any(Number) }
        ]
      ]);
    });
  });

  // Mixed units
  describe('mixed units', () => {
    test('translate with mixed length units', () => {
      expect(parser.parse('translate(10px, 20em)')).toEqual([
        [
          {
            type: 'translate',
            x: [{ value: 10, unit: [['px']], location: expect.any(Number) }],
            y: undefined,
            z: null,
            location: expect.any(Number)
          }
        ]
      ]);
    });

    test('translate3d with mixed units', () => {
      expect(parser.parse('translate3d(10px, 20%, 5vh)')).toEqual([
        [
          {
            type: 'translate',
            x: [{ value: 10, unit: [['px']], location: expect.any(Number) }],
            y: 0.2,
            z: { value: 5, unit: [['vh']], location: expect.any(Number) },
            location: expect.any(Number)
          }
        ]
      ]);
    });

    test('perspective with different length units', () => {
      expect(parser.parse('perspective(1000px)')).toEqual([
        [
          { type: 'perspective', value: [{ value: 1000, unit: [['px']], location: expect.any(Number) }], location: expect.any(Number) }
        ]
      ]);
    });

    test('skew with mixed angle units', () => {
      expect(parser.parse('skew(10deg, 20rad)')).toEqual([
        [
          {
            type: 'skew',
            x: { value: 10, unit: [['deg']], location: expect.any(Number) },
            y: { value: 20, unit: [['rad']], location: expect.any(Number) },
            location: expect.any(Number)
          }
        ]
      ]);
    });

    test('rotate3d with different angle units', () => {
      expect(parser.parse('rotate3d(1, 0, 0, 90deg)')).toEqual([
        [
          {
            type: 'rotate3d',
            x: 1,
            y: 0,
            z: 0,
            angle: { value: 90, unit: [['deg']], location: expect.any(Number) },
            location: expect.any(Number)
          }
        ]
      ]);
    });
  });

  // Complex transform chains
  describe('complex transform chains', () => {
    test('long chain of all transform types', () => {
      expect(parser.parse('translate(10px, 20px) scale(2, 0.5) rotate(45deg) skew(10deg, 5deg) matrix(1, 0, 0, 1, 0, 0) perspective(1000px)')).toEqual([
        [
          {
            type: 'translate',
            x: [{ value: 10, unit: [['px']], location: expect.any(Number) }],
            y: undefined,
            z: null,
            location: expect.any(Number)
          }
        ],
        [
          { type: 'scale', x: 2, y: undefined, z: null, location: expect.any(Number) }
        ],
        [
          { type: 'rotate', x: null, y: null, z: { value: 45, unit: [['deg']], location: expect.any(Number) }, location: expect.any(Number) }
        ],
        [
          {
            type: 'skew',
            x: { value: 10, unit: [['deg']], location: expect.any(Number) },
            y: { value: 5, unit: [['deg']], location: expect.any(Number) },
            location: expect.any(Number)
          }
        ],
        [
          { type: 'matrix', matrix: [1, 0, 0, 1, 0, 0], location: expect.any(Number) }
        ],
        [
          { type: 'perspective', value: [{ value: 1000, unit: [['px']], location: expect.any(Number) }], location: expect.any(Number) }
        ]
      ]);
    });

    test('very long chain with 10 transforms', () => {
      const chain = 'translate(1px) scale(1.1) rotate(1deg) translateX(2px) scaleX(1.2) rotateX(2deg) translateY(3px) scaleY(1.3) rotateY(3deg) translateZ(4px)';
      const result = parser.parse(chain);
      expect(result).toHaveLength(10);
      expect(result.every(transform => Array.isArray(transform) && transform.length === 1)).toBe(true);
    });

    test('mixed 3d transforms chain', () => {
      expect(parser.parse('translate3d(10px, 20px, 5px) scale3d(2, 1.5, 0.8) rotate3d(1, 1, 1, 45deg)')).toEqual([
        [
          {
            type: 'translate',
            x: [{ value: 10, unit: [['px']], location: expect.any(Number) }],
            y: [{ value: 20, unit: [['px']], location: expect.any(Number) }],
            z: { value: 5, unit: [['px']], location: expect.any(Number) },
            location: expect.any(Number)
          }
        ],
        [
          { type: 'scale', x: 2, y: 1.5, z: 0.8, location: expect.any(Number) }
        ],
        [
          {
            type: 'rotate3d',
            x: 1,
            y: 1,
            z: 1,
            angle: { value: 45, unit: [['deg']], location: expect.any(Number) },
            location: expect.any(Number)
          }
        ]
      ]);
    });
  });

  // All supported units
  describe('all supported units', () => {
    describe('length units', () => {
      const lengthUnits = ['px', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'cm', 'mm', 'in', 'pt', 'pc'];

      lengthUnits.forEach(unit => {
        test(`translate with ${unit}`, () => {
          expect(parser.parse(`translate(10${unit})`)).toEqual([
            [
              { type: 'translate', x: [{ value: 10, unit: [[unit]], location: expect.any(Number) }], y: undefined, z: null, location: expect.any(Number) }
            ]
          ]);
        });
      });
    });

    describe('angle units', () => {
      const angleUnits = ['deg', 'rad', 'grad', 'turn'];

      angleUnits.forEach(unit => {
        test(`rotate with ${unit}`, () => {
          expect(parser.parse(`rotate(45${unit})`)).toEqual([
            [
              { type: 'rotate', x: null, y: null, z: { value: 45, unit: [[unit]], location: expect.any(Number) }, location: expect.any(Number) }
            ]
          ]);
        });
      });
    });

    test('percentage in translate', () => {
      expect(parser.parse('translate(50%)')).toEqual([
        [
          { type: 'translate', x: 0.5, y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });

    test('percentage in scale', () => {
      expect(parser.parse('scale(150%)')).toEqual([
        [
          { type: 'scale', x: 1.5, y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });
  });

  // Error scenarios
  describe('error scenarios', () => {
    test('invalid function name', () => {
      const result = parser.parse('invalid(10px)');
      expect(result.error).toBe(true);
    });

    test('missing parameters', () => {
      const result = parser.parse('translate()');
      expect(result.error).toBe(true);
    });

    test('wrong number of parameters for matrix', () => {
      const result = parser.parse('matrix(1, 2, 3, 4, 5)');
      expect(result.error).toBe(true);
    });

    test('unclosed parenthesis', () => {
      const result = parser.parse('translate(10px');
      expect(result.error).toBe(true);
    });

    test('extra comma', () => {
      const result = parser.parse('translate(10px, )');
      expect(result.error).toBe(true);
    });

    test('invalid unit', () => {
      const result = parser.parse('translate(10invalid)');
      expect(result.error).toBe(true);
    });

    test('non-numeric value', () => {
      const result = parser.parse('scale(abc)');
      expect(result.error).toBe(true);
    });
  });

  // Recovery mode
  describe('recovery mode', () => {
    test('skips invalid parts and parses valid transforms', () => {
      expect(
        parser.parse('translate(10px) invalid rotate(45deg)', { strict: false }),
      ).toEqual([
        [
          { type: 'translate', x: [{ value: 10, unit: [['px']], location: expect.any(Number) }], y: undefined, z: null, location: expect.any(Number) }
        ],
        [
          { type: 'rotate', x: null, y: null, z: { value: 45, unit: [['deg']], location: expect.any(Number) }, location: expect.any(Number) }
        ]
      ]);
    });

    test('parses multiple valid transforms with junk in between', () => {
      expect(
        parser.parse('scale(2) junk translate(5px, 10px) more junk rotate(90deg)', { strict: false }),
      ).toEqual([
        [
          { type: 'scale', x: 2, y: undefined, z: null, location: expect.any(Number) }
        ],
        [
          {
            type: 'translate',
            x: [{ value: 5, unit: [['px']], location: expect.any(Number) }],
            y: undefined,
            z: null,
            location: expect.any(Number)
          }
        ],
        [
          { type: 'rotate', x: null, y: null, z: { value: 90, unit: [['deg']], location: expect.any(Number) }, location: expect.any(Number) }
        ]
      ]);
    });

    test('returns empty array if no valid transforms', () => {
      expect(parser.parse('invalid junk', { strict: false })).toEqual([]);
    });

    test('handles mixed valid and invalid', () => {
      expect(
        parser.parse('matrix(1,0,0,1,0,0) invalid( ) translate(20px)', { strict: false }),
      ).toEqual([
        [
          { type: 'matrix', matrix: [1, 0, 0, 1, 0, 0], location: expect.any(Number) }
        ],
        [
          { type: 'translate', x: [{ value: 20, unit: [['px']], location: expect.any(Number) }], y: undefined, z: null, location: expect.any(Number) }
        ]
      ]);
    });
  });

  describe('fuzzing tests', () => {
    function generateRandomString(length) {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 (){},.-+';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      return result;
    }

    test('handles random inputs in strict mode', () => {
      for (let i = 0; i < 100; i++) {
        const str = generateRandomString(Math.floor(Math.random() * 50));
        const result = parser.parse(str);
        expect(typeof result).toBe('object');
        expect(result.error === true || Array.isArray(result)).toBe(true);
      }
    });

    test('handles random inputs in non-strict mode', () => {
      for (let i = 0; i < 100; i++) {
        const str = generateRandomString(Math.floor(Math.random() * 50));
        const result = parser.parse(str, { strict: false });
        expect(typeof result).toBe('object');
        expect(result.error === true || Array.isArray(result)).toBe(true);
      }
    });
  });

  describe('snapshot tests', () => {
    test('translate with units', () => {
      expect(parser.parse('translate(10px, 20em)')).toMatchSnapshot();
    });

    test('scale and rotate', () => {
      expect(parser.parse('scale(2) rotate(45deg)')).toMatchSnapshot();
    });

    test('matrix', () => {
      expect(parser.parse('matrix(1, 0, 0, 1, 10, 20)')).toMatchSnapshot();
    });

    test('perspective', () => {
      expect(parser.parse('perspective(1000px)')).toMatchSnapshot();
    });

    test('skew', () => {
      expect(parser.parse('skew(10deg, 20deg)')).toMatchSnapshot();
    });

    test('rotate3d', () => {
      expect(parser.parse('rotate3d(1, 0, 0, 90deg)')).toMatchSnapshot();
    });

    test('complex chain', () => {
      expect(parser.parse('translate3d(10px, 20px, 5px) scale(2, 1.5) rotate(45deg)')).toMatchSnapshot();
    });
  });
});
