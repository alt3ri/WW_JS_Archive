"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackboardModel = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  BlackboardMap_1 = require("../Define/BlackboardMap");
class BlackboardModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this._vr = new BlackboardMap_1.BlackboardMap()),
      (this.uvr = new BlackboardMap_1.BlackboardMap()),
      (this.cvr = new Map());
  }
  OnClear() {
    return this._vr.Clear(), this.uvr.Clear(), this.cvr.clear(), !0;
  }
  GetCreatureDataComponent(t) {
    if (!this.cvr.has(t)) {
      var o = EntitySystem_1.EntitySystem.Get(t);
      if (!o?.Valid) return;
      o = o.GetComponent(0);
      if (!o?.Valid) return;
      this.cvr.set(t, o);
    }
    return this.cvr.get(t);
  }
  RemoveCreatureDataComponent(t) {
    this.cvr.has(t) && this.cvr.delete(t);
  }
  GetIntValueByGlobal(t) {
    return this._vr.GetValue(t)?.GetIntValue();
  }
  SetIntValueByGlobal(t, o) {
    let e = this._vr.GetValue(t);
    e
      ? e.SetIntValue(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int,
        )).SetIntValue(o),
        this._vr.SetValue(t, e));
  }
  GetIntValuesByGlobal(t) {
    t = this._vr.GetValue(t);
    return t ? t.GetIntValues() : void 0;
  }
  SetIntValuesByGlobal(t, o) {
    let e = this._vr.GetValue(t);
    e
      ? e.SetIntValues(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray,
        )).SetIntValues(o),
        this._vr.SetValue(t, e));
  }
  GetLongValueByGlobal(t) {
    return this._vr.GetValue(t)?.GetLongValue();
  }
  SetLongValueByGlobal(t, o) {
    let e = this._vr.GetValue(t);
    e
      ? e.SetLongValue(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long,
        )).SetLongValue(o),
        this._vr.SetValue(t, e));
  }
  GetLongValuesByGlobal(t) {
    t = this._vr.GetValue(t);
    return t ? t.GetLongValues() : void 0;
  }
  SetLongValuesByGlobal(t, o) {
    let e = this._vr.GetValue(t);
    e
      ? e.SetLongValues(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray,
        )).SetLongValues(o),
        this._vr.SetValue(t, e));
  }
  GetBooleanValueByGlobal(t) {
    return this._vr.GetValue(t)?.GetBooleanValue();
  }
  SetBooleanValueByGlobal(t, o) {
    let e = this._vr.GetValue(t);
    e
      ? e.SetBooleanValue(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean,
        )).SetBooleanValue(o),
        this._vr.SetValue(t, e));
  }
  GetFloatValueByGlobal(t) {
    return this._vr.GetValue(t)?.GetFloatValue();
  }
  SetFloatValueByGlobal(t, o) {
    let e = this._vr.GetValue(t);
    e
      ? e.SetFloatValue(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float,
        )).SetFloatValue(o),
        this._vr.SetValue(t, e));
  }
  GetFloatValuesByGlobal(t) {
    t = this._vr.GetValue(t);
    return t ? t.GetFloatValues() : void 0;
  }
  SetFloatValuesByGlobal(t, o) {
    let e = this._vr.GetValue(t);
    e
      ? e.SetFloatValues(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray,
        )).SetFloatValues(o),
        this._vr.SetValue(t, e));
  }
  GetStringValueByGlobal(t) {
    t = this._vr.GetValue(t);
    return t ? t.GetStringValue() : void 0;
  }
  SetStringValueByGlobal(t, o) {
    let e = this._vr.GetValue(t);
    e
      ? e.SetStringValue(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String,
        )).SetStringValue(o),
        this._vr.SetValue(t, e));
  }
  GetStringValuesByGlobal(t) {
    t = this._vr.GetValue(t);
    return t ? t.GetStringValues() : void 0;
  }
  SetStringValuesByGlobal(t, o) {
    let e = this._vr.GetValue(t);
    e
      ? e.SetStringValues(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray,
        )).SetStringValues(o),
        this._vr.SetValue(t, e));
  }
  SetValueByGlobal(t, o) {
    this._vr.SetValue(t, o);
  }
  RemoveValueByGlobal(t) {
    this._vr.RemoveValue(t);
  }
  SetWorldBlackboardByProtocol(t) {}
  GetIntValueByWorld(t) {
    return this.uvr.GetValue(t)?.GetIntValue();
  }
  SetIntValueByWorld(t, o) {
    let e = this.uvr.GetValue(t);
    e
      ? e.SetIntValue(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int,
        )).SetIntValue(o),
        this.uvr.SetValue(t, e));
  }
  GetIntValuesByWorld(t) {
    t = this.uvr.GetValue(t);
    return t ? t.GetIntValues() : void 0;
  }
  SetIntValuesByWorld(t, o) {
    let e = this.uvr.GetValue(t);
    e
      ? e.SetIntValues(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray,
        )).SetIntValues(o),
        this.uvr.SetValue(t, e));
  }
  GetLongValueByWorld(t) {
    return this.uvr.GetValue(t)?.GetLongValue();
  }
  SetLongValueByWorld(t, o) {
    let e = this.uvr.GetValue(t);
    e
      ? e.SetLongValue(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long,
        )).SetLongValue(o),
        this.uvr.SetValue(t, e));
  }
  GetLongValuesByWorld(t) {
    t = this.uvr.GetValue(t);
    return t ? t.GetLongValues() : void 0;
  }
  SetLongValuesByWorld(t, o) {
    let e = this.uvr.GetValue(t);
    e
      ? e.SetLongValues(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray,
        )).SetLongValues(o),
        this.uvr.SetValue(t, e));
  }
  GetBooleanValueByWorld(t) {
    return this.uvr.GetValue(t)?.GetBooleanValue();
  }
  SetBooleanValueByWorld(t, o) {
    let e = this.uvr.GetValue(t);
    e
      ? e.SetBooleanValue(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean,
        )).SetBooleanValue(o),
        this.uvr.SetValue(t, e));
  }
  GetFloatValueByWorld(t) {
    return this.uvr.GetValue(t)?.GetFloatValue();
  }
  SetFloatValueByWorld(t, o) {
    let e = this.uvr.GetValue(t);
    e
      ? e.SetFloatValue(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float,
        )).SetFloatValue(o),
        this.uvr.SetValue(t, e));
  }
  GetFloatValuesByWorld(t) {
    t = this.uvr.GetValue(t);
    return t ? t.GetFloatValues() : void 0;
  }
  SetFloatValuesByWorld(t, o) {
    let e = this.uvr.GetValue(t);
    e
      ? e.SetFloatValues(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray,
        )).SetFloatValues(o),
        this.uvr.SetValue(t, e));
  }
  GetStringValueByWorld(t) {
    t = this.uvr.GetValue(t);
    return t ? t.GetStringValue() : void 0;
  }
  SetStringValueByWorld(t, o) {
    let e = this.uvr.GetValue(t);
    e
      ? e.SetStringValue(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String,
        )).SetStringValue(o),
        this.uvr.SetValue(t, e));
  }
  GetStringValuesByWorld(t) {
    t = this.uvr.GetValue(t);
    return t ? t.GetStringValues() : void 0;
  }
  SetStringValuesByWorld(t, o) {
    let e = this.uvr.GetValue(t);
    e
      ? e.SetStringValues(o)
      : ((e = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray,
        )).SetStringValues(o),
        this.uvr.SetValue(t, e));
  }
  SetValueByWorld(t, o) {
    this.uvr.SetValue(t, o);
  }
  RemoveValueByWorld(t) {
    this.uvr.RemoveValue(t);
  }
  SetVectorValueByWorld(t, o, e, l) {
    let a = this.uvr.GetValue(t);
    a
      ? a.SetVectorValue(o, e, l)
      : ((a = new BlackboardMap_1.BlackboardParam(
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Vector,
        )).SetVectorValue(o, e, l),
        this.uvr.SetValue(t, a));
  }
  GetVectorValueByWorld(t) {
    return this.uvr.GetValue(t)?.GetVectorValue();
  }
  GetIntValueByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) return t.GetBlackboard().GetValue(o)?.GetIntValue();
  }
  SetIntValueByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int,
          ),
          t.SetIntValue(l))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int,
          )).SetIntValue(l),
          o.SetValue(e, t));
    }
  }
  GetIntValuesByEntity(t, o) {
    var t = this.GetCreatureDataComponent(t);
    return (t = t && t.GetBlackboard().GetValue(o)) ? t.GetIntValues() : void 0;
  }
  SetIntValuesByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray,
          ),
          t.SetIntValues(l))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray,
          )).SetIntValues(l),
          o.SetValue(e, t));
    }
  }
  GetLongValueByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) return t.GetBlackboard().GetValue(o)?.GetLongValue();
  }
  SetLongValueByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long,
          ),
          t.SetLongValue(l))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long,
          )).SetLongValue(l),
          o.SetValue(e, t));
    }
  }
  GetLongValuesByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) return t.GetBlackboard().GetValue(o)?.GetLongValues();
  }
  SetLongValuesByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray,
          ),
          t.SetLongValues(l))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray,
          )).SetLongValues(l),
          o.SetValue(e, t));
    }
  }
  GetBooleanValueByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) return t.GetBlackboard().GetValue(o)?.GetBooleanValue();
  }
  SetBooleanValueByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean,
          ),
          t.SetBooleanValue(l))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean,
          )).SetBooleanValue(l),
          o.SetValue(e, t));
    }
  }
  GetFloatValueByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) return t.GetBlackboard().GetValue(o)?.GetFloatValue();
  }
  SetFloatValueByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float,
          ),
          t.SetFloatValue(l))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float,
          )).SetFloatValue(l),
          o.SetValue(e, t));
    }
  }
  GetFloatValuesByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) return t.GetBlackboard().GetValue(o)?.GetFloatValues();
  }
  SetFloatValuesByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray,
          ),
          t.SetFloatValues(l))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray,
          )).SetFloatValues(l),
          o.SetValue(e, t));
    }
  }
  GetStringValueByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) return t.GetBlackboard().GetValue(o)?.GetStringValue();
  }
  SetStringValueByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String,
          ),
          t.SetStringValue(l))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String,
          )).SetStringValue(l),
          o.SetValue(e, t));
    }
  }
  GetStringValuesByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) return t.GetBlackboard().GetValue(o)?.GetStringValues();
  }
  SetStringValuesByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray,
          ),
          t.SetStringValues(l))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray,
          )).SetStringValues(l),
          o.SetValue(e, t));
    }
  }
  GetVectorValueByEntity(t, o) {
    var t = this.GetCreatureDataComponent(t);
    return (t = t && t.GetBlackboard().GetValue(o))
      ? t.GetVectorValue()
      : void 0;
  }
  SetVectorValueByEntity(o, e, l, a, r) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Vector,
          ),
          t.SetVectorValue(l, a, r))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Vector,
          )).SetVectorValue(l, a, r),
          o.SetValue(e, t));
    }
  }
  GetVectorValuesByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) return t.GetBlackboard().GetValue(o)?.GetVectorValues();
  }
  SetVectorValuesByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_VectorArray,
          ),
          t.SetVectorValues(l))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_VectorArray,
          )).SetVectorValues(l),
          o.SetValue(e, t));
    }
  }
  GetRotatorValueByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) return t.GetBlackboard().GetValue(o)?.GetRotatorValue();
  }
  SetRotatorValueByEntity(o, e, l, a, r) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Rotator,
          ),
          t.SetRotatorValue(l, a, r))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Rotator,
          )).SetRotatorValue(l, a, r),
          o.SetValue(e, t));
    }
  }
  GetRotatorValuesByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) return t.GetBlackboard().GetValue(o)?.GetRotatorValues();
  }
  SetRotatorValuesByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_RotatorArray,
          ),
          t.SetRotatorValues(l))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_RotatorArray,
          )).SetRotatorValues(l),
          o.SetValue(e, t));
    }
  }
  GetEntityIdByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) return t.GetBlackboard().GetValue(o)?.GetIntValue();
  }
  SetEntityIdByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Entity,
          ),
          t.SetIntValue(l))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Entity,
          )).SetIntValue(l),
          o.SetValue(e, t));
    }
  }
  GetEntityIdsByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) return t.GetBlackboard().GetValue(o)?.GetIntValues();
  }
  SetEntityIdsByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      t
        ? (BlackboardMap_1.BlackboardMap.CheckValueType(
            e,
            t,
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_EntityArray,
          ),
          t.SetIntValues(l))
        : ((t = new BlackboardMap_1.BlackboardParam(
            Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_EntityArray,
          )).SetIntValues(l),
          o.SetValue(e, t));
    }
  }
  SetValueByEntity(t, o, e) {
    t = this.GetCreatureDataComponent(t);
    t && t.SetBlackboard(o, e);
  }
}
exports.BlackboardModel = BlackboardModel;
//# sourceMappingURL=BlackboardModel.js.map
