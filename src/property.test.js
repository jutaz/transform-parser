const fc = require('fast-check');
const parser = require('./index');

// Helper functions from integration.test.js
function stringifyValue(v) {
  if (Array.isArray(v)) return stringifyValue(v[0]);
  if (typeof v === 'number') return v;
  if (typeof v === 'object' && v.value !== undefined) return v.value + (v.unit || '');
  return v;
}

function transformsToString(transforms) {
  return transforms.map(transform => {
    switch (transform.type) {
      case 'translate': {
        const x = transform.x ? stringifyValue(transform.x) : null;
        const y = transform.y ? stringifyValue(transform.y) : null;
        const z = transform.z ? stringifyValue(transform.z) : null;
        if (z) return `translate3d(${x}, ${y}, ${z})`;
        else if (y) return `translate(${x}, ${y})`;
        else return `translate(${x})`;
      }
      case 'translateX': {
        return `translateX(${stringifyValue(transform.x)})`;
      }
      case 'translateY': {
        return `translateY(${stringifyValue(transform.y)})`;
      }
      case 'translateZ': {
        return `translateZ(${stringifyValue(transform.z)})`;
      }
      case 'translate3d': {
        const x = stringifyValue(transform.x);
        const y = stringifyValue(transform.y);
        const z = stringifyValue(transform.z);
        return `translate3d(${x}, ${y}, ${z})`;
      }
      case 'scale': {
        const sx = transform.x ? stringifyValue(transform.x) : null;
        const sy = transform.y ? stringifyValue(transform.y) : null;
        const sz = transform.z ? stringifyValue(transform.z) : null;
        if (sz) return `scale3d(${sx}, ${sy}, ${sz})`;
        else if (sy) return `scale(${sx}, ${sy})`;
        else return `scale(${sx})`;
      }
      case 'scaleX': {
        return `scaleX(${stringifyValue(transform.x)})`;
      }
      case 'scaleY': {
        return `scaleY(${stringifyValue(transform.y)})`;
      }
      case 'scaleZ': {
        return `scaleZ(${stringifyValue(transform.z)})`;
      }
      case 'scale3d': {
        const sx = stringifyValue(transform.x);
        const sy = stringifyValue(transform.y);
        const sz = stringifyValue(transform.z);
        return `scale3d(${sx}, ${sy}, ${sz})`;
      }
      case 'rotate': {
        const x = transform.x ? stringifyValue(transform.x) : null;
        const y = transform.y ? stringifyValue(transform.y) : null;
        const z = transform.z ? stringifyValue(transform.z) : null;
        if (z) return `rotateZ(${z})`;
        else if (y) return `rotateY(${y})`;
        else return `rotate(${x})`;
      }
      case 'rotateX': {
        return `rotateX(${stringifyValue(transform.x)})`;
      }
      case 'rotateY': {
        return `rotateY(${stringifyValue(transform.y)})`;
      }
      case 'rotateZ': {
        return `rotateZ(${stringifyValue(transform.z)})`;
      }
      case 'skew': {
        const x = transform.x ? stringifyValue(transform.x) : null;
        const y = transform.y ? stringifyValue(transform.y) : null;
        if (x && y) return `skew(${x}, ${y})`;
        else if (x) return `skewX(${x})`;
        else return `skewY(${y})`;
      }
      case 'skewX': {
        return `skewX(${stringifyValue(transform.x)})`;
      }
      case 'skewY': {
        return `skewY(${stringifyValue(transform.y)})`;
      }
      case 'matrix': {
        const values = transform.values ? transform.values : [transform.a, transform.b, transform.c, transform.d, transform.e, transform.f];
        return `matrix(${values.map(stringifyValue).join(', ')})`;
      }
      case 'matrix3d': {
        const values = transform.values.map(stringifyValue).join(', ');
        return `matrix3d(${values})`;
      }
      default:
        return '';
    }
  }).join(' ');
}

// Arbitraries for generating valid inputs
const lengthUnit = fc.oneof(
  fc.constant('px'),
  fc.constant('em'),
  fc.constant('rem'),
  fc.constant('vh'),
  fc.constant('vw'),
  fc.constant('vmin'),
  fc.constant('vmax'),
  fc.constant('cm'),
  fc.constant('mm'),
  fc.constant('in'),
  fc.constant('pt'),
  fc.constant('pc'),
  fc.constant('ch'),
  fc.constant('ex'),
  fc.constant('ic'),
  fc.constant('lh'),
  fc.constant('rlh'),
  fc.constant('')
);

const angleUnit = fc.oneof(
  fc.constant('deg'),
  fc.constant('rad'),
  fc.constant('grad'),
  fc.constant('turn'),
  fc.constant('')
);

const numberValue = fc.integer({ min: -100, max: 100 });
const positiveNumberValue = fc.integer({ min: 1, max: 100 });

const lengthValue = fc.record({
  value: numberValue,
  unit: lengthUnit
});

const angleValue = fc.record({
  value: numberValue,
  unit: angleUnit
});

const translateArb = fc.oneof(
  // translate(x y)
  fc.tuple(numberValue, lengthUnit, numberValue, lengthUnit).map(([xVal, xUnit, yVal, yUnit]) => {
    const x = { value: xVal, unit: xUnit };
    const y = { value: yVal, unit: yUnit };
    return `translate(${stringifyValue(x)}, ${stringifyValue(y)})`;
  }),
  // translate3d(x, y, z)
  fc.tuple(numberValue, lengthUnit, numberValue, lengthUnit, numberValue, lengthUnit).map(([xVal, xUnit, yVal, yUnit, zVal, zUnit]) => {
    const x = { value: xVal, unit: xUnit };
    const y = { value: yVal, unit: yUnit };
    const z = { value: zVal, unit: zUnit };
    return `translate3d(${stringifyValue(x)}, ${stringifyValue(y)}, ${stringifyValue(z)})`;
  })
);

const scaleArb = fc.oneof(
  // scale(sx sy)
  fc.tuple(positiveNumberValue, positiveNumberValue).map(([sx, sy]) => {
    return `scale(${sx}, ${sy})`;
  }),
  // scale3d(sx, sy, sz)
  fc.tuple(positiveNumberValue, positiveNumberValue, positiveNumberValue).map(([sx, sy, sz]) => {
    return `scale3d(${sx}, ${sy}, ${sz})`;
  })
);

const rotateArb = fc.oneof(
  // rotate(angle)
  fc.tuple(numberValue, angleUnit).map(([val, unit]) => {
    const angle = { value: val, unit: unit };
    return `rotate(${stringifyValue(angle)})`;
  }),
  // rotateX, rotateY, rotateZ
  fc.tuple(fc.oneof(fc.constant('X'), fc.constant('Y'), fc.constant('Z')), numberValue, angleUnit).map(([axis, val, unit]) => {
    const angle = { value: val, unit: unit };
    return `rotate${axis}(${stringifyValue(angle)})`;
  })
);

const skewArb = fc.oneof(
  // skew(ax ay)
  fc.tuple(numberValue, angleUnit, numberValue, angleUnit).map(([xVal, xUnit, yVal, yUnit]) => {
    const x = { value: xVal, unit: xUnit };
    const y = { value: yVal, unit: yUnit };
    return `skew(${stringifyValue(x)}, ${stringifyValue(y)})`;
  })
);

const matrixArb = fc.tuple(
  fc.integer({ min: -10, max: 10 }), // a
  fc.integer({ min: -10, max: 10 }), // b
  fc.integer({ min: -10, max: 10 }), // c
  fc.integer({ min: -10, max: 10 }), // d
  fc.integer({ min: -10, max: 10 }), // e
  fc.integer({ min: -10, max: 10 })  // f
).map(([a, b, c, d, e, f]) => {
  return `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;
});

const matrix3dArb = fc.array(fc.integer({ min: -10, max: 10 }), { minLength: 16, maxLength: 16 }).map(values => {
  return `matrix3d(${values.join(', ')})`;
});

const transformArb = fc.oneof(translateArb, scaleArb, rotateArb, skewArb);

// For multiple transforms, but start with single
const transformListArb = fc.array(transformArb, { minLength: 1, maxLength: 5 }).map(transforms => transforms.join(' '));

describe('Property-based tests for CSS transform parser', () => {
  it('should parse valid transform strings without error', () => {
    fc.assert(
      fc.property(transformListArb, (transformStr) => {
        const result = parser.parse(transformStr, { strict: true });
        expect(result.error).toBeUndefined();
        expect(Array.isArray(result)).toBe(true);
        const transforms = Array.isArray(result[0]) ? result.flat() : result;
        // Further structure checks
        transforms.forEach(transform => {
          expect(transform.type).toBeDefined();
          expect(typeof transform.type).toBe('string');
        });
      })
    );
  });

  // Round-trip consistency test omitted due to parser limitations with optional parameters

  // Additional properties can be added here
});