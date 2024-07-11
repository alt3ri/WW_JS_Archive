"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackboardMap = exports.BlackboardParam = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils");
class BlackboardParam {
  constructor(t) {
    (this.jEe = ""),
      (this.zpr = 0),
      (this.Zpr = void 0),
      (this.evr = !1),
      (this.tvr = 0),
      (this.ivr = ""),
      (this.IGe = void 0),
      (this.ovr = void 0),
      (this.rvr = void 0),
      (this.nvr = void 0),
      (this.E9 = t);
  }
  static CreateByProtocol(t) {
    if (void 0 !== t) {
      var r = t,
        e = new BlackboardParam(r.Z4n),
        t = (e.SetKey(r.j4n), Protocol_1.Aki.Protocol.Zks);
      switch (r.Z4n) {
        case t.Proto_BlackboardParamType_Int:
          return e.SetIntValue(r.B8n), e;
        case t.Proto_BlackboardParamType_IntArray:
          return e.SetIntValues(r.sKn.aKn), e;
        case t.Proto_BlackboardParamType_Long:
          return e.SetLongValue(MathUtils_1.MathUtils.LongToBigInt(r.hKn)), e;
        case t.Proto_BlackboardParamType_LongArray:
          var s = r.lKn.aKn,
            a = new Array();
          for (const i of s) a.push(MathUtils_1.MathUtils.LongToBigInt(i));
          return e.SetLongValues(a), e;
        case t.Proto_BlackboardParamType_Boolean:
          return e.SetBooleanValue(r._Kn), e;
        case t.Proto_BlackboardParamType_String:
          return e.SetStringValue(r.b8n), e;
        case t.Proto_BlackboardParamType_StringArray:
          return e.SetStringValues(r.mKn.aKn), e;
        case t.Proto_BlackboardParamType_Float:
          return e.SetFloatValue(r.uKn), e;
        case t.Proto_BlackboardParamType_FloatArray:
          return e.SetFloatValues(r.cKn.aKn), e;
        case t.Proto_BlackboardParamType_Vector:
          return e.SetVectorValue(r.dKn.X, r.dKn.Y, r.dKn.Z), e;
        case t.Proto_BlackboardParamType_VectorArray:
          return e.SetVectorValues(r.CKn.aKn), e;
        case t.Proto_BlackboardParamType_Rotator:
          return e.SetRotatorValue(r.gKn.Pitch, r.gKn.Roll, r.gKn.Yaw), e;
        case t.Proto_BlackboardParamType_RotatorArray:
          return e.SetRotatorValues(r.fKn.aKn), e;
        case t.Proto_BlackboardParamType_Entity:
          return e.SetLongValue(MathUtils_1.MathUtils.LongToBigInt(r.hKn)), e;
        case t.Proto_BlackboardParamType_EntityArray:
          var s = r.lKn.aKn,
            o = new Array();
          for (const l of s) o.push(MathUtils_1.MathUtils.LongToBigInt(l));
          return e.SetLongValues(o), e;
        default:
          return;
      }
    }
  }
  GetKey() {
    return this.jEe;
  }
  GetType() {
    return this.E9;
  }
  SetKey(t) {
    this.jEe = t;
  }
  GetIntValue() {
    return this.zpr;
  }
  SetIntValue(t) {
    this.zpr = t;
  }
  GetIntValues() {
    return this.svr;
  }
  SetIntValues(t) {
    this.svr = t;
  }
  GetLongValue() {
    return this.Zpr;
  }
  SetLongValue(t) {
    this.Zpr = t;
  }
  GetLongValues() {
    return this.avr;
  }
  SetLongValues(t) {
    this.avr = t;
  }
  GetBooleanValue() {
    return this.evr;
  }
  SetBooleanValue(t) {
    this.evr = t;
  }
  GetFloatValue() {
    return this.tvr;
  }
  SetFloatValue(t) {
    this.tvr = t;
  }
  GetFloatValues() {
    return this.hvr;
  }
  SetFloatValues(t) {
    this.hvr = t;
  }
  GetStringValue() {
    return this.ivr;
  }
  SetStringValue(t) {
    this.ivr = t;
  }
  GetStringValues() {
    return this.lvr;
  }
  SetStringValues(t) {
    this.lvr = t;
  }
  GetVectorValue() {
    return this.IGe;
  }
  SetVectorValue(t, r, e) {
    this.IGe || (this.IGe = Protocol_1.Aki.Protocol.Pks.create()),
      (this.IGe.X = t),
      (this.IGe.Y = r),
      (this.IGe.Z = e);
  }
  GetVectorValues() {
    return this.ovr;
  }
  SetVectorValues(t) {
    this.ovr = t;
  }
  GetRotatorValue() {
    return this.rvr;
  }
  SetRotatorValue(t, r, e) {
    this.rvr || (this.rvr = Protocol_1.Aki.Protocol.S2s.create()),
      (this.rvr.Pitch = t),
      (this.rvr.Roll = r),
      (this.rvr.Yaw = e);
  }
  GetRotatorValues() {
    return this.nvr;
  }
  SetRotatorValues(t) {
    this.nvr = t;
  }
  ToString() {
    var t = Protocol_1.Aki.Protocol.Zks;
    switch (this.E9) {
      case t.Proto_BlackboardParamType_Int:
        return this.zpr.toString();
      case t.Proto_BlackboardParamType_IntArray: {
        let r = "[";
        if (void 0 !== this.svr) {
          var e = this.svr.length;
          for (let t = 0; t < e; t++)
            (r += this.svr[t]), t !== e - 1 && (r += ", ");
        }
        return (r += "]");
      }
      case t.Proto_BlackboardParamType_Long:
        return this.Zpr.toString();
      case t.Proto_BlackboardParamType_LongArray: {
        let r = "[";
        if (void 0 !== this.avr) {
          var s = this.avr.length;
          for (let t = 0; t < s; t++)
            (r += this.avr[t]), t !== s - 1 && (r += ", ");
        }
        return (r += "]");
      }
      case t.Proto_BlackboardParamType_Boolean:
        return this.evr.toString();
      case t.Proto_BlackboardParamType_String:
        return this.ivr;
      case t.Proto_BlackboardParamType_StringArray: {
        let r = "[";
        if (void 0 !== this.lvr) {
          var a = this.lvr.length;
          for (let t = 0; t < a; t++)
            (r += this.lvr[t]), t !== a - 1 && (r += ", ");
        }
        return (r += "]");
      }
      case t.Proto_BlackboardParamType_Float:
        return this.tvr.toString();
      case t.Proto_BlackboardParamType_FloatArray: {
        let r = "[";
        if (void 0 !== this.hvr) {
          var o = this.hvr.length;
          for (let t = 0; t < o; t++)
            (r += this.hvr[t]), t !== o - 1 && (r += ", ");
        }
        return (r += "]");
      }
      case t.Proto_BlackboardParamType_Vector: {
        let t = "";
        return (
          void 0 !== this.IGe &&
            (t += `X:${this.IGe.X} Y:${this.IGe.Y} Z:` + this.IGe.Z),
          t
        );
      }
      case t.Proto_BlackboardParamType_VectorArray: {
        let r = "[";
        if (void 0 !== this.ovr) {
          var i = this.ovr.length;
          for (let t = 0; t < i; t++) {
            var l = this.ovr[t];
            (r += `X:${l.X} Y:${l.Y} Z:` + l.Z), t !== i - 1 && (r += ", ");
          }
        }
        return (r += "]");
      }
      case t.Proto_BlackboardParamType_Rotator: {
        let t = "";
        return (
          void 0 !== this.rvr &&
            (t +=
              `Pitch:${this.rvr.Pitch} Roll:${this.rvr.Roll} Yaw:` +
              this.rvr.Yaw),
          t
        );
      }
      case t.Proto_BlackboardParamType_RotatorArray: {
        let r = "[";
        if (void 0 !== this.nvr) {
          var u = this.nvr.length;
          for (let t = 0; t < u; t++) {
            var n = this.nvr[t];
            (r += `Pitch:${n.Pitch} Roll:${n.Roll} Yaw:` + n.Yaw),
              t !== u - 1 && (r += ", ");
          }
        }
        return (r += "]");
      }
      default:
        return "";
    }
  }
}
exports.BlackboardParam = BlackboardParam;
class BlackboardMap {
  constructor() {
    this.BlackboardMap = new Map();
  }
  GetValue(t) {
    t = this.BlackboardMap.get(t);
    return t || void 0;
  }
  HasValue(t) {
    return this.BlackboardMap.has(t);
  }
  SetValue(t, r) {
    this.BlackboardMap.set(t, r);
  }
  RemoveValue(t) {
    return this.BlackboardMap.delete(t);
  }
  Clear() {
    this.BlackboardMap.clear();
  }
  ToString() {
    let t = "";
    for (const e of this.BlackboardMap.keys()) {
      var r = this.BlackboardMap.get(e);
      t += `key:${e}  type:${BlackboardMap._vr(r.GetType())}  value:${r?.ToString()}
`;
    }
    return t;
  }
  static CheckValueType(t, r, e) {
    return (
      r.GetType() === e ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[BlackboardMap.CheckValue] 设置黑板值失败,因为相同的Key使用了不同的数据类型。",
          ["Key", t],
          ["Old字段类型", BlackboardMap._vr(r.GetType())],
          ["New字段类型", BlackboardMap._vr(e)],
        ),
      !1)
    );
  }
  static _vr(t) {
    switch (t) {
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_None:
        return "none";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Int:
        return "int";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_IntArray:
        return "array<int>";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Long:
        return "long";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_LongArray:
        return "array<long>";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Boolean:
        return "boolean";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_String:
        return "string";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_StringArray:
        return "array<string>";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Float:
        return "float";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_FloatArray:
        return "array<float>";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Vector:
        return "vector";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_VectorArray:
        return "array<vector>";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Rotator:
        return "rotator";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_RotatorArray:
        return "array<rotator>";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Entity:
        return "entity";
      case Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_EntityArray:
        return "array<entity>";
      default:
        return;
    }
  }
}
exports.BlackboardMap = BlackboardMap;
//# sourceMappingURL=BlackboardMap.js.map
