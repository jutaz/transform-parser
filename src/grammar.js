// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "transformList$ebnf$1", "symbols": []},
    {"name": "transformList$ebnf$1$subexpression$1", "symbols": ["_", "transformFunction"]},
    {"name": "transformList$ebnf$1", "symbols": ["transformList$ebnf$1", "transformList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "transformList", "symbols": ["transformFunction", "transformList$ebnf$1"], "postprocess": (d, location) => d[1] ? [d[0]].concat(d[1].map(x => x[1])) : [d[0]]},
    {"name": "transformFunction", "symbols": ["matrix"]},
    {"name": "transformFunction", "symbols": ["matrix3d"]},
    {"name": "transformFunction", "symbols": ["translate3d"]},
    {"name": "transformFunction", "symbols": ["translate"]},
    {"name": "transformFunction", "symbols": ["translateX"]},
    {"name": "transformFunction", "symbols": ["translateY"]},
    {"name": "transformFunction", "symbols": ["translateZ"]},
    {"name": "transformFunction", "symbols": ["scale3d"]},
    {"name": "transformFunction", "symbols": ["scale"]},
    {"name": "transformFunction", "symbols": ["scaleX"]},
    {"name": "transformFunction", "symbols": ["scaleY"]},
    {"name": "transformFunction", "symbols": ["scaleZ"]},
    {"name": "transformFunction", "symbols": ["rotate3d"]},
    {"name": "transformFunction", "symbols": ["rotate"]},
    {"name": "transformFunction", "symbols": ["rotateX"]},
    {"name": "transformFunction", "symbols": ["rotateY"]},
    {"name": "transformFunction", "symbols": ["rotateZ"]},
    {"name": "transformFunction", "symbols": ["skew"]},
    {"name": "transformFunction", "symbols": ["skewX"]},
    {"name": "transformFunction", "symbols": ["skewY"]},
    {"name": "transformFunction", "symbols": ["perspective"], "postprocess": function(d) { return d; }},
    {"name": "matrix$subexpression$1", "symbols": [/[mM]/, /[aA]/, /[tT]/, /[rR]/, /[iI]/, /[xX]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "matrix", "symbols": ["matrix$subexpression$1", {"literal":"("}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":")"}], "postprocess": 
        (d, location) => ({
            type: "matrix",
            matrix: [d[3], d[7], d[11], d[15], d[19], d[23]],
            location
        })
        },
    {"name": "translate$subexpression$1", "symbols": [/[tT]/, /[rR]/, /[aA]/, /[nN]/, /[sS]/, /[lL]/, /[aA]/, /[tT]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "translate$subexpression$2$subexpression$1", "symbols": [{"literal":","}, "_", "lengthPercentage", "_"]},
    {"name": "translate$subexpression$2", "symbols": ["translate$subexpression$2$subexpression$1"]},
    {"name": "translate$subexpression$2", "symbols": []},
    {"name": "translate", "symbols": ["translate$subexpression$1", {"literal":"("}, "_", "lengthPercentage", "_", "translate$subexpression$2", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "translate",
                 x: d[3],
                 y: d[5] !== null ? d[5][2] : null,
        z: null,
                 location
             })
        },
    {"name": "translateX$subexpression$1", "symbols": [/[tT]/, /[rR]/, /[aA]/, /[nN]/, /[sS]/, /[lL]/, /[aA]/, /[tT]/, /[eE]/, /[xX]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "translateX", "symbols": ["translateX$subexpression$1", {"literal":"("}, "_", "lengthPercentage", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "translate",
                 x: d[3],
        y: null,
        z: null,
                 location
             })
        },
    {"name": "translateY$subexpression$1", "symbols": [/[tT]/, /[rR]/, /[aA]/, /[nN]/, /[sS]/, /[lL]/, /[aA]/, /[tT]/, /[eE]/, /[yY]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "translateY", "symbols": ["translateY$subexpression$1", {"literal":"("}, "_", "lengthPercentage", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "translate",
        x: null,
                 y: d[3],
        z: null,
                 location
             })
        },
    {"name": "scale$subexpression$1", "symbols": [/[sS]/, /[cC]/, /[aA]/, /[lL]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "scale$subexpression$2$subexpression$1", "symbols": [{"literal":","}, "_", "scaleNumber", "_"]},
    {"name": "scale$subexpression$2", "symbols": ["scale$subexpression$2$subexpression$1"]},
    {"name": "scale$subexpression$2", "symbols": []},
    {"name": "scale", "symbols": ["scale$subexpression$1", {"literal":"("}, "_", "scaleNumber", "_", "scale$subexpression$2", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "scale",
                 x: d[3],
                 y: d[5] !== null ? d[5][2] : null,
        z: null,
                 location
             })
        },
    {"name": "scaleX$subexpression$1", "symbols": [/[sS]/, /[cC]/, /[aA]/, /[lL]/, /[eE]/, /[xX]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "scaleX", "symbols": ["scaleX$subexpression$1", {"literal":"("}, "_", "scaleNumber", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "scale",
                 x: d[3],
                 y: null,
        z: null,
                 location
             })
        },
    {"name": "scaleY$subexpression$1", "symbols": [/[sS]/, /[cC]/, /[aA]/, /[lL]/, /[eE]/, /[yY]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "scaleY", "symbols": ["scaleY$subexpression$1", {"literal":"("}, "_", "scaleNumber", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "scale",
                 x: null,
                 y: d[3],
        z: null,
                 location
             })
        },
    {"name": "rotate$subexpression$1", "symbols": [/[rR]/, /[oO]/, /[tT]/, /[aA]/, /[tT]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rotate", "symbols": ["rotate$subexpression$1", {"literal":"("}, "_", "axis", "_", "angle", "_", {"literal":")"}], "postprocess": 
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
        },
    {"name": "rotate$subexpression$2", "symbols": [/[rR]/, /[oO]/, /[tT]/, /[aA]/, /[tT]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rotate", "symbols": ["rotate$subexpression$2", {"literal":"("}, "_", "angle", "_", {"literal":")"}], "postprocess": 
        (d, location) => ({
            type: "rotate",
            x: null,
            y: null,
            z: d[3],
            location
        })
        },
    {"name": "skew$subexpression$1", "symbols": [/[sS]/, /[kK]/, /[eE]/, /[wW]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "skew$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "angle", "_"]},
    {"name": "skew$ebnf$1", "symbols": ["skew$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "skew$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "skew", "symbols": ["skew$subexpression$1", {"literal":"("}, "_", "angle", "_", "skew$ebnf$1", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "skew",
        x: d[3],
                 y: d[5] !== null ? d[5][2] : null,
                 location
             })
        },
    {"name": "skewX$subexpression$1", "symbols": [/[sS]/, /[kK]/, /[eE]/, /[wW]/, /[xX]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "skewX", "symbols": ["skewX$subexpression$1", {"literal":"("}, "_", "angle", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "skew",
        x: d[3],
                 y: null,
                 location
             })
        },
    {"name": "skewY$subexpression$1", "symbols": [/[sS]/, /[kK]/, /[eE]/, /[wW]/, /[yY]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "skewY", "symbols": ["skewY$subexpression$1", {"literal":"("}, "_", "angle", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "skew",
        x: null,
                 y: d[3],
                 location
             })
        },
    {"name": "matrix3d$subexpression$1", "symbols": [/[mM]/, /[aA]/, /[tT]/, /[rR]/, /[iI]/, /[xX]/, {"literal":"3"}, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "matrix3d", "symbols": ["matrix3d$subexpression$1", {"literal":"("}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":")"}], "postprocess": 
        (d, location) => ({
            type: "matrix3d",
            matrix: [d[3], d[7], d[11], d[15], d[19], d[23], d[27], d[31], d[35], d[39], d[43], d[47], d[51], d[55], d[59], d[63]],
            location
        })
        },
    {"name": "translate3d$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"a"}, {"literal":"n"}, {"literal":"s"}, {"literal":"l"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"3"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "translate3d", "symbols": ["translate3d$string$1", {"literal":"("}, "_", "lengthPercentage", "_", {"literal":","}, "_", "lengthPercentage", "_", {"literal":","}, "_", "length", "_", {"literal":")"}], "postprocess": 
        (d, location) => ({
            type: "translate",
            x: d[3],
            y: d[7],
            z: d[11],
            location
        })
        },
    {"name": "translateZ$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"a"}, {"literal":"n"}, {"literal":"s"}, {"literal":"l"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"Z"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "translateZ", "symbols": ["translateZ$string$1", {"literal":"("}, "_", "lengthPercentage", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "translate",
        x: null,
                 y: null,
        z: d[3],
                 location
             })
        },
    {"name": "scale3d$subexpression$1", "symbols": [/[sS]/, /[cC]/, /[aA]/, /[lL]/, /[eE]/, {"literal":"3"}, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "scale3d", "symbols": ["scale3d$subexpression$1", {"literal":"("}, "_", "scaleNumber", "_", {"literal":","}, "_", "scaleNumber", "_", {"literal":","}, "_", "scaleNumber", "_", {"literal":")"}], "postprocess": 
        (d, location) => ({
            type: "scale",
            x: d[3],
            y: d[7],
            z: d[11],
            location
        })
        },
    {"name": "scale3d$subexpression$2", "symbols": [/[sS]/, /[cC]/, /[aA]/, /[lL]/, /[eE]/, {"literal":"3"}, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "scale3d", "symbols": ["scale3d$subexpression$2", {"literal":"("}, "_", "scaleNumber", "_", {"literal":","}, "_", "scaleNumber", "_", {"literal":","}, "_", "scaleNumber", "_", {"literal":")"}], "postprocess": 
        (d, location) => ({
            type: "scale",
            x: d[3],
            y: d[7],
            z: d[11],
            location
        })
        },
    {"name": "scaleZ$subexpression$1", "symbols": [/[sS]/, /[cC]/, /[aA]/, /[lL]/, /[eE]/, /[zZ]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "scaleZ", "symbols": ["scaleZ$subexpression$1", {"literal":"("}, "_", "scaleNumber", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "scale",
                 x: null,
                 y: null,
        z: d[3],
                 location
             })
        },
    {"name": "rotate3d$subexpression$1", "symbols": [/[rR]/, /[oO]/, /[tT]/, /[aA]/, /[tT]/, /[eE]/, {"literal":"3"}, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rotate3d", "symbols": ["rotate3d$subexpression$1", {"literal":"("}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "number", "_", {"literal":","}, "_", "angle", "_", {"literal":")"}], "postprocess": 
        (d, location) => ({
            type: "rotate3d",
            x: d[3],
            y: d[7],
            z: d[11],
            angle: d[15],
            location
        })
        },
    {"name": "rotateX$subexpression$1", "symbols": [/[rR]/, /[oO]/, /[tT]/, /[aA]/, /[tT]/, /[eE]/, /[xX]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rotateX", "symbols": ["rotateX$subexpression$1", {"literal":"("}, "_", "angle", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "rotate",
        x: d[3],
                 y: null,
        z: null,
                 location
             })
        },
    {"name": "rotateY$subexpression$1", "symbols": [/[rR]/, /[oO]/, /[tT]/, /[aA]/, /[tT]/, /[eE]/, /[yY]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rotateY", "symbols": ["rotateY$subexpression$1", {"literal":"("}, "_", "angle", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "rotate",
        x: null,
                 y: d[3],
        z: null,
                 location
             })
        },
    {"name": "rotateZ$subexpression$1", "symbols": [/[rR]/, /[oO]/, /[tT]/, /[aA]/, /[tT]/, /[eE]/, /[zZ]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "rotateZ", "symbols": ["rotateZ$subexpression$1", {"literal":"("}, "_", "angle", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "rotate",
        x: null,
                 y: null,
        z: d[3],
                 location
             })
        },
    {"name": "perspective$subexpression$1", "symbols": [/[pP]/, /[eE]/, /[rR]/, /[sS]/, /[pP]/, /[eE]/, /[cC]/, /[tT]/, /[iI]/, /[vV]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "perspective$subexpression$2", "symbols": ["length"]},
    {"name": "perspective$subexpression$2$subexpression$1", "symbols": [/[nN]/, /[oO]/, /[nN]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "perspective$subexpression$2", "symbols": ["perspective$subexpression$2$subexpression$1"]},
    {"name": "perspective", "symbols": ["perspective$subexpression$1", {"literal":"("}, "_", "perspective$subexpression$2", "_", {"literal":")"}], "postprocess": 
             (d, location) => ({
                 type: "perspective",
        value: d[3] === "none" ? "none" : d[3],
                 location
             })
        },
    {"name": "axis$subexpression$1", "symbols": [/[xX]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "axis", "symbols": ["axis$subexpression$1"]},
    {"name": "axis$subexpression$2", "symbols": [/[yY]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "axis", "symbols": ["axis$subexpression$2"]},
    {"name": "axis$subexpression$3", "symbols": [/[zZ]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "axis", "symbols": ["axis$subexpression$3"]},
    {"name": "scaleNumber", "symbols": ["number"], "postprocess": d => Array.isArray(d[0]) ? d[0][0] : d[0]},
    {"name": "scaleNumber", "symbols": ["percentage"], "postprocess": d => d[0]},
    {"name": "angle$ebnf$1$subexpression$1", "symbols": ["angleUnit"]},
    {"name": "angle$ebnf$1", "symbols": ["angle$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "angle$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "angle", "symbols": ["number", "angle$ebnf$1"], "postprocess":  (d, location) => ({
        	value: Array.isArray(d[0]) ? d[0][0] : d[0],
           unit: d[1] !== null ? d[1] : null,
           location
        }) },
    {"name": "angleUnit$string$1", "symbols": [{"literal":"d"}, {"literal":"e"}, {"literal":"g"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "angleUnit", "symbols": ["angleUnit$string$1"]},
    {"name": "angleUnit$string$2", "symbols": [{"literal":"g"}, {"literal":"r"}, {"literal":"a"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "angleUnit", "symbols": ["angleUnit$string$2"]},
    {"name": "angleUnit$string$3", "symbols": [{"literal":"r"}, {"literal":"a"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "angleUnit", "symbols": ["angleUnit$string$3"]},
    {"name": "angleUnit$string$4", "symbols": [{"literal":"t"}, {"literal":"u"}, {"literal":"r"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "angleUnit", "symbols": ["angleUnit$string$4"]},
    {"name": "lengthPercentage", "symbols": ["length"]},
    {"name": "lengthPercentage", "symbols": ["percentage"], "postprocess": d => d[0] === null ? d[1] : d[0]},
    {"name": "length$ebnf$1$subexpression$1", "symbols": ["absoluteLengthUnit"]},
    {"name": "length$ebnf$1$subexpression$1", "symbols": ["viewportPercentageLengthUnit"]},
    {"name": "length$ebnf$1$subexpression$1", "symbols": ["fontRelativeLengthUnit"]},
    {"name": "length$ebnf$1", "symbols": ["length$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "length$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "length", "symbols": ["number", "length$ebnf$1"], "postprocess":  (d, location) => ({
        	value: Array.isArray(d[0]) ? d[0][0] : d[0],
           unit: d[1] !== null ? d[1] : null,
           location
        }) },
    {"name": "absoluteLengthUnit$string$1", "symbols": [{"literal":"p"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "absoluteLengthUnit", "symbols": ["absoluteLengthUnit$string$1"]},
    {"name": "absoluteLengthUnit$string$2", "symbols": [{"literal":"c"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "absoluteLengthUnit", "symbols": ["absoluteLengthUnit$string$2"]},
    {"name": "absoluteLengthUnit$string$3", "symbols": [{"literal":"m"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "absoluteLengthUnit", "symbols": ["absoluteLengthUnit$string$3"]},
    {"name": "absoluteLengthUnit", "symbols": [{"literal":"Q"}]},
    {"name": "absoluteLengthUnit$string$4", "symbols": [{"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "absoluteLengthUnit", "symbols": ["absoluteLengthUnit$string$4"]},
    {"name": "absoluteLengthUnit$string$5", "symbols": [{"literal":"p"}, {"literal":"c"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "absoluteLengthUnit", "symbols": ["absoluteLengthUnit$string$5"]},
    {"name": "absoluteLengthUnit$string$6", "symbols": [{"literal":"p"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "absoluteLengthUnit", "symbols": ["absoluteLengthUnit$string$6"]},
    {"name": "viewportPercentageLengthUnit$string$1", "symbols": [{"literal":"v"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "viewportPercentageLengthUnit", "symbols": ["viewportPercentageLengthUnit$string$1"]},
    {"name": "viewportPercentageLengthUnit$string$2", "symbols": [{"literal":"v"}, {"literal":"w"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "viewportPercentageLengthUnit", "symbols": ["viewportPercentageLengthUnit$string$2"]},
    {"name": "viewportPercentageLengthUnit$string$3", "symbols": [{"literal":"v"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "viewportPercentageLengthUnit", "symbols": ["viewportPercentageLengthUnit$string$3"]},
    {"name": "viewportPercentageLengthUnit$string$4", "symbols": [{"literal":"v"}, {"literal":"b"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "viewportPercentageLengthUnit", "symbols": ["viewportPercentageLengthUnit$string$4"]},
    {"name": "viewportPercentageLengthUnit$string$5", "symbols": [{"literal":"v"}, {"literal":"m"}, {"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "viewportPercentageLengthUnit", "symbols": ["viewportPercentageLengthUnit$string$5"]},
    {"name": "viewportPercentageLengthUnit$string$6", "symbols": [{"literal":"v"}, {"literal":"m"}, {"literal":"a"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "viewportPercentageLengthUnit", "symbols": ["viewportPercentageLengthUnit$string$6"]},
    {"name": "fontRelativeLengthUnit$string$1", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fontRelativeLengthUnit", "symbols": ["fontRelativeLengthUnit$string$1"]},
    {"name": "fontRelativeLengthUnit$string$2", "symbols": [{"literal":"c"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fontRelativeLengthUnit", "symbols": ["fontRelativeLengthUnit$string$2"]},
    {"name": "fontRelativeLengthUnit$string$3", "symbols": [{"literal":"e"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fontRelativeLengthUnit", "symbols": ["fontRelativeLengthUnit$string$3"]},
    {"name": "fontRelativeLengthUnit$string$4", "symbols": [{"literal":"e"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fontRelativeLengthUnit", "symbols": ["fontRelativeLengthUnit$string$4"]},
    {"name": "fontRelativeLengthUnit$string$5", "symbols": [{"literal":"i"}, {"literal":"c"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fontRelativeLengthUnit", "symbols": ["fontRelativeLengthUnit$string$5"]},
    {"name": "fontRelativeLengthUnit$string$6", "symbols": [{"literal":"l"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fontRelativeLengthUnit", "symbols": ["fontRelativeLengthUnit$string$6"]},
    {"name": "fontRelativeLengthUnit$string$7", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fontRelativeLengthUnit", "symbols": ["fontRelativeLengthUnit$string$7"]},
    {"name": "fontRelativeLengthUnit$string$8", "symbols": [{"literal":"r"}, {"literal":"l"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fontRelativeLengthUnit", "symbols": ["fontRelativeLengthUnit$string$8"]},
    {"name": "number", "symbols": ["decimal"], "postprocess": d => d[0]}
]
  , ParserStart: "transformList"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
