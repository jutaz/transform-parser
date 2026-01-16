const styled = require('styled-components').default;
const styledEmotion = require('@emotion/styled').default;
const parser = require('./index');

const { StyleSheet } = require('aphrodite/no-important');
const { css: glamorCss } = require('glamor');

// Helper function to convert parsed transform array to CSS string
function stringifyValue(v) {
  if (Array.isArray(v)) return stringifyValue(v[0]);
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return v;
  if (typeof v === 'object' && v !== null && v.value !== undefined) return v.value + (v.unit || '');
  if (v == null) return '';
  return String(v);
}

function transformsToString(transforms) {
  return transforms.map(transform => {
    switch (transform.type) {
      case 'translate': {
        const x = stringifyValue(transform.x);
        const y = stringifyValue(transform.y);
        const z = transform.z ? stringifyValue(transform.z) : null;
        return `translate(${x}${y ? ', ' + y : ''}${z ? ', ' + z : ''})`;
      }
      case 'scale': {
        const sx = transform.x;
        const sy = transform.y;
        const sz = transform.z;
        return `scale(${sx}${sy !== null ? ', ' + sy : ''}${sz !== null ? ', ' + sz : ''})`;
      }
      case 'rotate': {
        const axis = transform.x ? 'x ' : transform.y ? 'y ' : transform.z ? 'z ' : '';
        const angle = stringifyValue(transform.x || transform.y || transform.z);
        return `rotate(${axis}${angle})`;
      }
      // Add more cases as needed for other transform types
      default:
        return ''; // Skip unknown
    }
  }).join(' ');
}

describe('Integration tests with CSS-in-JS libraries', () => {
  describe('styled-components', () => {
    test('should parse and use in styled component translate', () => {
      expect(() => {
        const transformString = 'translate(10px)';
        const parsed = parser.parse(transformString);
        if (parsed.error) throw new Error(parsed.message);
        const transforms = Array.isArray(parsed[0]) ? parsed.flat() : parsed;
        const cssTransform = transformsToString(transforms);

        // Demonstrate usage in styled-component
        const StyledDiv = styled.div`
          transform: ${cssTransform};
          width: 100px;
          height: 100px;
          background: red;
        `;

        return StyledDiv;
      }).not.toThrow();
    });

    test('should parse and use in styled component scale', () => {
      expect(() => {
        const transformString = 'scale(2)';
        const parsed = parser.parse(transformString);
        if (parsed.error) throw new Error(parsed.message);
        const transforms = Array.isArray(parsed[0]) ? parsed.flat() : parsed;
        const cssTransform = transformsToString(transforms);

        const StyledDiv = styled.div`
          transform: ${cssTransform};
        `;

        return StyledDiv;
      }).not.toThrow();
    });


  });

  describe('@emotion/styled', () => {
    test('should parse and use in emotion styled component translate', () => {
      expect(() => {
        const transformString = 'translate(10px)';
        const parsed = parser.parse(transformString);
        if (parsed.error) throw new Error(parsed.message);
        const transforms = Array.isArray(parsed[0]) ? parsed.flat() : parsed;
        const cssTransform = transformsToString(transforms);

        const StyledDiv = styledEmotion.div`
          transform: ${cssTransform};
          width: 100px;
          height: 100px;
          background: blue;
        `;

        return StyledDiv;
      }).not.toThrow();
    });

    test('should parse and use in emotion styled component rotate', () => {
      expect(() => {
        const transformString = 'rotate(45deg)';
        const parsed = parser.parse(transformString);
        if (parsed.error) throw new Error(parsed.message);
        const transforms = Array.isArray(parsed[0]) ? parsed.flat() : parsed;
        const cssTransform = transformsToString(transforms);

        const StyledDiv = styledEmotion.div`
          transform: ${cssTransform};
        `;

        return StyledDiv;
      }).not.toThrow();
    });


  });

  describe('aphrodite', () => {
    test('should parse and use in aphrodite translate', () => {
      expect(() => {
        const transformString = 'translate(10px)';
        const parsed = parser.parse(transformString);
        if (parsed.error) throw new Error(parsed.message);
        const transforms = Array.isArray(parsed[0]) ? parsed.flat() : parsed;
        const cssTransform = transformsToString(transforms);

        const styles = StyleSheet.create({
          myStyle: {
            transform: cssTransform,
            width: '100px',
            height: '100px',
            background: 'green'
          }
        });

        expect(styles.myStyle).toBeDefined();
      }).not.toThrow();
    });

    test('should parse and use in aphrodite scale', () => {
      expect(() => {
        const transformString = 'scale(2)';
        const parsed = parser.parse(transformString);
        if (parsed.error) throw new Error(parsed.message);
        const transforms = Array.isArray(parsed[0]) ? parsed.flat() : parsed;
        const cssTransform = transformsToString(transforms);

        const styles = StyleSheet.create({
          myStyle: {
            transform: cssTransform
          }
        });

        expect(styles.myStyle).toBeDefined();
      }).not.toThrow();
    });
  });

  describe('glamor', () => {
    test('should parse and use in glamor translate', () => {
      expect(() => {
        const transformString = 'translate(10px)';
        const parsed = parser.parse(transformString);
        if (parsed.error) throw new Error(parsed.message);
        const transforms = Array.isArray(parsed[0]) ? parsed.flat() : parsed;
        const cssTransform = transformsToString(transforms);

        const style = glamorCss({
          transform: cssTransform,
          width: '100px',
          height: '100px',
          background: 'yellow'
        });

        expect(style).toBeDefined();
      }).not.toThrow();
    });

    test('should parse and use in glamor rotate', () => {
      expect(() => {
        const transformString = 'rotate(45deg)';
        const parsed = parser.parse(transformString);
        if (parsed.error) throw new Error(parsed.message);
        const transforms = Array.isArray(parsed[0]) ? parsed.flat() : parsed;
        const cssTransform = transformsToString(transforms);

        const style = glamorCss({
          transform: cssTransform
        });

        expect(style).toBeDefined();
      }).not.toThrow();
    });
  });

  describe('CSS Modules', () => {
    test('should parse and generate CSS for module', () => {
      const transformString = 'translate(10px)';
      const parsed = parser.parse(transformString);
      if (parsed.error) throw new Error(parsed.message);
      const transforms = Array.isArray(parsed[0]) ? parsed.flat() : parsed;
      const cssTransform = transformsToString(transforms);

      const cssContent = `
.myClass {
  transform: ${cssTransform};
}
      `.trim();

      expect(cssContent).toContain('transform:');
      expect(cssContent).toContain('translate(10px)');
    });
  });

});