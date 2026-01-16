const Benchmark = require('benchmark');
const { parse } = require('./index');

// Define test inputs of varying sizes and complexities
const inputs = {
  small: 'translate(10px)',
  medium: 'translate(10px, 20px) scale(2) rotate(45deg)',
  large: 'translate(100px, 200px) scale(1.5, 2.0) rotate(90deg) skewX(30deg) skewY(20deg) matrix(1, 0, 0, 1, 50, 50)',
  complex: 'translate3d(10px, 20px, 30px) scale3d(1.1, 1.2, 1.3) rotate3d(1, 1, 1, 45deg) perspective(500px) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)',
  list: Array.from({ length: 10 }, (_, i) => `translate(${i * 10}px, ${i * 20}px)`).join(' '),
  bigList: Array.from({ length: 100 }, (_, i) => `translate(${i}px) scale(${1 + i * 0.01}) rotate(${i}deg)`).join(' '),
};

// Create a benchmark suite
const suite = new Benchmark.Suite('Transform Parser Performance');

// Add benchmarks for each input
Object.entries(inputs).forEach(([name, input]) => {
  suite.add(`Parse ${name} (${input.length} chars)`, function() {
    parse(input, { strict: true });
  });
});

// Add listeners
suite
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });