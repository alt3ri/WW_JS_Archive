"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConditionArray = exports.Parser = void 0);
class Parser {
  constructor(t) {
    (this.ROn = t), (this.Ugr = []), (this.Xy = 0), this.Tokenize();
  }
  Tokenize() {
    let s = "";
    for (let t = 0; t < this.ROn.length; t++) {
      var r = this.ROn[t];
      " " !== r &&
        ("|&!".includes(r)
          ? (s && (this.Ugr.push({ Type: "number", Value: s }), (s = "")),
            t + 1 < this.ROn.length && this.ROn[t + 1] === r
              ? (this.Ugr.push({ Type: "operator", Value: r + r }), t++)
              : this.Ugr.push({ Type: "operator", Value: r }))
          : "()".includes(r)
            ? (s && (this.Ugr.push({ Type: "number", Value: s }), (s = "")),
              this.Ugr.push({ Type: "parenthesis", Value: r }))
            : (s += r));
    }
    s && this.Ugr.push({ Type: "number", Value: s });
  }
  Parse() {
    if (!this.Ugr.length) throw new Error("No tokens to parse");
    var t = this.Agr();
    if (this.Xy !== this.Ugr.length)
      throw new Error("Unexpected tokens after parsing");
    return t;
  }
  Agr() {
    return this.xOn();
  }
  xOn() {
    let t = this.POn();
    for (; this.Xy < this.Ugr.length && "||" === this.Ugr[this.Xy].Value; )
      this.Xy++, (t = { Or: [t, this.POn()] });
    return t;
  }
  POn() {
    let t = this.BOn();
    for (; this.Xy < this.Ugr.length && "&&" === this.Ugr[this.Xy].Value; )
      this.Xy++, (t = { And: [t, this.BOn()] });
    return t;
  }
  BOn() {
    return this.Xy < this.Ugr.length && "!" === this.Ugr[this.Xy].Value
      ? (this.Xy++, { Not: this.BOn() })
      : this.wOn();
  }
  wOn() {
    if (this.Xy >= this.Ugr.length) throw new Error("Unexpected end of input");
    if ("(" === this.Ugr[this.Xy].Value) {
      this.Xy++;
      var t = this.Agr();
      if (this.Xy >= this.Ugr.length || ")" !== this.Ugr[this.Xy].Value)
        throw new Error("Missing closing parenthesis");
      return this.Xy++, t;
    }
    t = this.Ugr[this.Xy];
    if ("number" === t.Type) return this.Xy++, { Index: parseInt(t.Value) };
    throw new Error("Unexpected token type");
  }
}
exports.Parser = Parser;
class ConditionArray {
  constructor(t, s) {
    (this.Qte = t), (this.bOn = s);
  }
  Evaluate() {
    return this.qOn(this.bOn);
  }
  qOn(t) {
    return "Index" in t && void 0 !== t.Index
      ? this.Qte[t.Index]
      : t.Or
        ? t.Or.some((t) => this.qOn(t))
        : t.And
          ? t.And.every((t) => this.qOn(t))
          : !!t.Not && !this.qOn(t.Not);
  }
}
exports.ConditionArray = ConditionArray;
//# sourceMappingURL=SkillConditionParser.js.map
