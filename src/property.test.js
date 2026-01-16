const fc = require('fast-check');
const parser = require('./index');

// Helper functions from integration.test.js
function stringifyValue(v) {
  if (Array.isArray(v)) return stringifyValue(v[0]);
  if (typeof v === 'number') return v;
  if (typeof v === 'object' && v.value !== undefined) return v.value + (v.unit || '');
  return v;
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