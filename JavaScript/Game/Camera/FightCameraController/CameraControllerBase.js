"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraControllerBase = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
class CameraControllerBase {
  constructor(e) {
    (this.u1e = !0),
      (this.c1e = new Set()),
      (this.m1e = new Map()),
      (this.$ = new Map()),
      (this.d1e = new Map()),
      (this.C1e = new Map()),
      (this.g1e = new Set()),
      (this.OnChangeRole = (e, t) => {}),
      (this.Camera = e),
      this.OnInit();
  }
  SetConfigMap(e, t) {
    this.$.has(e) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("Camera", 6, "重复注册了Key", ["Key", e]),
      this.g1e.has(t) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Camera", 6, "重复注册了Value", ["value", t]),
      this.$.set(e, t),
      this.g1e.add(t);
  }
  SetCurveConfigMap(e, t) {
    this.C1e.has(e) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("Camera", 6, "重复注册了Key", ["Key", e]),
      this.g1e.has(t) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Camera", 6, "重复注册了Value", ["value", t]),
      this.C1e.set(e, t),
      this.g1e.add(t);
  }
  f1e(e, t) {
    this[e] = t;
  }
  p1e(e, t) {
    this[e] = t;
  }
  SetDefaultConfigs(t, a) {
    for (let e = 0; e < t.Num(); e++) {
      var r = t.GetKey(e);
      this.m1e.set(t.GetKey(e), t.Get(r));
    }
    for (let e = 0; e < a.Num(); e++) {
      var s = a.GetKey(e);
      this.d1e.set(
        a.GetKey(e),
        CurveUtils_1.CurveUtils.CreateCurveByStruct(a.Get(s)),
      );
    }
  }
  SetConfigs(e, t) {
    if (e) {
      for (var [a, r] of e) {
        a = this.$.get(a);
        this.f1e(a, r);
      }
      for (var [s, i] of this.$)
        void 0 === this[i] &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              6,
              "CameraController缺少配置",
              ["CameraType", this.constructor],
              ["key", s],
              ["value", i],
            ),
          this.f1e(i, 1));
    }
    if (t) {
      for (var [o, n] of t) {
        o = this.C1e.get(o);
        this.p1e(o, n);
      }
      for (var [C, l] of this.C1e)
        void 0 === this[l] &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              6,
              "CameraController缺少曲线配置",
              ["CameraType", this.constructor.name],
              ["key", C],
              ["value", l],
            ),
          this.p1e(l, CurveUtils_1.CurveUtils.CreateCurve(0)));
    }
  }
  ResetDefaultConfig() {
    this.SetConfigs(this.m1e, this.d1e);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.OnChangeRole,
    );
  }
  OnEnd() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.OnChangeRole,
    );
  }
  OnInit() {}
  OnEnable() {}
  OnDisable() {}
  UpdateCustomEnableCondition() {
    return !0;
  }
  UpdateInternal(e) {}
  UpdateDeactivateInternal(e) {}
  Lock(e) {
    var t = this.IsActivate;
    this.c1e.add(e), !this.IsActivate && t && this.OnDisable();
  }
  Unlock(e) {
    var t = this.IsActivate;
    this.c1e.delete(e), this.IsActivate && !t && this.OnEnable();
  }
  Update(e) {
    var t = this.IsActivate;
    CameraControllerBase.ZKa.Start(),
      (this.u1e = this.UpdateCustomEnableCondition()),
      CameraControllerBase.ZKa.Stop(),
      this.IsActivate !== t &&
        (this.IsActivate
          ? (CameraControllerBase.e$a.Start(),
            this.OnEnable(),
            CameraControllerBase.e$a)
          : (CameraControllerBase.t$a.Start(),
            this.OnDisable(),
            CameraControllerBase.t$a)
        ).Stop(),
      (this.IsActivate
        ? (CameraControllerBase.i$a.Start(),
          this.UpdateInternal(e),
          CameraControllerBase.i$a)
        : (CameraControllerBase.r$a.Start(),
          this.UpdateDeactivateInternal(e),
          CameraControllerBase.r$a)
      ).Stop();
  }
  get IsActivate() {
    return this.u1e && 0 === this.c1e.size;
  }
  GetConfigMapValue(e) {
    return String(this.$.get(e));
  }
}
((exports.CameraControllerBase = CameraControllerBase).ZKa =
  Stats_1.Stat.Create("UpdateCustomEnableConditionStat")),
  (CameraControllerBase.e$a = Stats_1.Stat.Create("OnEnableStat")),
  (CameraControllerBase.t$a = Stats_1.Stat.Create("OnDisableStat")),
  (CameraControllerBase.i$a = Stats_1.Stat.Create("UpdateInternalStat")),
  (CameraControllerBase.r$a = Stats_1.Stat.Create(
    "UpdateDeactivateInternalStat",
  ));
//# sourceMappingURL=CameraControllerBase.js.map
