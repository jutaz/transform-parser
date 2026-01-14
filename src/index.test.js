const parser = require('../src');

describe('parser', () => {
  test('should parse multiple operations', () => {
    expect(parser.parse(
      'translate(2508.000000, 32.000000) scale(-1, 1) translate(-2508.000000, -32.000000) translate(2482.000000, 1.000000)'
    )).toEqual([
      {
        type: 'translate',
        x: { value: 2508, unit: null },
        y: { value: 32, unit: null },
        z: null
      },
      {
        type: 'scale',
        x: -1,
        y: 1,
        z: null
      },
      {
        type: 'translate',
        x: { value: -2508, unit: null },
        y: { value: -32, unit: null },
        z: null
      },
      {
        type: 'translate',
        x: { value: 2482, unit: null },
        y: { value: 1, unit: null },
        z: null
      }
    ]);
  });

  test('should handle empty input', () => {
    expect(parser.parse('')).toEqual({ error: true, message: 'Input is empty or null' });
  });

  test('should handle null input', () => {
    expect(parser.parse(null)).toEqual({ error: true, message: 'Input is empty or null' });
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
        { type: 'translate', x: { value: 10, unit: 'px' }, y: null, z: null }
      ]);
    });

    test('translate(x, y)', () => {
      expect(parser.parse('translate(10px, 20em)')).toEqual([
        { type: 'translate', x: { value: 10, unit: 'px' }, y: { value: 20, unit: 'em' }, z: null }
      ]);
    });

    test('translate with percentage', () => {
      expect(parser.parse('translate(50%, 25%)')).toEqual([
        { type: 'translate', x: { value: 0.5, unit: null }, y: { value: 0.25, unit: null }, z: null }
      ]);
    });

    test('translate with zero', () => {
      expect(parser.parse('translate(0, 0)')).toEqual([
        { type: 'translate', x: { value: 0, unit: null }, y: { value: 0, unit: null }, z: null }
      ]);
    });

    test('translate with negative', () => {
      expect(parser.parse('translate(-10px, -5em)')).toEqual([
        { type: 'translate', x: { value: -10, unit: 'px' }, y: { value: -5, unit: 'em' }, z: null }
      ]);
    });

    test('translate with decimal', () => {
      expect(parser.parse('translate(1.5px, 2.75em)')).toEqual([
        { type: 'translate', x: { value: 1.5, unit: 'px' }, y: { value: 2.75, unit: 'em' }, z: null }
      ]);
    });

    test('translate with scientific notation', () => {
      expect(parser.parse('translate(1e2px, 2.5e-1em)')).toEqual([
        { type: 'translate', x: { value: 100, unit: 'px' }, y: { value: 0.25, unit: 'em' }, z: null }
      ]);
    });
  });

  describe('translateX', () => {
    test('translateX(x)', () => {
      expect(parser.parse('translateX(10px)')).toEqual([
        { type: 'translate', x: { value: 10, unit: 'px' }, y: null, z: null }
      ]);
    });

    test('translateX with vh', () => {
      expect(parser.parse('translateX(50vh)')).toEqual([
        { type: 'translate', x: { value: 50, unit: 'vh' }, y: null, z: null }
      ]);
    });
  });

  describe('translateY', () => {
    test('translateY(y)', () => {
      expect(parser.parse('translateY(20%)')).toEqual([
        { type: 'translate', x: null, y: { value: 0.2, unit: null }, z: null }
      ]);
    });
  });

  describe('translateZ', () => {
    test('translateZ(z)', () => {
      expect(parser.parse('translateZ(5px)')).toEqual([
        { type: 'translate', x: null, y: null, z: { value: 5, unit: 'px' } }
      ]);
    });
  });

  describe('translate3d', () => {
    test('translate3d(x, y, z)', () => {
      expect(parser.parse('translate3d(10px, 20em, 5cm)')).toEqual([
        { type: 'translate', x: { value: 10, unit: 'px' }, y: { value: 20, unit: 'em' }, z: { value: 5, unit: 'cm' } }
      ]);
    });
  });

  // Scale tests
  describe('scale', () => {
    test('scale(s)', () => {
      expect(parser.parse('scale(2)')).toEqual([
        { type: 'scale', x: 2, y: null, z: null }
      ]);
    });

    test('scale(sx, sy)', () => {
      expect(parser.parse('scale(2, 0.5)')).toEqual([
        { type: 'scale', x: 2, y: 0.5, z: null }
      ]);
    });

    test('scale with zero', () => {
      expect(parser.parse('scale(0, 1)')).toEqual([
        { type: 'scale', x: 0, y: 1, z: null }
      ]);
    });

    test('scale with negative', () => {
      expect(parser.parse('scale(-1, -2)')).toEqual([
        { type: 'scale', x: -1, y: -2, z: null }
      ]);
    });

    test('scale with decimal', () => {
      expect(parser.parse('scale(1.5, 0.75)')).toEqual([
        { type: 'scale', x: 1.5, y: 0.75, z: null }
      ]);
    });
  });

  describe('scaleX', () => {
    test('scaleX(sx)', () => {
      expect(parser.parse('scaleX(3)')).toEqual([
        { type: 'scale', x: 3, y: null, z: null }
      ]);
    });
  });

  describe('scaleY', () => {
    test('scaleY(sy)', () => {
      expect(parser.parse('scaleY(0.8)')).toEqual([
        { type: 'scale', x: null, y: 0.8, z: null }
      ]);
    });
  });

  describe('scaleZ', () => {
    test('scaleZ(sz)', () => {
      expect(parser.parse('scaleZ(1.2)')).toEqual([
        { type: 'scale', x: null, y: null, z: 1.2 }
      ]);
    });
  });

  describe('scale3d', () => {
    test('scale3d(sx, sy, sz)', () => {
      expect(parser.parse('scale3d(1, 2, 3)')).toEqual([
        { type: 'scale', x: 1, y: 2, z: 3 }
      ]);
    });
  });

  // Rotate tests
  describe('rotate', () => {
    test('rotate(angle)', () => {
      expect(parser.parse('rotate(45deg)')).toEqual([
        { type: 'rotate', x: null, y: null, z: { value: 45, unit: 'deg' } }
      ]);
    });

    test('rotate with rad', () => {
      expect(parser.parse('rotate(1.57rad)')).toEqual([
        { type: 'rotate', x: null, y: null, z: { value: 1.57, unit: 'rad' } }
      ]);
    });

    test('rotate with grad', () => {
      expect(parser.parse('rotate(100grad)')).toEqual([
        { type: 'rotate', x: null, y: null, z: { value: 100, unit: 'grad' } }
      ]);
    });

    test('rotate with turn', () => {
      expect(parser.parse('rotate(0.5turn)')).toEqual([
        { type: 'rotate', x: null, y: null, z: { value: 0.5, unit: 'turn' } }
      ]);
    });

    test('rotate with zero', () => {
      expect(parser.parse('rotate(0)')).toEqual([
        { type: 'rotate', x: null, y: null, z: { value: 0, unit: null } }
      ]);
    });

    test('rotate with negative', () => {
      expect(parser.parse('rotate(-90deg)')).toEqual([
        { type: 'rotate', x: null, y: null, z: { value: -90, unit: 'deg' } }
      ]);
    });
  });

  describe('rotateX', () => {
    test('rotateX(angle)', () => {
      expect(parser.parse('rotateX(30deg)')).toEqual([
        { type: 'rotate', x: { value: 30, unit: 'deg' }, y: null, z: null }
      ]);
    });
  });

  describe('rotateY', () => {
    test('rotateY(angle)', () => {
      expect(parser.parse('rotateY(60rad)')).toEqual([
        { type: 'rotate', x: null, y: { value: 60, unit: 'rad' }, z: null }
      ]);
    });
  });

  describe('rotateZ', () => {
    test('rotateZ(angle)', () => {
      expect(parser.parse('rotateZ(45turn)')).toEqual([
        { type: 'rotate', x: null, y: null, z: { value: 45, unit: 'turn' } }
      ]);
    });
  });

  describe('rotate3d', () => {
    test('rotate3d(x, y, z, angle)', () => {
      expect(parser.parse('rotate3d(1, 0, 0, 90deg)')).toEqual([
        { type: 'rotate3d', x: 1, y: 0, z: 0, angle: { value: 90, unit: 'deg' } }
      ]);
    });
  });

  // Skew tests
  describe('skew', () => {
    test('skew(ax)', () => {
      expect(parser.parse('skew(10deg)')).toEqual([
        { type: 'skew', x: { value: 10, unit: 'deg' }, y: null }
      ]);
    });

    test('skew(ax, ay)', () => {
      expect(parser.parse('skew(10deg, 20deg)')).toEqual([
        { type: 'skew', x: { value: 10, unit: 'deg' }, y: { value: 20, unit: 'deg' } }
      ]);
    });

    test('skew with zero', () => {
      expect(parser.parse('skew(0, 0)')).toEqual([
        { type: 'skew', x: { value: 0, unit: null }, y: { value: 0, unit: null } }
      ]);
    });

    test('skew with negative', () => {
      expect(parser.parse('skew(-5deg, -10rad)')).toEqual([
        { type: 'skew', x: { value: -5, unit: 'deg' }, y: { value: -10, unit: 'rad' } }
      ]);
    });
  });

  describe('skewX', () => {
    test('skewX(ax)', () => {
      expect(parser.parse('skewX(15deg)')).toEqual([
        { type: 'skew', x: { value: 15, unit: 'deg' }, y: null }
      ]);
    });
  });

  describe('skewY', () => {
    test('skewY(ay)', () => {
      expect(parser.parse('skewY(25grad)')).toEqual([
        { type: 'skew', x: null, y: { value: 25, unit: 'grad' } }
      ]);
    });
  });

  // Matrix tests
  describe('matrix', () => {
    test('matrix(a, b, c, d, e, f)', () => {
      expect(parser.parse('matrix(1, 0, 0, 1, 10, 20)')).toEqual([
        { type: 'matrix', matrix: [1, 0, 0, 1, 10, 20] }
      ]);
    });
  });

  describe('matrix3d', () => {
    test('matrix3d(16 values)', () => {
      expect(parser.parse('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)')).toEqual([
        { type: 'matrix3d', matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] }
      ]);
    });
  });

  // Perspective tests
  describe('perspective', () => {
    test('perspective(length)', () => {
      expect(parser.parse('perspective(1000px)')).toEqual([
        { type: 'perspective', value: { value: 1000, unit: 'px' } }
      ]);
    });

    test('perspective with em', () => {
      expect(parser.parse('perspective(50em)')).toEqual([
        { type: 'perspective', value: { value: 50, unit: 'em' } }
      ]);
    });
  });

  // Whitespace handling
  describe('whitespace handling', () => {
    test('extra spaces', () => {
      expect(parser.parse('translate( 10px , 20px )')).toEqual([
        { type: 'translate', x: { value: 10, unit: 'px' }, y: { value: 20, unit: 'px' }, z: null }
      ]);
    });

    test('tabs and newlines', () => {
      expect(parser.parse('translate(\t10px\n,\n20px\t)')).toEqual([
        { type: 'translate', x: { value: 10, unit: 'px' }, y: { value: 20, unit: 'px' }, z: null }
      ]);
    });

    test('multiple spaces', () => {
      expect(parser.parse('scale(  2  ,  0.5  )')).toEqual([
        { type: 'scale', x: 2, y: 0.5, z: null }
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
});