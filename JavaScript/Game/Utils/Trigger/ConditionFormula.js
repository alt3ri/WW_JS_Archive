"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Formula = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log");
class Lexer {
  constructor(t) {
    (this.LCr = t), (this.cC = 0);
  }
  Tokenize() {
    for (var t = []; this.cC < this.LCr.length; ) {
      var r = this.LCr[this.cC];
      if (/\d/.test(r)) t.push(this.DCr());
      else if (/[a-zA-Z]/.test(r)) t.push(this.RCr());
      else if (/['"`]/.test(r)) t.push(this.UCr());
      else if (/\+|-|\*|\/|%|>|<|=|!|&|\|/.test(r)) t.push(this.ACr());
      else {
        if ("," === r) t.push({ TokenType: 5, TokenString: "," });
        else if ("(" === r) t.push({ TokenType: 6, TokenString: "(" });
        else if (")" === r) t.push({ TokenType: 7, TokenString: ")" });
        else if ("[" === r) t.push({ TokenType: 8, TokenString: "[" });
        else if ("]" === r) t.push({ TokenType: 9, TokenString: "]" });
        else if (!/\s/.test(r)) throw new Error("Invalid character: " + r);
        this.cC++;
      }
    }
    return t.push({ TokenType: 10, TokenString: "" }), t;
  }
  DCr() {
    let t = "";
    for (; this.cC < this.LCr.length && /\d/.test(this.LCr[this.cC]); )
      (t += this.LCr[this.cC]), this.cC++;
    if ("." === this.LCr[this.cC])
      for (
        t += ".", this.cC++;
        this.cC < this.LCr.length && /\d/.test(this.LCr[this.cC]);

      )
        (t += this.LCr[this.cC]), this.cC++;
    return { TokenType: 0, TokenString: t };
  }
  RCr() {
    let t = "";
    for (; this.cC < this.LCr.length && /[a-zA-Z0-9]/.test(this.LCr[this.cC]); )
      t += this.LCr[this.cC++];
    return "TRUE" === t || "FALSE" === t
      ? { TokenType: 1, TokenString: t.toLowerCase() }
      : "AND" === t
        ? { TokenType: 4, TokenString: "&&" }
        : "OR" === t
          ? { TokenType: 4, TokenString: "||" }
          : "XOR" === t
            ? { TokenType: 4, TokenString: "!=" }
            : "NOT" === t
              ? { TokenType: 4, TokenString: "!" }
              : { TokenType: 3, TokenString: t };
  }
  UCr() {
    var t = this.LCr[this.cC++];
    let r = "";
    for (; this.cC < this.LCr.length; ) {
      var e = this.LCr[this.cC++];
      if (e === t) return { TokenType: 2, TokenString: r };
      r += e;
    }
    throw new Error("Invalid string: " + r);
  }
  ACr() {
    let t = "";
    for (
      ;
      this.cC < this.LCr.length &&
      /\+|-|\*|\/|%|>|<|=|!|&|\|/.test(this.LCr[this.cC]);

    )
      (t += this.LCr[this.cC]), this.cC++;
    return { TokenType: 4, TokenString: t };
  }
}
class Parser {
  constructor(t) {
    (this.xCr = t), (this.PCr = ""), (this.cC = 0);
  }
  Parse(t) {
    this.PCr = t;
    var r = this.wCr();
    if (this.cC !== this.xCr.length - 1)
      throw new Error("Unexpected token when parsing expression " + t);
    return r;
  }
  wCr() {
    return this.BCr();
  }
  BCr() {
    let t = this.bCr();
    for (; this.qCr("||"); ) {
      var r = this.GCr().TokenString,
        e = this.bCr();
      t = { NodeType: 5, Operator: r, Args: [t, e] };
    }
    return t;
  }
  bCr() {
    let t = this.NCr();
    for (; this.qCr("&&"); ) {
      var r = this.GCr().TokenString,
        e = this.NCr();
      t = { NodeType: 5, Operator: r, Args: [t, e] };
    }
    return t;
  }
  NCr() {
    let t = this.OCr();
    for (; this.qCr("==", "!="); ) {
      var r = this.GCr().TokenString,
        e = this.OCr();
      t = { NodeType: 5, Operator: r, Args: [t, e] };
    }
    return t;
  }
  OCr() {
    let t = this.kCr();
    for (; this.qCr(">", ">=", "<", "<="); ) {
      var r = this.GCr().TokenString,
        e = this.kCr();
      t = { NodeType: 5, Operator: r, Args: [t, e] };
    }
    return t;
  }
  kCr() {
    let t = this.FCr();
    for (; this.qCr("+", "-"); ) {
      var r = this.GCr().TokenString,
        e = this.FCr();
      t = { NodeType: 5, Operator: r, Args: [t, e] };
    }
    return t;
  }
  FCr() {
    let t = this.VCr();
    for (; this.qCr("*", "/", "%"); ) {
      var r = this.GCr().TokenString,
        e = this.VCr();
      t = { NodeType: 5, Operator: r, Args: [t, e] };
    }
    return t;
  }
  VCr() {
    return this.qCr("+", "-", "!")
      ? { NodeType: 6, Operator: this.GCr().TokenString, Args: [this.VCr()] }
      : this.HCr();
  }
  HCr() {
    var r = this.jCr();
    if (0 === r.TokenType)
      return (
        this.WCr(),
        r.TokenString.includes(".")
          ? { NodeType: 0, Value: parseFloat(r.TokenString) }
          : 10 < r.TokenString.length
            ? { NodeType: 0, Value: BigInt(r.TokenString) }
            : { NodeType: 0, Value: parseInt(r.TokenString) }
      );
    if (1 === r.TokenType)
      return this.WCr(), { NodeType: 1, Value: "true" === r.TokenString };
    if (2 === r.TokenType)
      return this.WCr(), { NodeType: 2, Value: r.TokenString };
    if (3 === r.TokenType) {
      var e = r.TokenString;
      if ((this.WCr(), this.KCr(6))) return this.QCr(e);
      let t = { NodeType: 4, Value: e };
      for (; this.KCr(8); ) {
        var i = this.wCr();
        this.XCr(
          9,
          "Expected ']' after array when parsing expression " + this.PCr,
        ),
          (t = { NodeType: 9, Value: t, Index: i });
      }
      return t;
    }
    if (this.KCr(6))
      return (
        (e = this.wCr()),
        this.XCr(7, "Expected ')' after expression when parsing " + this.PCr),
        { NodeType: 8, Value: e }
      );
    if (this.KCr(8)) return this.$Cr();
    throw new Error(r.TokenString + " when parsing expression " + this.PCr);
  }
  QCr(t) {
    var r = [];
    if (!this.Ii(7)) for (; r.push(this.wCr()), this.KCr(5); );
    return (
      this.XCr(
        7,
        "Expected ')' after arguments when parsing expression " + this.PCr,
      ),
      { NodeType: 7, Value: t, Args: r }
    );
  }
  $Cr() {
    var t = [];
    if (!this.Ii(9)) for (; t.push(this.wCr()), this.KCr(5); );
    this.XCr(9, "Expected ']' after array when parsing expression " + this.PCr);
    let r = { NodeType: 3, Value: t };
    for (; this.KCr(8); ) {
      var e = this.wCr();
      this.XCr(
        9,
        "Expected ']' after array when parsing expression " + this.PCr,
      ),
        (r = { NodeType: 9, Value: r, Index: e });
    }
    return r;
  }
  KCr(...t) {
    for (const r of t) if (this.Ii(r)) return this.WCr(), !0;
    return !1;
  }
  qCr(...t) {
    for (const r of t)
      if (this.Ii(4) && this.jCr().TokenString === r) return this.WCr(), !0;
    return !1;
  }
  XCr(t, r) {
    if (!this.Ii(t)) throw new Error(r);
    this.WCr();
  }
  Ii(t) {
    return !this.YCr() && this.jCr().TokenType === t;
  }
  WCr() {
    return this.YCr() || this.cC++, this.GCr();
  }
  YCr() {
    return 10 === this.jCr().TokenType;
  }
  jCr() {
    return this.xCr[this.cC];
  }
  GCr() {
    return this.xCr[this.cC - 1];
  }
}
class Formula {
  constructor(t) {
    (this.JCr = void 0),
      (this.PCr = ""),
      (this.Params = void 0),
      (this.nLt = void 0),
      (this.zCr = new Map()),
      (this.ujn = ""),
      (this.cjn = new Set()),
      (this.PCr = t);
    var r = new Lexer(t).Tokenize(),
      r = new Parser(r);
    (this.JCr = r.Parse(t)), (this.Params = void 0);
  }
  SetBuiltinFunctions(t) {
    this.zCr.clear();
    for (var [r, e] of t) this.zCr.set(r, e);
    return this;
  }
  AddBuiltinFunction(t, r) {
    return this.zCr.set(t, r), this;
  }
  SetDefaultParams(t) {
    return (this.Params = { ...t }), this;
  }
  ZCr(r) {
    switch (r.NodeType) {
      case 0:
      case 1:
      case 2:
        return r.Value;
      case 3:
        return r.Value.map((t) => this.ZCr(t));
      case 4:
        var t = this.Params?.[r.Value] ?? this.nLt?.[r.Value];
        if (void 0 === t) throw new Error("Undefined variable: " + r.Value);
        return (
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            !this.cjn.has(r.Value) &&
            (this.cjn.add(r.Value),
            (this.ujn += "\n" + this.GetFormulaString(r) + "=" + String(t))),
          t
        );
      case 9:
        t = this.ZCr(r.Value);
        if (void 0 === t || !Array.isArray(t))
          throw new Error("Variable is not a valid array");
        var e = this.ZCr(r.Index);
        if (void 0 === e || "number" != typeof e || e < 0 || e >= t.length)
          throw new Error("Invalid array index: " + String(e));
        return (
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            (this.ujn += "\n" + this.GetFormulaString(r) + "=" + String(t[e])),
          t[e]
        );
      case 6:
        var i = this.ZCr(r.Args[0]);
        switch (r.Operator) {
          case "+":
            return +i;
          case "-":
            return -i;
          case "!":
            return !i;
          default:
            throw new Error("Invalid unary operator: " + r.Operator);
        }
      case 5:
        var s = this.ZCr(r.Args[0]),
          n = this.ZCr(r.Args[1]);
        try {
          switch (r.Operator) {
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
              throw new Error("Invalid binary operator: " + r.Operator);
          }
        } catch (t) {
          throw new Error(`Invalid operation: ${s} ${r.Operator} ` + n);
        }
      case 7:
        (t = r.Args.map((t) => this.ZCr(t))),
          (e = this.zCr.get(r.Value)?.(...t));
        return (
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            (this.ujn += "\n" + this.GetFormulaString(r) + "=" + String(e)),
          e
        );
      case 8:
        return this.ZCr(r.Value);
      default:
        throw new Error("Invalid node type: " + r.NodeType);
    }
  }
  Evaluate(t) {
    Info_1.Info.IsBuildDevelopmentOrDebug &&
      ((this.ujn = ""), this.cjn.clear()),
      (this.nLt = t);
    let r = void 0;
    try {
      (r = this.ZCr(this.JCr)),
        Info_1.Info.IsBuildDevelopmentOrDebug && (this.ujn = this.ujn?.trim());
    } catch (t) {
      (r = void 0),
        t instanceof Error
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Event",
                20,
                "Trigger条件解析异常",
                t,
                ["formula", this.PCr],
                ["error", t.message],
              ),
            Info_1.Info.IsBuildDevelopmentOrDebug && (this.ujn = t.message))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Event",
                20,
                "Trigger条件解析异常",
                ["formula", this.PCr],
                ["error", t],
              ),
            Info_1.Info.IsBuildDevelopmentOrDebug && (this.ujn = String(t)));
    } finally {
      this.nLt = void 0;
    }
    return r;
  }
  GetFormulaString(t) {
    switch (t.NodeType) {
      case 0:
      case 1:
      case 2:
        return t.Value.toString();
      case 3:
        return `[${t.Value.map((t) => this.GetFormulaString(t)).join(",")}]`;
      case 4:
        return t.Value;
      case 9:
        return `${this.GetFormulaString(t.Value)}[${this.GetFormulaString(t.Index)}]`;
      case 6:
        return `${t.Operator}(${this.GetFormulaString(t.Args[0])})`;
      case 5:
        return (
          `${this.GetFormulaString(t.Args[0])} ${t.Operator} ` +
          this.GetFormulaString(t.Args[1])
        );
      case 7:
        return `${t.Value}(${t.Args.map((t) => this.GetFormulaString(t)).join(",")})`;
      case 8:
        return `(${this.GetFormulaString(t.Value)})`;
      default:
        return "";
    }
  }
  GetLastResult() {
    return this.ujn;
  }
}
exports.Formula = Formula;
//# sourceMappingURL=ConditionFormula.js.map
