// Generated automatically by nearley, version undefined
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["wschar", "_$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["wschar", "__$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/, "unsigned_int$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
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
    {"name": "int$ebnf$2", "symbols": [/[0-9]/, "int$ebnf$2"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
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
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/, "unsigned_decimal$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
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
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/, "decimal$ebnf$2"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/, "decimal$ebnf$3$subexpression$1$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
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
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/, "jsonfloat$ebnf$2"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$2"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
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
    {"name": "transformList$ebnf$1$subexpression$1", "symbols": ["_", "transformFunction"]},
    {"name": "transformList$ebnf$1", "symbols": ["transformList$ebnf$1$subexpression$1"]},
    {"name": "transformList$ebnf$1$subexpression$2", "symbols": ["_", "transformFunction"]},
    {"name": "transformList$ebnf$1", "symbols": ["transformList$ebnf$1$subexpression$2", "transformList$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "transformList", "symbols": ["transformList$ebnf$1"], "postprocess": d => Array.isArray(d[0]) ? d[0].map((f) => f[1][0]) : null},
    {"name": "transformFunction", "symbols": ["matrix"]},
    {"name": "transformFunction", "symbols": ["translate"]},
    {"name": "transformFunction", "symbols": ["translateX"]},
    {"name": "transformFunction", "symbols": ["translateY"]},
    {"name": "transformFunction", "symbols": ["scale"]},
    {"name": "transformFunction", "symbols": ["scaleX"]},
    {"name": "transformFunction", "symbols": ["scaleY"]},
    {"name": "transformFunction", "symbols": ["rotate"]},
    {"name": "transformFunction", "symbols": ["skew"]},
    {"name": "transformFunction", "symbols": ["skewX"]},
    {"name": "transformFunction", "symbols": ["skewY"]},
    {"name": "transformFunction", "symbols": ["matrix3d"]},
    {"name": "transformFunction", "symbols": ["translate3d"]},
    {"name": "transformFunction", "symbols": ["translateZ"]},
    {"name": "transformFunction", "symbols": ["scale3d"]},
    {"name": "transformFunction", "symbols": ["scaleZ"]},
    {"name": "transformFunction", "symbols": ["rotate3d"]},
    {"name": "transformFunction", "symbols": ["rotateX"]},
    {"name": "transformFunction", "symbols": ["rotateY"]},
    {"name": "transformFunction", "symbols": ["rotateZ"]},
    {"name": "transformFunction", "symbols": ["perspective"], "postprocess": d => d[0][0]},
    {"name": "matrix$subexpression$1", "symbols": [/[mM]/, /[aA]/, /[tT]/, /[rR]/, /[iI]/, /[xX]/], "postprocess": function (e){return e.join("")}},
    {"name": "matrix", "symbols": ["matrix$subexpression$1", "_", {"literal":"(","pos":122}, "_", "number", "_", {"literal":",","pos":130}, "_", "number", "_", {"literal":",","pos":138}, "_", "number", "_", {"literal":",","pos":146}, "_", "number", "_", {"literal":",","pos":154}, "_", "number", "_", {"literal":",","pos":162}, "_", "number", "_", {"literal":")","pos":170}], "postprocess": 
        d => ({
            type: "matrix",
            matrix: [d[4][0], d[8][0], d[12][0], d[16][0], d[20][0], d[24][0]]
        })
        },
    {"name": "translate$subexpression$1", "symbols": [/[tT]/, /[rR]/, /[aA]/, /[nN]/, /[sS]/, /[lL]/, /[aA]/, /[tT]/, /[eE]/], "postprocess": function (e){return e.join("")}},
    {"name": "translate$subexpression$2$subexpression$1", "symbols": [{"literal":",","pos":193}, "_", "lengthPercentage", "_"]},
    {"name": "translate$subexpression$2", "symbols": ["translate$subexpression$2$subexpression$1"]},
    {"name": "translate$subexpression$2", "symbols": ["_"]},
    {"name": "translate", "symbols": ["translate$subexpression$1", "_", {"literal":"(","pos":183}, "_", "lengthPercentage", "_", "translate$subexpression$2", {"literal":")","pos":207}], "postprocess": 
             d => ({
                 type: "translate",
                 x: d[4][0],
                 y: d[6][0] !== null ? d[6][0][2][0] : null,
        z: null
             })
        },
    {"name": "translateX$subexpression$1", "symbols": [/[tT]/, /[rR]/, /[aA]/, /[nN]/, /[sS]/, /[lL]/, /[aA]/, /[tT]/, /[eE]/, /[xX]/], "postprocess": function (e){return e.join("")}},
    {"name": "translateX", "symbols": ["translateX$subexpression$1", "_", {"literal":"(","pos":220}, "_", "lengthPercentage", "_", {"literal":")","pos":228}], "postprocess": 
             d => ({
                 type: "translate",
                 x: d[4][0],
        y: null,
        z: null
             })
        },
    {"name": "translateY$subexpression$1", "symbols": [/[tT]/, /[rR]/, /[aA]/, /[nN]/, /[sS]/, /[lL]/, /[aA]/, /[tT]/, /[eE]/, /[yY]/], "postprocess": function (e){return e.join("")}},
    {"name": "translateY", "symbols": ["translateY$subexpression$1", "_", {"literal":"(","pos":241}, "_", "lengthPercentage", "_", {"literal":")","pos":249}], "postprocess": 
             d => ({
                 type: "translate",
        x: null,
                 y: d[4][0],
        z: null
             })
        },
    {"name": "scale$subexpression$1", "symbols": [/[sS]/, /[cC]/, /[aA]/, /[lL]/, /[eE]/], "postprocess": function (e){return e.join("")}},
    {"name": "scale$subexpression$2$subexpression$1", "symbols": [{"literal":",","pos":270}, "_", "number", "_"]},
    {"name": "scale$subexpression$2", "symbols": ["scale$subexpression$2$subexpression$1"]},
    {"name": "scale$subexpression$2", "symbols": ["_"]},
    {"name": "scale", "symbols": ["scale$subexpression$1", "_", {"literal":"(","pos":262}, "_", "number", "scale$subexpression$2", "_", {"literal":")","pos":286}], "postprocess": 
             d => ({
                 type: "scale",
                 x: d[4],
                 y: d[5][0] !== null ? d[5][0][2] : null,
        z: null
             })
        },
    {"name": "scaleX$subexpression$1", "symbols": [/[sS]/, /[cC]/, /[aA]/, /[lL]/, /[eE]/, /[xX]/], "postprocess": function (e){return e.join("")}},
    {"name": "scaleX", "symbols": ["scaleX$subexpression$1", "_", {"literal":"(","pos":299}, "_", "number", "_", {"literal":")","pos":307}], "postprocess": 
             d => ({
                 type: "scale",
                 x: d[4],
                 y: null,
        z: null
             })
        },
    {"name": "scaleY$subexpression$1", "symbols": [/[sS]/, /[cC]/, /[aA]/, /[lL]/, /[eE]/, /[yY]/], "postprocess": function (e){return e.join("")}},
    {"name": "scaleY", "symbols": ["scaleY$subexpression$1", "_", {"literal":"(","pos":320}, "_", "number", "_", {"literal":")","pos":328}], "postprocess": 
             d => ({
                 type: "scale",
                 x: null,
                 y: d[4],
        z: null
             })
        },
    {"name": "rotate$subexpression$1", "symbols": [/[rR]/, /[oO]/, /[tT]/, /[aA]/, /[tT]/, /[eE]/], "postprocess": function (e){return e.join("")}},
    {"name": "rotate", "symbols": ["rotate$subexpression$1", "_", {"literal":"(","pos":341}, "_", "angle", "_", {"literal":")","pos":349}], "postprocess": 
             d => ({
                 type: "rotate",
        x: null,
                 y: null,
        z: d[4]
             })
        },
    {"name": "skew$subexpression$1", "symbols": [/[sS]/, /[kK]/, /[eE]/, /[wW]/], "postprocess": function (e){return e.join("")}},
    {"name": "skew$ebnf$1$subexpression$1", "symbols": [{"literal":",","pos":371}, "_", "angle", "_"]},
    {"name": "skew$ebnf$1", "symbols": ["skew$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "skew$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "skew", "symbols": ["skew$subexpression$1", "_", {"literal":"(","pos":362}, "_", "angle", "_", "skew$ebnf$1", {"literal":")","pos":381}], "postprocess": 
             d => ({
                 type: "skew",
        x: d[4],
                 y: d[6] !== null ? d[6][2] : null
             })
        },
    {"name": "skewX$subexpression$1", "symbols": [/[sS]/, /[kK]/, /[eE]/, /[wW]/, /[xX]/], "postprocess": function (e){return e.join("")}},
    {"name": "skewX", "symbols": ["skewX$subexpression$1", "_", {"literal":"(","pos":394}, "_", "angle", "_", {"literal":")","pos":402}], "postprocess": 
             d => ({
                 type: "skew",
        x: d[4],
                 y: null
             })
        },
    {"name": "skewY$subexpression$1", "symbols": [/[sS]/, /[kK]/, /[eE]/, /[wW]/, /[yY]/], "postprocess": function (e){return e.join("")}},
    {"name": "skewY", "symbols": ["skewY$subexpression$1", "_", {"literal":"(","pos":415}, "_", "angle", "_", {"literal":")","pos":423}], "postprocess": 
             d => ({
                 type: "skew",
        x: null,
                 y: d[4]
             })
        },
    {"name": "matrix3d$subexpression$1", "symbols": [/[mM]/, /[aA]/, /[tT]/, /[rR]/, /[iI]/, /[xX]/, {"literal":"3"}, /[dD]/], "postprocess": function (e){return e.join("")}},
    {"name": "matrix3d", "symbols": ["matrix3d$subexpression$1", "_", {"literal":"(","pos":435}, "_", "number", "_", {"literal":",","pos":443}, "_", "number", "_", {"literal":",","pos":451}, "_", "number", "_", {"literal":",","pos":459}, "_", "number", "_", {"literal":",","pos":467}, "_", "number", "_", {"literal":",","pos":475}, "_", "number", "_", {"literal":",","pos":483}, "_", "number", "_", {"literal":",","pos":491}, "_", "number", "_", {"literal":",","pos":499}, "_", "number", "_", {"literal":",","pos":507}, "_", "number", "_", {"literal":",","pos":515}, "_", "number", "_", {"literal":",","pos":523}, "_", "number", "_", {"literal":",","pos":531}, "_", "number", "_", {"literal":",","pos":539}, "_", "number", "_", {"literal":",","pos":547}, "_", "number", "_", {"literal":",","pos":555}, "_", "number", "_", {"literal":")","pos":563}]},
    {"name": "translate3d$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"a"}, {"literal":"n"}, {"literal":"s"}, {"literal":"l"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"3"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "translate3d", "symbols": ["translate3d$string$1", "_", {"literal":"(","pos":573}, "_", "lengthPercentage", "_", {"literal":",","pos":581}, "_", "lengthPercentage", "_", {"literal":",","pos":589}, "_", "length", "_", {"literal":")","pos":597}]},
    {"name": "translateZ$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"a"}, {"literal":"n"}, {"literal":"s"}, {"literal":"l"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"Z"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "translateZ", "symbols": ["translateZ$string$1", "_", {"literal":"(","pos":607}, "_", "lengthPercentage", "_", {"literal":")","pos":615}], "postprocess": 
             d => ({
                 type: "translate",
        x: null,
                 y: null,
        z: d[4][0]
             })
        },
    {"name": "scale3d$subexpression$1", "symbols": [/[sS]/, /[cC]/, /[aA]/, /[lL]/, /[eE]/, {"literal":"3"}, /[dD]/], "postprocess": function (e){return e.join("")}},
    {"name": "scale3d", "symbols": ["scale3d$subexpression$1", "_", {"literal":"(","pos":628}, "_", "number", "_", {"literal":",","pos":636}, "_", "number", "_", {"literal":",","pos":644}, "_", "number", "_", {"literal":")","pos":652}]},
    {"name": "scaleZ$subexpression$1", "symbols": [/[sS]/, /[cC]/, /[aA]/, /[lL]/, /[eE]/, /[zZ]/], "postprocess": function (e){return e.join("")}},
    {"name": "scaleZ", "symbols": ["scaleZ$subexpression$1", "_", {"literal":"(","pos":663}, "_", "number", "_", {"literal":")","pos":671}], "postprocess": 
             d => ({
                 type: "scale",
                 x: null,
                 y: null,
        z: d[4]
             })
        },
    {"name": "rotate3d$subexpression$1", "symbols": [/[rR]/, /[oO]/, /[tT]/, /[aA]/, /[tT]/, /[eE]/, {"literal":"3"}, /[dD]/], "postprocess": function (e){return e.join("")}},
    {"name": "rotate3d", "symbols": ["rotate3d$subexpression$1", "_", {"literal":"(","pos":684}, "_", "number", "_", {"literal":",","pos":692}, "_", "number", "_", {"literal":",","pos":700}, "_", "number", "_", {"literal":",","pos":708}, "_", "angle", "_", {"literal":")","pos":716}]},
    {"name": "rotateX$subexpression$1", "symbols": [/[rR]/, /[oO]/, /[tT]/, /[aA]/, /[tT]/, /[eE]/, /[xX]/], "postprocess": function (e){return e.join("")}},
    {"name": "rotateX", "symbols": ["rotateX$subexpression$1", "_", {"literal":"(","pos":727}, "_", "angle", "_", {"literal":")","pos":735}], "postprocess": 
             d => ({
                 type: "rotate",
        x: d[4],
                 y: null,
        z: null
             })
        },
    {"name": "rotateY$subexpression$1", "symbols": [/[rR]/, /[oO]/, /[tT]/, /[aA]/, /[tT]/, /[eE]/, /[yY]/], "postprocess": function (e){return e.join("")}},
    {"name": "rotateY", "symbols": ["rotateY$subexpression$1", "_", {"literal":"(","pos":748}, "_", "angle", "_", {"literal":")","pos":756}], "postprocess": 
             d => ({
                 type: "rotate",
        x: null,
                 y: d[4],
        z: null
             })
        },
    {"name": "rotateZ$subexpression$1", "symbols": [/[rR]/, /[oO]/, /[tT]/, /[aA]/, /[tT]/, /[eE]/, /[zZ]/], "postprocess": function (e){return e.join("")}},
    {"name": "rotateZ", "symbols": ["rotateZ$subexpression$1", "_", {"literal":"(","pos":769}, "_", "angle", "_", {"literal":")","pos":777}], "postprocess": 
             d => ({
                 type: "rotate",
        x: null,
                 y: null,
        z: d[4]
             })
        },
    {"name": "perspective$subexpression$1", "symbols": [/[pP]/, /[eE]/, /[rR]/, /[sS]/, /[pP]/, /[eE]/, /[cC]/, /[tT]/, /[iI]/, /[vV]/, /[eE]/], "postprocess": function (e){return e.join("")}},
    {"name": "perspective", "symbols": ["perspective$subexpression$1", "_", {"literal":"(","pos":790}, "_", "length", "_", {"literal":")","pos":798}], "postprocess": 
             d => ({
                 type: "perspective",
        value: d[4][0]
             })
        },
    {"name": "angle$ebnf$1$subexpression$1", "symbols": ["angleUnit"]},
    {"name": "angle$ebnf$1", "symbols": ["angle$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "angle$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "angle", "symbols": ["number", "angle$ebnf$1"], "postprocess":  d => ({
        	value: Array.isArray(d[0]) ? d[0][0] : d[0],
           unit: d[1] !== null ? d[1][0][0] : null // allow assuming default unit.
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
    {"name": "length", "symbols": ["number", "length$ebnf$1"], "postprocess":  d => ({
        	value: Array.isArray(d[0]) ? d[0][0] : d[0],
           unit: d[1] !== null ? d[1][0][0] : null // allow assuming default unit.
        }) },
    {"name": "absoluteLengthUnit$string$1", "symbols": [{"literal":"p"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "absoluteLengthUnit", "symbols": ["absoluteLengthUnit$string$1"]},
    {"name": "absoluteLengthUnit$string$2", "symbols": [{"literal":"c"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "absoluteLengthUnit", "symbols": ["absoluteLengthUnit$string$2"]},
    {"name": "absoluteLengthUnit$string$3", "symbols": [{"literal":"m"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "absoluteLengthUnit", "symbols": ["absoluteLengthUnit$string$3"]},
    {"name": "absoluteLengthUnit", "symbols": [{"literal":"Q","pos":884}]},
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
