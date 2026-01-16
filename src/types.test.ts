import { parse, Transform, ErrorResult, TranslateTransform, ScaleTransform } from './index';

// Test 1: Valid parsing should return Transform[][]
test('parse valid transform string returns Transform[][]', () => {
  const result = parse('translate(10px, 20px) scale(2)');
  if ('error' in result) {
    throw new Error('Should not error');
  }
  expect(Array.isArray(result)).toBe(true);
  result.forEach((inner: Transform[]) => {
    expect(Array.isArray(inner)).toBe(true);
    inner.forEach((transform: Transform) => {
      expect(typeof transform.type).toBe('string');
    });
  });
});

// Test 2: Invalid parsing in strict mode should return ErrorResult
test('parse invalid string in strict mode returns ErrorResult', () => {
  const result = parse('invalid transform');
  expect(result).toHaveProperty('error', true);
  expect(result).toHaveProperty('message');
});

// Test 3: Non-strict mode should attempt recovery
test('parse with recovery option', () => {
  const result = parse('translate(10px) invalid scale(2)', { strict: false });
  if ('error' in result) {
    throw new Error('Should not error in non-strict');
  }
  expect(Array.isArray(result)).toBe(true);
  // In recovery mode, it's flattened Transform[]
});

// Test 4: Type checking for specific transform types
test('type check translate transform', () => {
  const result = parse('translate(10px, 20px)');
  if ('error' in result) {
    throw new Error('Should not error');
  }
  const inner = result[0] as Transform[];
  const transform = inner[0] as TranslateTransform;
  expect(transform.type).toBe('translate');
  if (transform.x && transform.x.length > 0) {
    expect(typeof transform.x[0].value).toBe('number');
    expect(transform.x[0].unit?.[0]?.[0]).toBe('px');
  }
});

// Test 5: Using @ts-expect-error for invalid assignments (ensures compile-time check)
test('type errors are caught at compile time', () => {
  const result = parse('translate(10px)');
  if ('error' in result) {
    throw new Error('Should not error');
  }
  const inner = result[0] as Transform[];
  const transform = inner[0];
  // @ts-expect-error: transform is Transform, not string
  const invalid: string = transform; // This should cause TS error
  // Since @ts-expect-error allows the error, but at runtime invalid is object, so this will fail
  // But the point is TS compilation checks the types
});

// Test 6: Options type checking
test('options parameter type check', () => {
  // Valid
  parse('translate(10px)', { strict: true });
  parse('translate(10px)', { strict: false });
  parse('translate(10px)'); // default options

  // @ts-expect-error: invalid option
  parse('translate(10px)', { invalidOption: true });
});