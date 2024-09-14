"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackboardController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  BlackboardMap_1 = require("../Define/BlackboardMap");
class BlackboardController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(29215, BlackboardController.g0r),
      Net_1.Net.Register(18922, BlackboardController.f0r),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveCreatureDataComponentCache,
        this.p0r,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(29215),
      Net_1.Net.UnRegister(18922),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveCreatureDataComponentCache,
        this.p0r,
      ),
      !0
    );
  }
  static v0r(t) {
    var o = Protocol_1.Aki.Protocol.OJn.create();
    (o.C6n = t), Net_1.Net.Call(27604, o, (t) => {});
  }
  static M0r(t, o) {
    var r;
    this.E0r() &&
      (((r = Protocol_1.Aki.Protocol.FJn.create()).F4n =
        MathUtils_1.MathUtils.NumberToLong(t)),
      (r.C6n = o),
      ModelManager_1.ModelManager.GameModeModel.IsMulti) &&
      this.PushBlackboardParam(t, o);
  }
  static PushBlackboardParam(t, o) {
    let r = this.PendingBlackboardParams.get(t);
    r = r || new Map();
    for (const a of o)
      ConfigManager_1.ConfigManager.AiConfig.CheckBlackboardWhiteList(a.Z4n) &&
        r.set(a.Z4n, a);
    0 < r.size && this.PendingBlackboardParams.set(t, r);
  }
  static GetIntValueByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetIntValueByWorld(t);
  }
  static SetIntValueByWorld(t, o) {
    var r;
    ModelManager_1.ModelManager.BlackboardModel.SetIntValueByWorld(t, o),
      this.E0r() &&
        (((r = Protocol_1.Aki.Protocol.oNs.create()).h5n =
          Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Int),
        (r.Z4n = t),
        (r.V8n = o),
        (t = new Array()).push(r),
        this.v0r(t));
  }
  static GetIntValuesByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetIntValuesByWorld(t);
  }
  static SetIntValuesByWorld(t, o) {
    var r;
    ModelManager_1.ModelManager.BlackboardModel.SetIntValuesByWorld(t, o),
      this.E0r() &&
        (((r = Protocol_1.Aki.Protocol.oNs.create()).h5n =
          Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_IntArray),
        (r.Z4n = t),
        (r.CKn = Protocol_1.Aki.Protocol.aNs.create()),
        (r.CKn.gKn = o),
        (t = new Array()).push(r),
        this.v0r(t));
  }
  static GetLongValueByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetLongValueByWorld(t);
  }
  static SetLongValueByWorld(t, o) {
    var r;
    ModelManager_1.ModelManager.BlackboardModel.SetLongValueByWorld(t, o),
      this.E0r() &&
        (((r = Protocol_1.Aki.Protocol.oNs.create()).h5n =
          Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Long),
        (r.Z4n = t),
        (r.fKn = MathUtils_1.MathUtils.BigIntToLong(o)),
        (t = new Array()).push(r),
        this.v0r(t));
  }
  static GetLongValuesByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetLongValuesByWorld(t);
  }
  static SetLongValuesByWorld(t, o) {
    if (
      (ModelManager_1.ModelManager.BlackboardModel.SetLongValuesByWorld(t, o),
      this.E0r())
    ) {
      var r = Protocol_1.Aki.Protocol.oNs.create();
      (r.h5n = Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_LongArray),
        (r.Z4n = t),
        (r.pKn = Protocol_1.Aki.Protocol.hNs.create()),
        (r.pKn.gKn = new Array(o.length));
      for (let t = 0; t < o.length; t++) {
        var a = MathUtils_1.MathUtils.BigIntToLong(o[t]);
        r.pKn.gKn[t] = a;
      }
      t = new Array();
      t.push(r), this.v0r(t);
    }
  }
  static GetBooleanValueByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetBooleanValueByWorld(
      t,
    );
  }
  static SetBooleanValueByWorld(t, o) {
    var r;
    ModelManager_1.ModelManager.BlackboardModel.SetBooleanValueByWorld(t, o),
      this.E0r() &&
        (((r = Protocol_1.Aki.Protocol.oNs.create()).h5n =
          Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Boolean),
        (r.Z4n = t),
        (r.vKn = o),
        (t = new Array()).push(r),
        this.v0r(t));
  }
  static GetFloatValueByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetFloatValueByWorld(t);
  }
  static SetFloatValueByWorld(t, o) {
    var r;
    ModelManager_1.ModelManager.BlackboardModel.SetFloatValueByWorld(t, o),
      this.E0r() &&
        (((r = Protocol_1.Aki.Protocol.oNs.create()).h5n =
          Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Float),
        (r.Z4n = t),
        (r.MKn = o),
        (t = new Array()).push(r),
        this.v0r(t));
  }
  static GetFloatValuesByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetFloatValuesByWorld(t);
  }
  static SetFloatValuesByWorld(t, o) {
    var r;
    ModelManager_1.ModelManager.BlackboardModel.SetFloatValuesByWorld(t, o),
      this.E0r() &&
        (((r = Protocol_1.Aki.Protocol.oNs.create()).h5n =
          Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_FloatArray),
        (r.Z4n = t),
        (r.SKn = Protocol_1.Aki.Protocol._Ns.create()),
        (r.SKn.gKn = o),
        (t = new Array()).push(r),
        this.v0r(t));
  }
  static GetStringValueByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetStringValueByWorld(t);
  }
  static SetStringValueByWorld(t, o) {
    var r;
    ModelManager_1.ModelManager.BlackboardModel.SetStringValueByWorld(t, o),
      this.E0r() &&
        (((r = Protocol_1.Aki.Protocol.oNs.create()).h5n =
          Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_String),
        (r.Z4n = t),
        (r.j8n = o),
        (t = new Array()).push(r),
        this.v0r(t));
  }
  static GetStringValuesByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetStringValuesByWorld(
      t,
    );
  }
  static SetStringValuesByWorld(t, o) {
    var r;
    ModelManager_1.ModelManager.BlackboardModel.SetStringValuesByWorld(t, o),
      this.E0r() &&
        (((r = Protocol_1.Aki.Protocol.oNs.create()).h5n =
          Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_StringArray),
        (r.Z4n = t),
        (r.EKn = Protocol_1.Aki.Protocol.lNs.create()),
        (r.EKn.gKn = o),
        (t = new Array()).push(r),
        this.v0r(t));
  }
  static RemoveValueByWorld(t) {
    var o;
    ModelManager_1.ModelManager.BlackboardModel.RemoveValueByWorld(t),
      this.E0r() &&
        (((o = Protocol_1.Aki.Protocol.oNs.create()).h5n =
          Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_None),
        (o.Z4n = t),
        (t = new Array()).push(o),
        this.v0r(t));
  }
  static SetWorldBlackboardsByProtocol(t) {
    if (void 0 !== t) for (const o of t) this.SetWorldBlackboardByProtocol(o);
  }
  static SetWorldBlackboardByProtocol(t) {
    void 0 !== t &&
      void 0 !== (t = BlackboardMap_1.BlackboardParam.CreateByProtocol(t)) &&
      ModelManager_1.ModelManager.BlackboardModel.SetValueByWorld(
        t.GetKey(),
        t,
      );
  }
  static GetIntValueByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetIntValueByEntity(
      t,
      o,
    );
  }
  static SetIntValueByEntity(t, o, r) {
    var a =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    a &&
      (ModelManager_1.ModelManager.BlackboardModel.SetIntValueByEntity(t, o, r),
      this.E0r()) &&
      (((t = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Int),
      (t.Z4n = o),
      (t.V8n = r),
      (o = a.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.M0r(o, r));
  }
  static GetIntValuesByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetIntValuesByEntity(
      t,
      o,
    );
  }
  static SetIntValuesByEntity(t, o, r) {
    var a =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    a &&
      (ModelManager_1.ModelManager.BlackboardModel.SetIntValuesByEntity(
        t,
        o,
        r,
      ),
      this.E0r()) &&
      (((t = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_IntArray),
      (t.Z4n = o),
      (t.CKn = Protocol_1.Aki.Protocol.aNs.create()),
      (t.CKn.gKn = r),
      (o = a.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.M0r(o, r));
  }
  static GetLongValueByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetLongValueByEntity(
      t,
      o,
    );
  }
  static SetLongValueByEntity(t, o, r) {
    var a =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    a &&
      (ModelManager_1.ModelManager.BlackboardModel.SetLongValueByEntity(
        t,
        o,
        r,
      ),
      this.E0r()) &&
      (((t = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Long),
      (t.Z4n = o),
      (t.fKn = MathUtils_1.MathUtils.BigIntToLong(r)),
      (o = a.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.M0r(o, r));
  }
  static GetLongValuesByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetLongValuesByEntity(
      t,
      o,
    );
  }
  static SetLongValuesByEntity(t, o, r) {
    var a =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    if (
      a &&
      (ModelManager_1.ModelManager.BlackboardModel.SetLongValuesByEntity(
        t,
        o,
        r,
      ),
      this.E0r())
    ) {
      var e = Protocol_1.Aki.Protocol.oNs.create();
      (e.h5n = Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_LongArray),
        (e.Z4n = o),
        (e.pKn = Protocol_1.Aki.Protocol.hNs.create()),
        (e.pKn.gKn = new Array(r.length));
      for (let t = 0; t < r.length; t++) {
        var l = MathUtils_1.MathUtils.BigIntToLong(r[t]);
        e.pKn.gKn[t] = l;
      }
      (t = a.GetCreatureDataId()), (o = new Array());
      o.push(e), this.M0r(t, o);
    }
  }
  static GetBooleanValueByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetBooleanValueByEntity(
      t,
      o,
    );
  }
  static SetBooleanValueByEntity(t, o, r) {
    var a =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    a &&
      (ModelManager_1.ModelManager.BlackboardModel.SetBooleanValueByEntity(
        t,
        o,
        r,
      ),
      this.E0r()) &&
      (((t = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Boolean),
      (t.Z4n = o),
      (t.vKn = r),
      (o = a.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.M0r(o, r));
  }
  static GetFloatValueByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetFloatValueByEntity(
      t,
      o,
    );
  }
  static SetFloatValueByEntity(t, o, r) {
    var a =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    a &&
      (ModelManager_1.ModelManager.BlackboardModel.SetFloatValueByEntity(
        t,
        o,
        r,
      ),
      this.E0r()) &&
      (((t = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Float),
      (t.Z4n = o),
      (t.MKn = r),
      (o = a.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.M0r(o, r));
  }
  static GetFloatValuesByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetFloatValuesByEntity(
      t,
      o,
    );
  }
  static SetFloatValuesByEntity(t, o, r) {
    var a =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    a &&
      (ModelManager_1.ModelManager.BlackboardModel.SetFloatValuesByEntity(
        t,
        o,
        r,
      ),
      this.E0r()) &&
      (((t = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_FloatArray),
      (t.Z4n = o),
      (t.SKn = Protocol_1.Aki.Protocol._Ns.create()),
      (t.SKn.gKn = r),
      (o = a.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.M0r(o, r));
  }
  static GetStringValueByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetStringValueByEntity(
      t,
      o,
    );
  }
  static SetStringValueByEntity(t, o, r) {
    var a =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    a &&
      (ModelManager_1.ModelManager.BlackboardModel.SetStringValueByEntity(
        t,
        o,
        r,
      ),
      this.E0r()) &&
      (((t = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_String),
      (t.Z4n = o),
      (t.j8n = r),
      (o = a.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.M0r(o, r));
  }
  static GetStringValuesByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetStringValuesByEntity(
      t,
      o,
    );
  }
  static SetStringValuesByEntity(t, o, r) {
    var a =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    a &&
      (ModelManager_1.ModelManager.BlackboardModel.SetStringValuesByEntity(
        t,
        o,
        r,
      ),
      this.E0r()) &&
      (((t = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_StringArray),
      (t.Z4n = o),
      (t.EKn = Protocol_1.Aki.Protocol.lNs.create()),
      (t.EKn.gKn = r),
      (o = a.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.M0r(o, r));
  }
  static GetVectorValueByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetVectorValueByEntity(
      t,
      o,
    );
  }
  static SetVectorValueByGlobal(t, o, r, a) {
    ModelManager_1.ModelManager.BlackboardModel.SetVectorValueByWorld(
      t,
      o,
      r,
      a,
    );
  }
  static SetVectorValueByEntity(t, o, r, a, e) {
    var l =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    l &&
      (ModelManager_1.ModelManager.BlackboardModel.SetVectorValueByEntity(
        t,
        o,
        r,
        a,
        e,
      ),
      this.E0r()) &&
      (((t = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Vector),
      (t.Z4n = o),
      (t.yKn = Protocol_1.Aki.Protocol.Gks.create()),
      (t.yKn.X = r),
      (t.yKn.Y = a),
      (t.yKn.Z = e),
      (o = l.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.M0r(o, r));
  }
  static GetVectorValuesByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetVectorValuesByEntity(
      t,
      o,
    );
  }
  static SetVectorValuesByEntity(t, o, r) {
    var a =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    a &&
      (ModelManager_1.ModelManager.BlackboardModel.SetVectorValuesByEntity(
        t,
        o,
        r,
      ),
      this.E0r()) &&
      (((t = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_VectorArray),
      (t.Z4n = o),
      (t.IKn = Protocol_1.Aki.Protocol.uNs.create()),
      (t.IKn.gKn = r),
      (o = a.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.M0r(o, r));
  }
  static GetRotatorValueByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetRotatorValueByEntity(
      t,
      o,
    );
  }
  static SetRotatorValueByEntity(t, o, r, a, e) {
    var l =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    l &&
      (ModelManager_1.ModelManager.BlackboardModel.SetRotatorValueByEntity(
        t,
        o,
        r,
        a,
        e,
      ),
      this.E0r()) &&
      (((t = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Rotator),
      (t.Z4n = o),
      (t.TKn = Protocol_1.Aki.Protocol.D2s.create()),
      (t.TKn.Pitch = r),
      (t.TKn.Roll = a),
      (t.TKn.Yaw = e),
      (o = l.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.M0r(o, r));
  }
  static GetRotatorValuesByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetRotatorValuesByEntity(
      t,
      o,
    );
  }
  static SetRotatorValuesByEntity(t, o, r) {
    var a =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    a &&
      (ModelManager_1.ModelManager.BlackboardModel.SetRotatorValuesByEntity(
        t,
        o,
        r,
      ),
      this.E0r()) &&
      (((t = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_RotatorArray),
      (t.Z4n = o),
      (t.LKn = Protocol_1.Aki.Protocol.cNs.create()),
      (t.LKn.gKn = r),
      (o = a.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.M0r(o, r));
  }
  static GetEntityIdByEntity(t, o) {
    t = ModelManager_1.ModelManager.BlackboardModel.GetEntityIdByEntity(t, o);
    if (t)
      return ModelManager_1.ModelManager.CreatureModel.GetEntity(t)?.Id ?? 0;
  }
  static SetEntityIdByEntity(t, o, r) {
    var r =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(r);
    r &&
      ((r = r.GetCreatureDataId()),
      ModelManager_1.ModelManager.BlackboardModel.SetEntityIdByEntity(t, o, r),
      this.E0r()) &&
      (((t = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Entity),
      (t.Z4n = o),
      (t.fKn = MathUtils_1.MathUtils.NumberToLong(r)),
      (o = new Array()).push(t),
      this.M0r(r, o));
  }
  static GetEntityIdsByEntity(t, o) {
    t = ModelManager_1.ModelManager.BlackboardModel.GetEntityIdsByEntity(t, o);
    if (t) {
      var r = new Array();
      for (const a of t)
        r.push(ModelManager_1.ModelManager.CreatureModel.GetEntity(a)?.Id ?? 0);
      return r;
    }
  }
  static SetEntityIdsByEntity(t, o, r) {
    var a =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    if (a) {
      var e = new Array();
      for (const i of r)
        e.push(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(i));
      if (
        (ModelManager_1.ModelManager.BlackboardModel.SetEntityIdsByEntity(
          t,
          o,
          e,
        ),
        this.E0r())
      ) {
        var l = Protocol_1.Aki.Protocol.oNs.create();
        (l.h5n =
          Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_EntityArray),
          (l.Z4n = o),
          (l.pKn = Protocol_1.Aki.Protocol.hNs.create()),
          (l.pKn.gKn = new Array(r.length));
        for (let t = 0; t < e.length; t++) {
          var n = MathUtils_1.MathUtils.NumberToLong(e[t]);
          l.pKn.gKn[t] = n;
        }
        (t = a.GetCreatureDataId()), (o = new Array());
        o.push(l), this.M0r(t, o);
      }
    }
  }
  static RemoveValueByEntity(t, o) {
    var r,
      t =
        ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    t &&
      (t.RemoveBlackboard(o) || this.E0r()) &&
      ((t = t.GetCreatureDataId()),
      ((r = Protocol_1.Aki.Protocol.oNs.create()).h5n =
        Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_None),
      (r.Z4n = o),
      (o = new Array()).push(r),
      this.M0r(t, o));
  }
  static HasValueByEntity(t, o) {
    t = ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    return !!t && t.GetBlackboard().HasValue(o);
  }
  static ClearValuesByEntity(t, o) {
    var r =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    if (r) {
      r = r.GetBlackboard();
      if (this.E0r()) {
        var a = new Array();
        for (const o of r.BlackboardMap.keys()) {
          var e = Protocol_1.Aki.Protocol.oNs.create();
          (e.h5n = Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_None),
            (e.Z4n = o),
            a.push(e);
        }
        0 < a.length &&
          ((t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t)),
          this.M0r(t, a));
      }
      r.Clear();
    }
  }
  static E0r() {
    return GlobalData_1.GlobalData.Networking();
  }
}
((exports.BlackboardController = BlackboardController).p0r = (t) => {
  ModelManager_1.ModelManager.BlackboardModel.RemoveCreatureDataComponent(t);
}),
  (BlackboardController.g0r = (t) => {
    BlackboardController.SetWorldBlackboardsByProtocol(t.C6n);
  }),
  (BlackboardController.PendingBlackboardParams = new Map()),
  (BlackboardController.f0r = (t) => {
    var o = MathUtils_1.MathUtils.LongToNumber(t.F4n),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    r
      ? r.Entity.GetComponent(0).SetBlackboardsByProtocol(t.C6n)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.EntityBlackboardNotify] 不存在实体数据CreatureData。",
          ["CreatureDataId", o],
        );
  });
//# sourceMappingURL=BlackboardController.js.map
