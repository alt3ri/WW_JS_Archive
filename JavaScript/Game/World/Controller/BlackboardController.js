"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackboardController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatDebugController_1 = require("../../Utils/CombatDebugController");
const BlackboardMap_1 = require("../Define/BlackboardMap");
class BlackboardController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(2169, BlackboardController.vgr),
      Net_1.Net.Register(12273, BlackboardController.Mgr),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveCreatureDataComponentCache,
        this.Sgr,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(2169),
      Net_1.Net.UnRegister(12273),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveCreatureDataComponentCache,
        this.Sgr,
      ),
      !0
    );
  }
  static Egr(t) {
    const o = Protocol_1.Aki.Protocol.GKn.create();
    (o.xFn = t), Net_1.Net.Call(10758, o, (t) => {});
  }
  static ygr(t, o) {
    let r;
    this.Igr() &&
      (((r = Protocol_1.Aki.Protocol.NKn.create()).rkn =
        MathUtils_1.MathUtils.NumberToLong(t)),
      (r.xFn = o),
      this.PushBlackboardParam(t, o));
  }
  static PushBlackboardParam(t, o) {
    let r = this.PendingBlackboardParams.get(t);
    r = r || new Map();
    for (const e of o)
      ConfigManager_1.ConfigManager.AiConfig.CheckBlackboardWhiteList(e.Ckn) &&
        (CombatDebugController_1.CombatDebugController.CombatDebug(
          "Ai",
          t,
          "请求修改黑板值",
          ["k", e.Ckn],
          ["v", e[e.gkn]],
        ),
        r.set(e.Ckn, e));
    r.size > 0 && this.PendingBlackboardParams.set(t, r);
  }
  static GetIntValueByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetIntValueByWorld(t);
  }
  static SetIntValueByWorld(t, o) {
    let r;
    ModelManager_1.ModelManager.BlackboardModel.SetIntValueByWorld(t, o),
      this.Igr() &&
        (((r = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int),
        (r.Ckn = t),
        (r.Z3n = o),
        (t = new Array()).push(r),
        this.Egr(t));
  }
  static GetIntValuesByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetIntValuesByWorld(t);
  }
  static SetIntValuesByWorld(t, o) {
    let r;
    ModelManager_1.ModelManager.BlackboardModel.SetIntValuesByWorld(t, o),
      this.Igr() &&
        (((r = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray),
        (r.Ckn = t),
        (r.D7n = Protocol_1.Aki.Protocol.c2s.create()),
        (r.D7n.A7n = o),
        (t = new Array()).push(r),
        this.Egr(t));
  }
  static GetLongValueByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetLongValueByWorld(t);
  }
  static SetLongValueByWorld(t, o) {
    let r;
    ModelManager_1.ModelManager.BlackboardModel.SetLongValueByWorld(t, o),
      this.Igr() &&
        (((r = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long),
        (r.Ckn = t),
        (r.U7n = MathUtils_1.MathUtils.BigIntToLong(o)),
        (t = new Array()).push(r),
        this.Egr(t));
  }
  static GetLongValuesByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetLongValuesByWorld(t);
  }
  static SetLongValuesByWorld(t, o) {
    if (
      (ModelManager_1.ModelManager.BlackboardModel.SetLongValuesByWorld(t, o),
      this.Igr())
    ) {
      const r = Protocol_1.Aki.Protocol.l2s.create();
      (r.Ikn = Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray),
        (r.Ckn = t),
        (r.R7n = Protocol_1.Aki.Protocol.d2s.create()),
        (r.R7n.A7n = new Array(o.length));
      for (let t = 0; t < o.length; t++) {
        const e = MathUtils_1.MathUtils.BigIntToLong(o[t]);
        r.R7n.A7n[t] = e;
      }
      t = new Array();
      t.push(r), this.Egr(t);
    }
  }
  static GetBooleanValueByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetBooleanValueByWorld(
      t,
    );
  }
  static SetBooleanValueByWorld(t, o) {
    let r;
    ModelManager_1.ModelManager.BlackboardModel.SetBooleanValueByWorld(t, o),
      this.Igr() &&
        (((r = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean),
        (r.Ckn = t),
        (r.x7n = o),
        (t = new Array()).push(r),
        this.Egr(t));
  }
  static GetFloatValueByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetFloatValueByWorld(t);
  }
  static SetFloatValueByWorld(t, o) {
    let r;
    ModelManager_1.ModelManager.BlackboardModel.SetFloatValueByWorld(t, o),
      this.Igr() &&
        (((r = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float),
        (r.Ckn = t),
        (r.P7n = o),
        (t = new Array()).push(r),
        this.Egr(t));
  }
  static GetFloatValuesByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetFloatValuesByWorld(t);
  }
  static SetFloatValuesByWorld(t, o) {
    let r;
    ModelManager_1.ModelManager.BlackboardModel.SetFloatValuesByWorld(t, o),
      this.Igr() &&
        (((r = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray),
        (r.Ckn = t),
        (r.B7n = Protocol_1.Aki.Protocol.C2s.create()),
        (r.B7n.A7n = o),
        (t = new Array()).push(r),
        this.Egr(t));
  }
  static GetStringValueByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetStringValueByWorld(t);
  }
  static SetStringValueByWorld(t, o) {
    let r;
    ModelManager_1.ModelManager.BlackboardModel.SetStringValueByWorld(t, o),
      this.Igr() &&
        (((r = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String),
        (r.Ckn = t),
        (r.t4n = o),
        (t = new Array()).push(r),
        this.Egr(t));
  }
  static GetStringValuesByWorld(t) {
    return ModelManager_1.ModelManager.BlackboardModel.GetStringValuesByWorld(
      t,
    );
  }
  static SetStringValuesByWorld(t, o) {
    let r;
    ModelManager_1.ModelManager.BlackboardModel.SetStringValuesByWorld(t, o),
      this.Igr() &&
        (((r = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray),
        (r.Ckn = t),
        (r.w7n = Protocol_1.Aki.Protocol.m2s.create()),
        (r.w7n.A7n = o),
        (t = new Array()).push(r),
        this.Egr(t));
  }
  static RemoveValueByWorld(t) {
    let o;
    ModelManager_1.ModelManager.BlackboardModel.RemoveValueByWorld(t),
      this.Igr() &&
        (((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_None),
        (o.Ckn = t),
        (t = new Array()).push(o),
        this.Egr(t));
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
    const e =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    e &&
      (ModelManager_1.ModelManager.BlackboardModel.SetIntValueByEntity(t, o, r),
      this.Igr()) &&
      (((t = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int),
      (t.Ckn = o),
      (t.Z3n = r),
      (o = e.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.ygr(o, r));
  }
  static GetIntValuesByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetIntValuesByEntity(
      t,
      o,
    );
  }
  static SetIntValuesByEntity(t, o, r) {
    const e =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    e &&
      (ModelManager_1.ModelManager.BlackboardModel.SetIntValuesByEntity(
        t,
        o,
        r,
      ),
      this.Igr()) &&
      (((t = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray),
      (t.Ckn = o),
      (t.D7n = Protocol_1.Aki.Protocol.c2s.create()),
      (t.D7n.A7n = r),
      (o = e.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.ygr(o, r));
  }
  static GetLongValueByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetLongValueByEntity(
      t,
      o,
    );
  }
  static SetLongValueByEntity(t, o, r) {
    const e =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    e &&
      (ModelManager_1.ModelManager.BlackboardModel.SetLongValueByEntity(
        t,
        o,
        r,
      ),
      this.Igr()) &&
      (((t = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long),
      (t.Ckn = o),
      (t.U7n = MathUtils_1.MathUtils.BigIntToLong(r)),
      (o = e.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.ygr(o, r));
  }
  static GetLongValuesByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetLongValuesByEntity(
      t,
      o,
    );
  }
  static SetLongValuesByEntity(t, o, r) {
    const e =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    if (
      e &&
      (ModelManager_1.ModelManager.BlackboardModel.SetLongValuesByEntity(
        t,
        o,
        r,
      ),
      this.Igr())
    ) {
      const a = Protocol_1.Aki.Protocol.l2s.create();
      (a.Ikn = Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray),
        (a.Ckn = o),
        (a.R7n = Protocol_1.Aki.Protocol.d2s.create()),
        (a.R7n.A7n = new Array(r.length));
      for (let t = 0; t < r.length; t++) {
        const l = MathUtils_1.MathUtils.BigIntToLong(r[t]);
        a.R7n.A7n[t] = l;
      }
      (t = e.GetCreatureDataId()), (o = new Array());
      o.push(a), this.ygr(t, o);
    }
  }
  static GetBooleanValueByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetBooleanValueByEntity(
      t,
      o,
    );
  }
  static SetBooleanValueByEntity(t, o, r) {
    const e =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    e &&
      (ModelManager_1.ModelManager.BlackboardModel.SetBooleanValueByEntity(
        t,
        o,
        r,
      ),
      this.Igr()) &&
      (((t = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean),
      (t.Ckn = o),
      (t.x7n = r),
      (o = e.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.ygr(o, r));
  }
  static GetFloatValueByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetFloatValueByEntity(
      t,
      o,
    );
  }
  static SetFloatValueByEntity(t, o, r) {
    const e =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    e &&
      (ModelManager_1.ModelManager.BlackboardModel.SetFloatValueByEntity(
        t,
        o,
        r,
      ),
      this.Igr()) &&
      (((t = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float),
      (t.Ckn = o),
      (t.P7n = r),
      (o = e.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.ygr(o, r));
  }
  static GetFloatValuesByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetFloatValuesByEntity(
      t,
      o,
    );
  }
  static SetFloatValuesByEntity(t, o, r) {
    const e =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    e &&
      (ModelManager_1.ModelManager.BlackboardModel.SetFloatValuesByEntity(
        t,
        o,
        r,
      ),
      this.Igr()) &&
      (((t = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray),
      (t.Ckn = o),
      (t.B7n = Protocol_1.Aki.Protocol.C2s.create()),
      (t.B7n.A7n = r),
      (o = e.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.ygr(o, r));
  }
  static GetStringValueByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetStringValueByEntity(
      t,
      o,
    );
  }
  static SetStringValueByEntity(t, o, r) {
    const e =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    e &&
      (ModelManager_1.ModelManager.BlackboardModel.SetStringValueByEntity(
        t,
        o,
        r,
      ),
      this.Igr()) &&
      (((t = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String),
      (t.Ckn = o),
      (t.t4n = r),
      (o = e.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.ygr(o, r));
  }
  static GetStringValuesByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetStringValuesByEntity(
      t,
      o,
    );
  }
  static SetStringValuesByEntity(t, o, r) {
    const e =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    e &&
      (ModelManager_1.ModelManager.BlackboardModel.SetStringValuesByEntity(
        t,
        o,
        r,
      ),
      this.Igr()) &&
      (((t = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray),
      (t.Ckn = o),
      (t.w7n = Protocol_1.Aki.Protocol.m2s.create()),
      (t.w7n.A7n = r),
      (o = e.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.ygr(o, r));
  }
  static GetVectorValueByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetVectorValueByEntity(
      t,
      o,
    );
  }
  static SetVectorValueByGlobal(t, o, r, e) {
    ModelManager_1.ModelManager.BlackboardModel.SetVectorValueByWorld(
      t,
      o,
      r,
      e,
    );
  }
  static SetVectorValueByEntity(t, o, r, e, a) {
    const l =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    l &&
      (ModelManager_1.ModelManager.BlackboardModel.SetVectorValueByEntity(
        t,
        o,
        r,
        e,
        a,
      ),
      this.Igr()) &&
      (((t = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Vector),
      (t.Ckn = o),
      (t.b7n = Protocol_1.Aki.Protocol.VBs.create()),
      (t.b7n.X = r),
      (t.b7n.Y = e),
      (t.b7n.Z = a),
      (o = l.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.ygr(o, r));
  }
  static GetVectorValuesByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetVectorValuesByEntity(
      t,
      o,
    );
  }
  static SetVectorValuesByEntity(t, o, r) {
    const e =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    e &&
      (ModelManager_1.ModelManager.BlackboardModel.SetVectorValuesByEntity(
        t,
        o,
        r,
      ),
      this.Igr()) &&
      (((t = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_VectorArray),
      (t.Ckn = o),
      (t.q7n = Protocol_1.Aki.Protocol.g2s.create()),
      (t.q7n.A7n = r),
      (o = e.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.ygr(o, r));
  }
  static GetRotatorValueByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetRotatorValueByEntity(
      t,
      o,
    );
  }
  static SetRotatorValueByEntity(t, o, r, e, a) {
    const l =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    l &&
      (ModelManager_1.ModelManager.BlackboardModel.SetRotatorValueByEntity(
        t,
        o,
        r,
        e,
        a,
      ),
      this.Igr()) &&
      (((t = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Rotator),
      (t.Ckn = o),
      (t.G7n = Protocol_1.Aki.Protocol.iws.create()),
      (t.G7n.Pitch = r),
      (t.G7n.Roll = e),
      (t.G7n.Yaw = a),
      (o = l.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.ygr(o, r));
  }
  static GetRotatorValuesByEntity(t, o) {
    return ModelManager_1.ModelManager.BlackboardModel.GetRotatorValuesByEntity(
      t,
      o,
    );
  }
  static SetRotatorValuesByEntity(t, o, r) {
    const e =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    e &&
      (ModelManager_1.ModelManager.BlackboardModel.SetRotatorValuesByEntity(
        t,
        o,
        r,
      ),
      this.Igr()) &&
      (((t = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_RotatorArray),
      (t.Ckn = o),
      (t.O7n = Protocol_1.Aki.Protocol.f2s.create()),
      (t.O7n.A7n = r),
      (o = e.GetCreatureDataId()),
      (r = new Array()).push(t),
      this.ygr(o, r));
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
      this.Igr()) &&
      (((t = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Entity),
      (t.Ckn = o),
      (t.U7n = MathUtils_1.MathUtils.NumberToLong(r)),
      (o = new Array()).push(t),
      this.ygr(r, o));
  }
  static GetEntityIdsByEntity(t, o) {
    t = ModelManager_1.ModelManager.BlackboardModel.GetEntityIdsByEntity(t, o);
    if (t) {
      const r = new Array();
      for (const e of t)
        r.push(ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Id ?? 0);
      return r;
    }
  }
  static SetEntityIdsByEntity(t, o, r) {
    const e =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    if (e) {
      const a = new Array();
      for (const i of r)
        a.push(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(i));
      if (
        (ModelManager_1.ModelManager.BlackboardModel.SetEntityIdsByEntity(
          t,
          o,
          a,
        ),
        this.Igr())
      ) {
        const l = Protocol_1.Aki.Protocol.l2s.create();
        (l.Ikn =
          Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_EntityArray),
          (l.Ckn = o),
          (l.R7n = Protocol_1.Aki.Protocol.d2s.create()),
          (l.R7n.A7n = new Array(r.length));
        for (let t = 0; t < a.length; t++) {
          const n = MathUtils_1.MathUtils.NumberToLong(a[t]);
          l.R7n.A7n[t] = n;
        }
        (t = e.GetCreatureDataId()), (o = new Array());
        o.push(l), this.ygr(t, o);
      }
    }
  }
  static RemoveValueByEntity(t, o) {
    let r;
    var t =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    t &&
      (t.RemoveBlackboard(o) || this.Igr()) &&
      ((t = t.GetCreatureDataId()),
      ((r = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
        Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_None),
      (r.Ckn = o),
      (o = new Array()).push(r),
      this.ygr(t, o));
  }
  static HasValueByEntity(t, o) {
    t = ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    return !!t && t.GetBlackboard().HasValue(o);
  }
  static ClearValuesByEntity(t, o) {
    let r =
      ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(t);
    if (r) {
      r = r.GetBlackboard();
      if (this.Igr()) {
        const e = new Array();
        for (const o of r.BlackboardMap.keys()) {
          const a = Protocol_1.Aki.Protocol.l2s.create();
          (a.Ikn = Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_None),
            (a.Ckn = o),
            e.push(a);
        }
        e.length > 0 &&
          ((t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t)),
          this.ygr(t, e));
      }
      r.Clear();
    }
  }
  static Igr() {
    return GlobalData_1.GlobalData.Networking();
  }
}
((exports.BlackboardController = BlackboardController).Sgr = (t) => {
  ModelManager_1.ModelManager.BlackboardModel.RemoveCreatureDataComponent(t);
}),
  (BlackboardController.vgr = (t) => {
    BlackboardController.SetWorldBlackboardsByProtocol(t.xFn);
  }),
  (BlackboardController.PendingBlackboardParams = new Map()),
  (BlackboardController.Mgr = (t) => {
    const o = MathUtils_1.MathUtils.LongToNumber(t.rkn);
    const r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    r
      ? r.Entity.GetComponent(0).SetBlackboardsByProtocol(t.xFn)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.EntityBlackboardNotify] 不存在实体数据CreatureData。",
          ["CreatureDataId", o],
        );
  });
// # sourceMappingURL=BlackboardController.js.map
