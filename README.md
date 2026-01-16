# transform-parser

[![npm version](https://badge.fury.io/js/%40jutaz%2Ftransform-parser.svg)](https://badge.fury.io/js/%40jutaz%2Ftransform-parser)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A robust parser for CSS/SVG `transform` attributes, built with [Nearley](https://nearley.js.org/). It parses transform strings into structured JavaScript objects, supporting all standard 2D and 3D transforms with proper unit handling.

## Installation

```bash
npm install @jutaz/transform-parser
```

## Usage

```javascript
const { parse } = require('@jutaz/transform-parser');

const result = parse('translate(10px, 20px) scale(2) rotate(45deg)');
console.log(result);
// Output:
// [
//   { type: 'translate', x: [{ value: 10, unit: 'px' }], y: [{ value: 20, unit: 'px' }], z: null },
//   { type: 'scale', x: 2, y: null, z: null },
//   { type: 'rotate', x: null, y: null, z: { value: 45, unit: 'deg' } }
// ]
```

## API

### `parse(attribute)`

Parses a CSS/SVG transform attribute string.

- **Parameters:**
  - `attribute` (string): The transform attribute string to parse.
- **Returns:** An array of transform objects on success, or an error object on failure.

#### Transform Objects

Each transform is represented as an object with a `type` and relevant properties:

- **Translate:** `{ type: 'translate', x: number|array|object|null, y: number|array|object|null, z: number|object|null }`
- **Scale:** `{ type: 'scale', x: number|object|null, y: number|object|null, z: number|object|null }`
- **Rotate:** `{ type: 'rotate', x: object|null, y: object|null, z: object|null }`
- **Rotate3D:** `{ type: 'rotate3d', x: number, y: number, z: number, angle: object }`
- **Skew:** `{ type: 'skew', x: object|null, y: object|null }`
- **Matrix:** `{ type: 'matrix', matrix: [number, number, number, number, number, number] }`
- **Matrix3D:** `{ type: 'matrix3d', matrix: [number x 16] }`
- **Perspective:** `{ type: 'perspective', value: object|string }`

#### Var and Calc Objects

- **Var:** `{ type: 'var', name: string, fallback: object|null }`
- **Calc:** `{ type: 'calc', expression: string }`

#### Units and Values

- **Lengths:** Parsed with units (e.g., `px`, `em`, `vh`) or as raw numbers. Percentages are converted to decimals (e.g., `50%` → `0.5`).
- **Angles:** Include unit (`deg`, `rad`, `grad`, `turn`).
- **Numbers:** Support integers, decimals, negatives, and scientific notation.

#### Error Handling

On parsing errors, returns an object: `{ error: true, message: string }`.

## Supported Transforms

- `translate(x, y?)` / `translateX(x)` / `translateY(y)` / `translateZ(z)` / `translate3d(x, y, z)`
- `scale(sx, sy?)` / `scaleX(sx)` / `scaleY(sy)` / `scaleZ(sz)` / `scale3d(sx, sy, sz)`
- `rotate(angle)` / `rotateX(angle)` / `rotateY(angle)` / `rotateZ(angle)` / `rotate3d(x, y, z, angle)`
- `skew(ax, ay?)` / `skewX(ax)` / `skewY(ay)`
- `matrix(a, b, c, d, e, f)`
- `matrix3d(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4)`
- `perspective(length | none)`

### Modern CSS Features

- **CSS Custom Properties:** `var(--name)` or `var(--name, fallback)`
- **CSS Calculations:** `calc(expression)`

### Supported Units

- **Absolute Lengths:** `px`, `cm`, `mm`, `in`, `pc`, `pt`
- **Viewport Percentages:** `vh`, `vw`, `vi`, `vb`, `vmin`, `vmax`
- **Font-Relative Lengths:** `ch`, `em`, `ex`, `ic`, `lh`, `rem`, `rl`
- **Angles:** `deg`, `rad`, `grad`, `turn`
- **Percentages:** `%` (converted to decimals where applicable)

## Examples

### Basic Transforms

```javascript
parse('translate(10px, 20px)');
// [{ type: 'translate', x: [{ value: 10, unit: 'px' }], y: [{ value: 20, unit: 'px' }], z: null }]

parse('scale(2, 0.5)');
// [{ type: 'scale', x: 2, y: 0.5, z: null }]

parse('rotate(45deg)');
// [{ type: 'rotate', x: null, y: null, z: { value: 45, unit: 'deg' } }]
```

### 3D Transforms

```javascript
parse('translate3d(10px, 20px, 5px)');
// [{ type: 'translate', x: [{ value: 10, unit: 'px' }], y: [{ value: 20, unit: 'px' }], z: { value: 5, unit: 'px' } }]

parse('rotate3d(1, 0, 0, 90deg)');
// [{ type: 'rotate3d', x: 1, y: 0, z: 0, angle: { value: 90, unit: 'deg' } }]
```

### Matrix Transforms

```javascript
parse('matrix(1, 0, 0, 1, 10, 20)');
// [{ type: 'matrix', matrix: [1, 0, 0, 1, 10, 20] }]
```

### Complex Chains

```javascript
parse('translate(2508px, 32px) scale(-1, 1) rotate(180deg)');
// [
//   { type: 'translate', x: [{ value: 2508, unit: 'px' }], y: [{ value: 32, unit: 'px' }], z: null },
//   { type: 'scale', x: -1, y: 1, z: null },
//   { type: 'rotate', x: null, y: null, z: { value: 180, unit: 'deg' } }
// ]
```

### Modern CSS Features

```javascript
parse('translate(var(--x), calc(10px + 5%))');
// [
//   { type: 'translate', x: [{ type: 'var', name: '--x', fallback: null }], y: [{ type: 'calc', expression: '10px + 5%' }], z: null }
// ]

parse('scale(var(--scale, 1.5))');
// [
//   { type: 'scale', x: { type: 'var', name: '--scale', fallback: 1.5 }, y: null, z: null }
// ]
```

### Error Handling

```javascript
parse('invalid');
// { error: true, message: 'Invalid syntax: ...' }

parse('');
// { error: true, message: 'Input is empty or null' }
```

## Contributing

Contributions are welcome! Please open issues or pull requests on [GitHub](https://github.com/jutaz/transform-parser).

To develop locally:
1. Clone the repo: `git clone https://github.com/jutaz/transform-parser.git`
2. Install dependencies: `npm install`
3. Build the grammar: `npm run build`
4. Run tests: `npm test`

## License

MIT © [Justas Brazauskas](https://github.com/jutaz)