@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace
@builtin "number.ne"     # `int`, `decimal`, and `percentage` number primitives

transformList -> transformFunction (_ transformFunction ):* {% (d, location) => d[1] ? [d[0]].concat(d[1].map(x => x[1])) : [d[0]] %}

transformFunction -> matrix | matrix3d | translate3d | translate | translateX | translateY | translateZ | scale3d | scale | scaleX | scaleY | scaleZ | rotate3d | rotate | rotateX | rotateY | rotateZ | skew | skewX | skewY | perspective {% function(d) { return d; } %}

matrix -> "matrix"i "(" _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ ")" {%
     (d, location) => ({
         type: "matrix",
         matrix: [d[3], d[7], d[11], d[15], d[19], d[23]],
         location
     })
%}

translate -> "translate"i "(" _ lengthPercentage _ (("," _ lengthPercentage _ ) | null) _ ")" {%
     (d, location) => ({
         type: "translate",
         x: d[3],
         y: d[5] !== null ? d[5][2] : null,
		 z: null,
         location
     })
%}

translateX -> "translateX"i "(" _ lengthPercentage _ ")" {%
     (d, location) => ({
         type: "translate",
         x: d[3],
		 y: null,
		 z: null,
         location
     })
%}

translateY -> "translateY"i "(" _ lengthPercentage _ ")" {%
     (d, location) => ({
         type: "translate",
		 x: null,
         y: d[3],
		 z: null,
         location
     })
%}

scale -> "scale"i "(" _ scaleNumber _ (("," _ scaleNumber _ ) | null) _ ")"  {%
     (d, location) => ({
         type: "scale",
         x: d[3],
         y: d[5] !== null ? d[5][2] : null,
		 z: null,
         location
     })
%}

scaleX -> "scaleX"i "(" _ scaleNumber _ ")" {%
     (d, location) => ({
         type: "scale",
         x: d[3],
         y: null,
		 z: null,
         location
     })
%}

scaleY -> "scaleY"i "(" _ scaleNumber _ ")" {%
     (d, location) => ({
         type: "scale",
         x: null,
         y: d[3],
		 z: null,
         location
     })
%}

rotate -> "rotate"i "(" _ axis _ angle _ ")" {%
     (d, location) => {
         let axis = d[3];
         let angle = d[5];
         return {
             type: "rotate",
             x: axis === 'x' ? angle : null,
             y: axis === 'y' ? angle : null,
             z: axis === 'z' ? angle : null,
             location
         };
     }
%}
 | "rotate"i "(" _ angle _ ")" {%
     (d, location) => ({
         type: "rotate",
         x: null,
         y: null,
         z: d[3],
         location
     })
%}

skew -> "skew"i "(" _ angle _ ("," _ angle _ ):? _ ")" {%
     (d, location) => ({
         type: "skew",
		 x: d[3],
         y: d[5] !== null ? d[5][2] : null,
         location
     })
%}

skewX -> "skewX"i "(" _ angle _ ")" {%
     (d, location) => ({
         type: "skew",
		 x: d[3],
         y: null,
         location
     })
%}

skewY -> "skewY"i "(" _ angle _ ")"{%
     (d, location) => ({
         type: "skew",
		 x: null,
         y: d[3],
         location
     })
%}

matrix3d -> "matrix3d"i "(" _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ ")" {%
     (d, location) => ({
         type: "matrix3d",
         matrix: [d[3], d[7], d[11], d[15], d[19], d[23], d[27], d[31], d[35], d[39], d[43], d[47], d[51], d[55], d[59], d[63]],
         location
     })
%}

translate3d -> "translate3d" "(" _ lengthPercentage _ "," _ lengthPercentage _ "," _ length _ ")" {%
     (d, location) => ({
         type: "translate",
         x: d[3],
         y: d[7],
         z: d[11],
         location
     })
%}

translateZ -> "translateZ" "(" _ lengthPercentage _ ")"  {%
     (d, location) => ({
         type: "translate",
		 x: null,
         y: null,
		 z: d[3],
         location
     })
%}

scale3d -> "scale3d"i "(" _ scaleNumber _ "," _ scaleNumber _ "," _ scaleNumber _ ")" {%
     (d, location) => ({
         type: "scale",
         x: d[3],
         y: d[7],
         z: d[11],
         location
     })
%}

scale3d -> "scale3d"i "(" _ scaleNumber _ "," _ scaleNumber _ "," _ scaleNumber _ ")" {%
     (d, location) => ({
         type: "scale",
         x: d[3],
         y: d[7],
         z: d[11],
         location
     })
%}

scaleZ -> "scaleZ"i "(" _ scaleNumber _ ")" {%
     (d, location) => ({
         type: "scale",
         x: null,
         y: null,
		 z: d[3],
         location
     })
%}

rotate3d -> "rotate3d"i "(" _ number _ "," _ number _ "," _ number _ "," _ angle _ ")" {%
     (d, location) => ({
         type: "rotate3d",
         x: d[3],
         y: d[7],
         z: d[11],
         angle: d[15],
         location
     })
%}

rotateX -> "rotateX"i "(" _ angle _ ")" {%
     (d, location) => ({
         type: "rotate",
		 x: d[3],
         y: null,
		 z: null,
         location
     })
%}

rotateY -> "rotateY"i "(" _ angle _ ")" {%
     (d, location) => ({
         type: "rotate",
		 x: null,
         y: d[3],
		 z: null,
         location
     })
%}

rotateZ -> "rotateZ"i "(" _ angle _ ")" {%
     (d, location) => ({
         type: "rotate",
		 x: null,
         y: null,
		 z: d[3],
         location
     })
%}

perspective -> "perspective"i "(" _ (length | "none"i) _ ")" {%
     (d, location) => ({
         type: "perspective",
		 value: d[3] === "none" ? "none" : d[3],
         location
     })
%}

axis -> "x"i | "y"i | "z"i

scaleNumber -> number {% d => Array.isArray(d[0]) ? d[0][0] : d[0] %} | percentage {% d => d[0] %}

# Units and data types

angle -> number (angleUnit):?  {% (d, location) => ({
	value: Array.isArray(d[0]) ? d[0][0] : d[0],
   unit: d[1] !== null ? d[1] : null,
   location
}) %}

angleUnit -> "deg" | "grad" | "rad" | "turn"

lengthPercentage -> length | percentage {% d => d[0] === null ? d[1] : d[0] %}

length -> number (absoluteLengthUnit | viewportPercentageLengthUnit | fontRelativeLengthUnit):? {% (d, location) => ({
	value: Array.isArray(d[0]) ? d[0][0] : d[0],
   unit: d[1] !== null ? d[1] : null,
   location
}) %}

absoluteLengthUnit -> "px" | "cm" | "mm" | "Q" | "in" | "pc" | "pt"

viewportPercentageLengthUnit -> "vh" | "vw" | "vi" | "vb" | "vmin" | "vmax"

fontRelativeLengthUnit -> "cap" | "ch" | "em" | "ex" | "ic" | "lh" | "rem" | "rlh"

number -> decimal {% d => d[0] %}