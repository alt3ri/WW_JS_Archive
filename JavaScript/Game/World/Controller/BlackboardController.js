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
      Net_1.Net.Register(18875, BlackboardController.g0r),
      Net_1.Net.Register(23083, BlackboardController.f0r),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveCreatureDataComponentCache,
        this.p0r,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(18875),
      Net_1.Net.UnRegister(23083),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveCreatureDataComponentCache,
        this.p0r,
      ),
      !0
    );
  }
  static v0r(t) {
    var o = Protocol_1.Aki.Protocol.UJn.create();
    (o.s6n = t), Net_1.Net.Call(8512, o, (t) => {});
  }
  static M0r(t, o) {
    var r;
    this.E0r() &&
      (((r = Protocol_1.Aki.Protocol.bJn.create()).P4n =
        MathUtils_1.MathUtils.NumberToLong(t)),
      (r.s6n = o),
      this.PushBlackboardParam(t, o));
  }
  static PushBlackboardParam(t, o) {
    let r = this.PendingBlackboardParams.get(t);
    r = r || new Map();
    for (const a of o)
      ConfigManager_1.ConfigManager.AiConfig.CheckBlackboardWhiteList(a.j4n) &&
        r.set(a.j4n, a);
    0 < r.size && this.PendingBlackboardParams.set(t, r);
  }
  static GetIntValueByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetIntValueByWorld(t);
  }
  static SetIntValueByWorld(t, o) {
    var r;
    ModelManager_1.ModelManager.BlackboardModel.SetIntValueByWorld(t, o),
      this.E0r() &&
        (((r = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
          Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Int),
        (r.j4n = t),
        (r.B8n = o),
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
        (((r = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
          Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_IntArray),
        (r.j4n = t),
        (r.sKn = Protocol_1.Aki.Protocol.eNs.create()),
        (r.sKn.aKn = o),
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
        (((r = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
          Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Long),
        (r.j4n = t),
        (r.hKn = MathUtils_1.MathUtils.BigIntToLong(o)),
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
      var r = Protocol_1.Aki.Protocol.Jks.create();
      (r.Z4n = Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_LongArray),
        (r.j4n = t),
        (r.lKn = Protocol_1.Aki.Protocol.tNs.create()),
        (r.lKn.aKn = new Array(o.length));
      for (let t = 0; t < o.length; t++) {
        var a = MathUtils_1.MathUtils.BigIntToLong(o[t]);
        r.lKn.aKn[t] = a;
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
        (((r = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
          Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Boolean),
        (r.j4n = t),
        (r._Kn = o),
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
        (((r = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
          Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Float),
        (r.j4n = t),
        (r.uKn = o),
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
        (((r = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
          Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_FloatArray),
        (r.j4n = t),
        (r.cKn = Protocol_1.Aki.Protocol.rNs.create()),
        (r.cKn.aKn = o),
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
        (((r = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
          Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_String),
        (r.j4n = t),
        (r.b8n = o),
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
        (((r = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
          Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_StringArray),
        (r.j4n = t),
        (r.mKn = Protocol_1.Aki.Protocol.iNs.create()),
        (r.mKn.aKn = o),
        (t = new Array()).push(r),
        this.v0r(t));
  }
  static RemoveValueByWorld(t) {
    var o;
    ModelManager_1.ModelManager.BlackboardModel.RemoveValueByWorld(t),
      this.E0r() &&
        (((o = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
          Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_None),
        (o.j4n = t),
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
      (((t = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Int),
      (t.j4n = o),
      (t.B8n = r),
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
      (((t = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_IntArray),
      (t.j4n = o),
      (t.sKn = Protocol_1.Aki.Protocol.eNs.create()),
      (t.sKn.aKn = r),
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
      (((t = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Long),
      (t.j4n = o),
      (t.hKn = MathUtils_1.MathUtils.BigIntToLong(r)),
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
      var e = Protocol_1.Aki.Protocol.Jks.create();
      (e.Z4n = Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_LongArray),
        (e.j4n = o),
        (e.lKn = Protocol_1.Aki.Protocol.tNs.create()),
        (e.lKn.aKn = new Array(r.length));
      for (let t = 0; t < r.length; t++) {
        var l = MathUtils_1.MathUtils.BigIntToLong(r[t]);
        e.lKn.aKn[t] = l;
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
      (((t = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Boolean),
      (t.j4n = o),
      (t._Kn = r),
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
      (((t = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Float),
      (t.j4n = o),
      (t.uKn = r),
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
      (((t = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_FloatArray),
      (t.j4n = o),
      (t.cKn = Protocol_1.Aki.Protocol.rNs.create()),
      (t.cKn.aKn = r),
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
      (((t = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_String),
      (t.j4n = o),
      (t.b8n = r),
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
      (((t = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_StringArray),
      (t.j4n = o),
      (t.mKn = Protocol_1.Aki.Protocol.iNs.create()),
      (t.mKn.aKn = r),
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
      (((t = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Vector),
      (t.j4n = o),
      (t.dKn = Protocol_1.Aki.Protocol.Pks.create()),
      (t.dKn.X = r),
      (t.dKn.Y = a),
      (t.dKn.Z = e),
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
      (((t = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_VectorArray),
      (t.j4n = o),
      (t.CKn = Protocol_1.Aki.Protocol.oNs.create()),
      (t.CKn.aKn = r),
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
      (((t = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Rotator),
      (t.j4n = o),
      (t.gKn = Protocol_1.Aki.Protocol.S2s.create()),
      (t.gKn.Pitch = r),
      (t.gKn.Roll = a),
      (t.gKn.Yaw = e),
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
      (((t = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_RotatorArray),
      (t.j4n = o),
      (t.fKn = Protocol_1.Aki.Protocol.nNs.create()),
      (t.fKn.aKn = r),
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
      (((t = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_Entity),
      (t.j4n = o),
      (t.hKn = MathUtils_1.MathUtils.NumberToLong(r)),
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
        var l = Protocol_1.Aki.Protocol.Jks.create();
        (l.Z4n =
          Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_EntityArray),
          (l.j4n = o),
          (l.lKn = Protocol_1.Aki.Protocol.tNs.create()),
          (l.lKn.aKn = new Array(r.length));
        for (let t = 0; t < e.length; t++) {
          var n = MathUtils_1.MathUtils.NumberToLong(e[t]);
          l.lKn.aKn[t] = n;
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
      ((r = Protocol_1.Aki.Protocol.Jks.create()).Z4n =
        Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_None),
      (r.j4n = o),
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
          var e = Protocol_1.Aki.Protocol.Jks.create();
          (e.Z4n = Protocol_1.Aki.Protocol.Zks.Proto_BlackboardParamType_None),
            (e.j4n = o),
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
    BlackboardController.SetWorldBlackboardsByProtocol(t.s6n);
  }),
  (BlackboardController.PendingBlackboardParams = new Map()),
  (BlackboardController.f0r = (t) => {
    var o = MathUtils_1.MathUtils.LongToNumber(t.P4n),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    r
      ? r.Entity.GetComponent(0).SetBlackboardsByProtocol(t.s6n)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.EntityBlackboardNotify] 不存在实体数据CreatureData。",
          ["CreatureDataId", o],
        );
  });
//# sourceMappingURL=BlackboardController.js.map
