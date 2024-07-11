"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Formula = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Macro_1 = require("../../../Core/Preprocessor/Macro");
class Lexer {
  constructor(r) {
    (this.ygr = r), (this.cC = 0);
  }
  Tokenize() {
    for (var r = []; this.cC < this.ygr.length; ) {
      var e = this.ygr[this.cC];
      if (/\d/.test(e)) r.push(this.Igr());
      else if (/[a-zA-Z]/.test(e)) r.push(this.Tgr());
      else if (/['"`]/.test(e)) r.push(this.Lgr());
      else if (/\+|-|\*|\/|%|>|<|=|!|&|\|/.test(e)) r.push(this.Dgr());
      else {
        if ("," === e) r.push({ TokenType: 5, TokenString: "," });
        else if ("(" === e) r.push({ TokenType: 6, TokenString: "(" });
        else if (")" === e) r.push({ TokenType: 7, TokenString: ")" });
        else if ("[" === e) r.push({ TokenType: 8, TokenString: "[" });
        else if ("]" === e) r.push({ TokenType: 9, TokenString: "]" });
        else if (!/\s/.test(e)) throw new Error("Invalid character: " + e);
        this.cC++;
      }
    }
    return r.push({ TokenType: 10, TokenString: "" }), r;
  }
  Igr() {
    let r = "";
    for (; this.cC < this.ygr.length && /\d/.test(this.ygr[this.cC]); )
      (r += this.ygr[this.cC]), this.cC++;
    if ("." === this.ygr[this.cC])
      for (
        r += ".", this.cC++;
        this.cC < this.ygr.length && /\d/.test(this.ygr[this.cC]);

      )
        (r += this.ygr[this.cC]), this.cC++;
    return { TokenType: 0, TokenString: r };
  }
  Tgr() {
    let r = "";
    for (; this.cC < this.ygr.length && /[a-zA-Z0-9]/.test(this.ygr[this.cC]); )
      r += this.ygr[this.cC++];
    return "TRUE" === r || "FALSE" === r
      ? { TokenType: 1, TokenString: r.toLowerCase() }
      : "AND" === r
        ? { TokenType: 4, TokenString: "&&" }
        : "OR" === r
          ? { TokenType: 4, TokenString: "||" }
          : "XOR" === r
            ? { TokenType: 4, TokenString: "!=" }
            : "NOT" === r
              ? { TokenType: 4, TokenString: "!" }
              : { TokenType: 3, TokenString: r };
  }
  Lgr() {
    var r = this.ygr[this.cC++];
    let e = "";
    for (; this.cC < this.ygr.length; ) {
      var t = this.ygr[this.cC++];
      if (t === r) return { TokenType: 2, TokenString: e };
      e += t;
    }
    throw new Error("Invalid string: " + e);
  }
  Dgr() {
    let r = "";
    for (
      ;
      this.cC < this.ygr.length &&
      /\+|-|\*|\/|%|>|<|=|!|&|\|/.test(this.ygr[this.cC]);

    )
      (r += this.ygr[this.cC]), this.cC++;
    return { TokenType: 4, TokenString: r };
  }
}
class Parser {
  constructor(r) {
    (this.Ugr = r), (this.Rgr = ""), (this.cC = 0);
  }
  Parse(r) {
    this.Rgr = r;
    var e = this.Agr();
    if (this.cC !== this.Ugr.length - 1)
      throw new Error("Unexpected token when parsing expression " + r);
    return e;
  }
  Agr() {
    return this.Pgr();
  }
  Pgr() {
    let r = this.xgr();
    for (; this.wgr("||"); ) {
      var e = this.Bgr().TokenString,
        t = this.xgr();
      r = { NodeType: 5, Operator: e, Args: [r, t] };
    }
    return r;
  }
  xgr() {
    let r = this.bgr();
    for (; this.wgr("&&"); ) {
      var e = this.Bgr().TokenString,
        t = this.bgr();
      r = { NodeType: 5, Operator: e, Args: [r, t] };
    }
    return r;
  }
  bgr() {
    let r = this.qgr();
    for (; this.wgr("==", "!="); ) {
      var e = this.Bgr().TokenString,
        t = this.qgr();
      r = { NodeType: 5, Operator: e, Args: [r, t] };
    }
    return r;
  }
  qgr() {
    let r = this.Ggr();
    for (; this.wgr(">", ">=", "<", "<="); ) {
      var e = this.Bgr().TokenString,
        t = this.Ggr();
      r = { NodeType: 5, Operator: e, Args: [r, t] };
    }
    return r;
  }
  Ggr() {
    let r = this.Ngr();
    for (; this.wgr("+", "-"); ) {
      var e = this.Bgr().TokenString,
        t = this.Ngr();
      r = { NodeType: 5, Operator: e, Args: [r, t] };
    }
    return r;
  }
  Ngr() {
    let r = this.Ogr();
    for (; this.wgr("*", "/", "%"); ) {
      var e = this.Bgr().TokenString,
        t = this.Ogr();
      r = { NodeType: 5, Operator: e, Args: [r, t] };
    }
    return r;
  }
  Ogr() {
    return this.wgr("+", "-", "!")
      ? { NodeType: 6, Operator: this.Bgr().TokenString, Args: [this.Ogr()] }
      : this.kgr();
  }
  kgr() {
    var e = this.Fgr();
    if (0 === e.TokenType)
      return (
        this.Vgr(),
        e.TokenString.includes(".")
          ? { NodeType: 0, Value: parseFloat(e.TokenString) }
          : 10 < e.TokenString.length
            ? { NodeType: 0, Value: BigInt(e.TokenString) }
            : { NodeType: 0, Value: parseInt(e.TokenString) }
      );
    if (1 === e.TokenType)
      return this.Vgr(), { NodeType: 1, Value: "true" === e.TokenString };
    if (2 === e.TokenType)
      return this.Vgr(), { NodeType: 2, Value: e.TokenString };
    if (3 === e.TokenType) {
      var t = e.TokenString;
      if ((this.Vgr(), this.Hgr(6))) return this.jgr(t);
      let r = { NodeType: 4, Value: t };
      for (; this.Hgr(8); ) {
        var i = this.Agr();
        this.Wgr(
          9,
          "Expected ']' after array when parsing expression " + this.Rgr,
        ),
          (r = { NodeType: 9, Value: r, Index: i });
      }
      return r;
    }
    if (this.Hgr(6))
      return (
        (t = this.Agr()),
        this.Wgr(7, "Expected ')' after expression when parsing " + this.Rgr),
        { NodeType: 8, Value: t }
      );
    if (this.Hgr(8)) return this.Kgr();
    throw new Error(e.TokenString + " when parsing expression " + this.Rgr);
  }
  jgr(r) {
    var e = [];
    if (!this.Ii(7)) for (; e.push(this.Agr()), this.Hgr(5); );
    return (
      this.Wgr(
        7,
        "Expected ')' after arguments when parsing expression " + this.Rgr,
      ),
      { NodeType: 7, Value: r, Args: e }
    );
  }
  Kgr() {
    var r = [];
    if (!this.Ii(9)) for (; r.push(this.Agr()), this.Hgr(5); );
    this.Wgr(9, "Expected ']' after array when parsing expression " + this.Rgr);
    let e = { NodeType: 3, Value: r };
    for (; this.Hgr(8); ) {
      var t = this.Agr();
      this.Wgr(
        9,
        "Expected ']' after array when parsing expression " + this.Rgr,
      ),
        (e = { NodeType: 9, Value: e, Index: t });
    }
    return e;
  }
  Hgr(...r) {
    for (const e of r) if (this.Ii(e)) return this.Vgr(), !0;
    return !1;
  }
  wgr(...r) {
    for (const e of r)
      if (this.Ii(4) && this.Fgr().TokenString === e) return this.Vgr(), !0;
    return !1;
  }
  Wgr(r, e) {
    if (!this.Ii(r)) throw new Error(e);
    this.Vgr();
  }
  Ii(r) {
    return !this.Qgr() && this.Fgr().TokenType === r;
  }
  Vgr() {
    return this.Qgr() || this.cC++, this.Bgr();
  }
  Qgr() {
    return 10 === this.Fgr().TokenType;
  }
  Fgr() {
    return this.Ugr[this.cC];
  }
  Bgr() {
    return this.Ugr[this.cC - 1];
  }
}
class Formula {
  constructor(r) {
    (this.Xgr = void 0),
      (this.Rgr = ""),
      (this.Params = void 0),
      (this.lDt = void 0),
      (this.$gr = new Map()),
      (this.jQn = ""),
      (this.WQn = new Set()),
      (this.Rgr = r);
    var e = new Lexer(r).Tokenize(),
      e = new Parser(e);
    (this.Xgr = e.Parse(r)), (this.Params = void 0);
  }
  SetBuiltinFunctions(r) {
    this.$gr.clear();
    for (var [e, t] of r) this.$gr.set(e, t);
    return this;
  }
  AddBuiltinFunction(r, e) {
    return this.$gr.set(r, e), this;
  }
  SetDefaultParams(r) {
    return (this.Params = { ...r }), this;
  }
  Ygr(e) {
    switch (e.NodeType) {
      case 0:
      case 1:
      case 2:
        return e.Value;
      case 3:
        return e.Value.map((r) => this.Ygr(r));
      case 4:
        var r = this.Params?.[e.Value] ?? this.lDt?.[e.Value];
        if (void 0 === r) throw new Error("Undefined variable: " + e.Value);
        return r;
      case 9:
        r = this.Ygr(e.Value);
        if (void 0 === r || !Array.isArray(r))
          throw new Error("Variable is not a valid array");
        var t = this.Ygr(e.Index);
        if (void 0 === t || "number" != typeof t || t < 0 || t >= r.length)
          throw new Error("Invalid array index: " + String(t));
        return r[t];
      case 6:
        var i = this.Ygr(e.Args[0]);
        switch (e.Operator) {
          case "+":
            return +i;
          case "-":
            return -i;
          case "!":
            return !i;
          default:
            throw new Error("Invalid unary operator: " + e.Operator);
        }
      case 5:
        var s = this.Ygr(e.Args[0]),
          n = this.Ygr(e.Args[1]);
        try {
          switch (e.Operator) {
            case "+":
              return s + n;
            case "-":
              return s - n;
            case "*":
              return s * n;
            case "/":
              return s / n;
            case ">":
              return n < s;
            case ">=":
              return n <= s;
            case "<":
              return s < n;
            case "<=":
              return s <= n;
            case "==":
              return s === n;
            case "!=":
              return s !== n;
            case "&&":
              return s && n;
            case "||":
              return s || n;
            default:
              throw new Error("Invalid binary operator: " + e.Operator);
          }
        } catch (r) {
          throw new Error(`Invalid operation: ${s} ${e.Operator} ` + n);
        }
      case 7:
        r = e.Args.map((r) => this.Ygr(r));
        return this.$gr.get(e.Value)?.(...r);
      case 8:
        return this.Ygr(e.Value);
      default:
        throw new Error("Invalid node type: " + e.NodeType);
    }
  }
  Evaluate(r) {
    this.lDt = r;
    let e = void 0;
    try {
      e = this.Ygr(this.Xgr);
    } catch (r) {
      (e = void 0),
        r instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Event",
              20,
              "Trigger条件解析异常",
              r,
              ["formula", this.Rgr],
              ["error", r.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Event",
              20,
              "Trigger条件解析异常",
              ["formula", this.Rgr],
              ["error", r],
            );
    } finally {
      this.lDt = void 0;
    }
    return e;
  }
  GetFormulaString(r) {
    switch (r.NodeType) {
      case 0:
      case 1:
      case 2:
        return r.Value.toString();
      case 3:
        return `[${r.Value.map((r) => this.GetFormulaString(r)).join(",")}]`;
      case 4:
        return r.Value;
      case 9:
        return `${this.GetFormulaString(r.Value)}[${this.GetFormulaString(r.Index)}]`;
      case 6:
        return `${r.Operator}(${this.GetFormulaString(r.Args[0])})`;
      case 5:
        return (
          `${this.GetFormulaString(r.Args[0])} ${r.Operator} ` +
          this.GetFormulaString(r.Args[1])
        );
      case 7:
        return `${r.Value}(${r.Args.map((r) => this.GetFormulaString(r)).join(",")})`;
      case 8:
        return `(${this.GetFormulaString(r.Value)})`;
      default:
        return "";
    }
  }
  GetLastResult() {
    return this.jQn;
  }
}
exports.Formula = Formula;
//# sourceMappingURL=ConditionFormula.js.map
