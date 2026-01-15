const React = require('react');
const TestRenderer = require('react-test-renderer');
const styled = require('styled-components').default;
const { css } = require('@emotion/react');
const styledEmotion = require('@emotion/styled').default;
const parser = require('./index');

// Helper function to convert parsed transform array to CSS string
function transformsToString(transforms) {
  return transforms.map(transform => {
    switch (transform.type) {
      case 'translate':
        const x = transform.x ? (Array.isArray(transform.x) ? transform.x.map(v => v.value + (v.unit || '')).join(' ') : transform.x) : '0';
        const y = transform.y ? (Array.isArray(transform.y) ? transform.y.map(v => v.value + (v.unit || '')).join(' ') : transform.y) : '0';
        const z = transform.z ? (typeof transform.z === 'object' ? transform.z.value + transform.z.unit : transform.z) : null;
        return `translate(${x}${z ? ', ' + z : ''})`;
      case 'scale':
        const sx = transform.x !== null ? transform.x : 1;
        const sy = transform.y !== null ? transform.y : sx;
        const sz = transform.z !== null ? transform.z : null;
        return `scale(${sx}${sz ? ', ' + sy + ', ' + sz : sy !== sx ? ', ' + sy : ''})`;
      case 'rotate':
        const axis = transform.x ? 'x ' : transform.y ? 'y ' : transform.z ? 'z ' : '';
        const angle = transform.x ? transform.x : transform.y ? transform.y : transform.z;
        return `rotate(${axis}${angle.value}${angle.unit || ''})`;
      // Add more cases as needed for other transform types
      default:
        return ''; // Skip unknown
    }
  }).join(' ');
}

describe('Integration tests with CSS-in-JS libraries', () => {
  describe('styled-components', () => {
    test('should apply parsed translate transform to styled component', () => {
      const transformString = 'translate(10px, 20px)';
      const parsed = parser.parse(transformString);
      const cssTransform = transformsToString(parsed);

      const StyledDiv = styled.div`
        transform: ${cssTransform};
        width: 100px;
        height: 100px;
        background: red;
      `;

      const component = TestRenderer.create(<StyledDiv />);
      const tree = component.toJSON();
      expect(tree.props.style.transform).toBe('translate(10px, 20px)');
    });

    test('should apply parsed scale transform to styled component', () => {
      const transformString = 'scale(2, 0.5)';
      const parsed = parser.parse(transformString);
      const cssTransform = transformsToString(parsed);

      const StyledDiv = styled.div`
        transform: ${cssTransform};
      `;

      const component = TestRenderer.create(<StyledDiv />);
      const tree = component.toJSON();
      expect(tree.props.style.transform).toBe('scale(2, 0.5)');
    });

    test('should apply multiple parsed transforms to styled component', () => {
      const transformString = 'translate(10px, 20px) scale(2)';
      const parsed = parser.parse(transformString);
      const cssTransform = transformsToString(parsed);

      const StyledDiv = styled.div`
        transform: ${cssTransform};
      `;

      const component = TestRenderer.create(<StyledDiv />);
      const tree = component.toJSON();
      expect(tree.props.style.transform).toBe('translate(10px, 20px) scale(2)');
    });
  });

  describe('@emotion/styled', () => {
    test('should apply parsed translate transform to emotion styled component', () => {
      const transformString = 'translate(10px, 20px)';
      const parsed = parser.parse(transformString);
      const cssTransform = transformsToString(parsed);

      const StyledDiv = styledEmotion.div`
        transform: ${cssTransform};
        width: 100px;
        height: 100px;
        background: blue;
      `;

      const component = TestRenderer.create(<StyledDiv />);
      const tree = component.toJSON();
      expect(tree.props.style.transform).toBe('translate(10px, 20px)');
    });

    test('should apply parsed rotate transform to emotion styled component', () => {
      const transformString = 'rotate(45deg)';
      const parsed = parser.parse(transformString);
      const cssTransform = transformsToString(parsed);

      const StyledDiv = styledEmotion.div`
        transform: ${cssTransform};
      `;

      const component = TestRenderer.create(<StyledDiv />);
      const tree = component.toJSON();
      expect(tree.props.style.transform).toBe('rotate(45deg)');
    });

    test('should apply multiple parsed transforms to emotion styled component', () => {
      const transformString = 'translate(5px, 10px) rotate(30deg) scale(1.5)';
      const parsed = parser.parse(transformString);
      const cssTransform = transformsToString(parsed);

      const StyledDiv = styledEmotion.div`
        transform: ${cssTransform};
      `;

      const component = TestRenderer.create(<StyledDiv />);
      const tree = component.toJSON();
      expect(tree.props.style.transform).toBe('translate(5px, 10px) rotate(30deg) scale(1.5)');
    });
  });
});