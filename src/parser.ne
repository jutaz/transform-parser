@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace
@builtin "number.ne"     # `int`, `decimal`, and `percentage` number primitives

transformList -> (_ transformFunction):+ {% d => Array.isArray(d[0]) ? d[0].map((f) => f[1][0]) : null %}

transformFunction -> matrix | translate | translateX | translateY | scale | scaleX | scaleY | rotate | skew | skewX | skewY | matrix3d | translate3d | translateZ | scale3d | scaleZ | rotate3d | rotateX | rotateY | rotateZ | perspective {% d => d[0][0] %}

matrix -> "matrix"i _ "(" _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ ")" {%
     d => ({
         type: "matrix",
         matrix: [d[4][0], d[8][0], d[12][0], d[16][0], d[20][0], d[24][0]]
     })
%}

translate -> "translate"i _ "(" _ lengthPercentage _ (("," _ lengthPercentage _) | _) ")" {%
     d => ({
         type: "translate",
         x: d[4][0],
         y: d[6][0] !== null ? d[6][0][2][0] : null,
		 z: null
     })
%}

translateX -> "translateX"i _ "(" _ lengthPercentage _ ")" {%
     d => ({
         type: "translate",
         x: d[4][0],
		 y: null,
		 z: null
     })
%}

translateY -> "translateY"i _ "(" _ lengthPercentage _ ")" {%
     d => ({
         type: "translate",
		 x: null,
         y: d[4][0],
		 z: null
     })
%}

scale -> "scale"i _ "(" _ number (("," _ number _) | _) _ ")"  {%
     d => ({
         type: "scale",
         x: d[4],
         y: d[5][0] !== null ? d[5][0][2] : null,
		 z: null
     })
%}

scaleX -> "scaleX"i _ "(" _ number _ ")" {%
     d => ({
         type: "scale",
         x: d[4],
         y: null,
		 z: null
     })
%}

scaleY -> "scaleY"i _ "(" _ number _ ")" {%
     d => ({
         type: "scale",
         x: null,
         y: d[4],
		 z: null
     })
%}

rotate -> "rotate"i _ "(" _ angle _ ")" {%
     d => ({
         type: "rotate",
		 x: null,
         y: null,
		 z: d[4]
     })
%}

skew -> "skew"i _ "(" _ angle _ ("," _ angle _):?  ")" {%
     d => ({
         type: "skew",
		 x: d[4],
         y: d[6] !== null ? d[6][2] : null
     })
%}

skewX -> "skewX"i _ "(" _ angle _ ")" {%
     d => ({
         type: "skew",
		 x: d[4],
         y: null
     })
%}

skewY -> "skewY"i _ "(" _ angle _ ")"{%
     d => ({
         type: "skew",
		 x: null,
         y: d[4]
     })
%}

matrix3d -> "matrix3d"i _ "(" _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ "," _ number _ ")"

translate3d -> "translate3d" _ "(" _ lengthPercentage _ "," _ lengthPercentage _ "," _ length _ ")"

translateZ -> "translateZ" _ "(" _ lengthPercentage _ ")"  {%
     d => ({
         type: "translate",
		 x: null,
         y: null,
		 z: d[4][0]
     })
%}

scale3d -> "scale3d"i _ "(" _ number _ "," _ number _ "," _ number _ ")"

scaleZ -> "scaleZ"i _ "(" _ number _ ")" {%
     d => ({
         type: "scale",
         x: null,
         y: null,
		 z: d[4]
     })
%}

rotate3d -> "rotate3d"i _ "(" _ number _ "," _ number _ "," _ number _ "," _ angle _ ")"

rotateX -> "rotateX"i _ "(" _ angle _ ")" {%
     d => ({
         type: "rotate",
		 x: d[4],
         y: null,
		 z: null
     })
%}

rotateY -> "rotateY"i _ "(" _ angle _ ")" {%
     d => ({
         type: "rotate",
		 x: null,
         y: d[4],
		 z: null
     })
%}

rotateZ -> "rotateZ"i _ "(" _ angle _ ")" {%
     d => ({
         type: "rotate",
		 x: null,
         y: null,
		 z: d[4]
     })
%}

perspective -> "perspective"i _ "(" _ length _ ")" {%
     d => ({
         type: "perspective",
		 value: d[4][0]
     })
%}

# Units and data types

angle -> number (angleUnit):?  {% d => ({
	value: Array.isArray(d[0]) ? d[0][0] : d[0],
   unit: d[1] !== null ? d[1][0][0] : null // allow assuming default unit.
}) %}

angleUnit -> "deg" | "grad" | "rad" | "turn"

lengthPercentage -> length | percentage {% d => d[0] === null ? d[1] : d[0] %}

length -> number (absoluteLengthUnit | viewportPercentageLengthUnit | fontRelativeLengthUnit):? {% d => ({
	value: Array.isArray(d[0]) ? d[0][0] : d[0],
   unit: d[1] !== null ? d[1][0][0] : null // allow assuming default unit.
}) %}

absoluteLengthUnit -> "px" | "cm" | "mm" | "Q" | "in" | "pc" | "pt"

viewportPercentageLengthUnit -> "vh" | "vw" | "vi" | "vb" | "vmin" | "vmax"

fontRelativeLengthUnit -> "cap" | "ch" | "em" | "ex" | "ic" | "lh" | "rem" | "rlh"

number -> decimal {% d => d[0] %}
