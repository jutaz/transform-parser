/**
 * TypeScript definitions for the CSS Transform Parser.
 *
 * This module provides functionality to parse CSS transform strings into structured objects.
 */

/**
 * Represents a length or percentage value with its unit.
 */
export interface LengthPercentage {
  /** The numeric value. */
  value: number;
  /** The unit (e.g., 'px', '%', 'em') or null if no unit is specified. */
  unit: string | null;
}

/**
 * Represents an angle value with its unit.
 */
export interface Angle {
  /** The numeric value. */
  value: number;
  /** The unit (e.g., 'deg', 'rad', 'grad', 'turn') or null if no unit is specified. */
  unit: string | null;
}

/**
 * Represents a 2D matrix transformation.
 */
export interface MatrixTransform {
  /** The type of transformation. */
  type: "matrix";
  /** The 6-element transformation matrix [a, b, c, d, e, f]. */
  matrix: [number, number, number, number, number, number];
}

/**
 * Represents a translation transformation.
 */
export interface TranslateTransform {
  /** The type of transformation. */
  type: "translate";
  /** The x-axis translation value or null. */
  x: LengthPercentage | null;
  /** The y-axis translation value or null. */
  y: LengthPercentage | null;
  /** The z-axis translation value or null. */
  z: LengthPercentage | null;
}

/**
 * Represents a scaling transformation.
 */
export interface ScaleTransform {
  /** The type of transformation. */
  type: "scale";
  /** The x-axis scale factor or null. */
  x: number | null;
  /** The y-axis scale factor or null. */
  y: number | null;
  /** The z-axis scale factor or null. */
  z: number | null;
}

/**
 * Represents a rotation transformation.
 */
export interface RotateTransform {
  /** The type of transformation. */
  type: "rotate";
  /** The x-axis rotation angle or null. */
  x: Angle | null;
  /** The y-axis rotation angle or null. */
  y: Angle | null;
  /** The z-axis rotation angle or null. */
  z: Angle | null;
}

/**
 * Represents a skew transformation.
 */
export interface SkewTransform {
  /** The type of transformation. */
  type: "skew";
  /** The x-axis skew angle or null. */
  x: Angle | null;
  /** The y-axis skew angle or null. */
  y: Angle | null;
}

/**
 * Represents a 3D matrix transformation.
 */
export interface Matrix3dTransform {
  /** The type of transformation. */
  type: "matrix3d";
  /** The 16-element transformation matrix. */
  matrix: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
}

/**
 * Represents a 3D rotation transformation.
 */
export interface Rotate3dTransform {
  /** The type of transformation. */
  type: "rotate3d";
  /** The x-component of the rotation axis. */
  x: number;
  /** The y-component of the rotation axis. */
  y: number;
  /** The z-component of the rotation axis. */
  z: number;
  /** The rotation angle. */
  angle: Angle;
}

/**
 * Represents a perspective transformation.
 */
export interface PerspectiveTransform {
  /** The type of transformation. */
  type: "perspective";
  /** The perspective distance. */
  value: LengthPercentage;
}

/**
 * Union type representing any transformation.
 */
export type Transform =
  | MatrixTransform
  | TranslateTransform
  | ScaleTransform
  | RotateTransform
  | SkewTransform
  | Matrix3dTransform
  | Rotate3dTransform
  | PerspectiveTransform;

/**
 * Represents an error result from parsing.
 */
export interface ErrorResult {
  /** Indicates that an error occurred. */
  error: true;
  /** The error message. */
  message: string;
}

/**
 * Parses a CSS transform string into an array of transformation objects.
 *
 * @param attribute - The CSS transform string to parse (e.g., "translate(10px, 20px) rotate(45deg)").
 * @returns An array of Transform objects if parsing succeeds, or an ErrorResult if parsing fails.
 *
 * @example
 * ```typescript
 * import { parse } from 'transform-parser';
 *
 * const result = parse('translate(10px, 20px) scale(2)');
 * if ('error' in result) {
 *   console.error(result.message);
 * } else {
 *   console.log(result); // Array of Transform objects
 * }
 * ```
 */
export function parse(attribute: string): Transform[] | ErrorResult;