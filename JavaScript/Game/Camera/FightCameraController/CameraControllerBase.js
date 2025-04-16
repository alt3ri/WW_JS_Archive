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
      var o = a.GetKey(e);
      this.d1e.set(
        a.GetKey(e),
        CurveUtils_1.CurveUtils.CreateCurveByStruct(a.Get(o)),
      );
    }
  }
  SetConfigs(e, t) {
    if (e) {
      for (var [a, r] of e) {
        a = this.$.get(a);
        this.f1e(a, r);
      }
      for (var [o, s] of this.$)
        void 0 === this[s] &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              6,
              "CameraController缺少配置",
              ["CameraType", this.constructor],
              ["key", o],
              ["value", s],
            ),
          this.f1e(s, 1));
    }
    if (t) {
      for (var [i, n] of t) {
        i = this.C1e.get(i);
        this.p1e(i, n);
      }
      for (var [l, C] of this.C1e)
        void 0 === this[C] &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              6,
              "CameraController缺少曲线配置",
              ["CameraType", this.constructor.name],
              ["key", l],
              ["value", C],
            ),
          this.p1e(C, CurveUtils_1.CurveUtils.CreateCurve(0)));
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
    CameraControllerBase.Iza.Start(),
      (this.u1e = this.UpdateCustomEnableCondition()),
      CameraControllerBase.Iza.Stop(),
      this.IsActivate !== t &&
        (this.IsActivate
          ? (CameraControllerBase.Tza.Start(),
            this.OnEnable(),
            CameraControllerBase.Tza)
          : (CameraControllerBase.Lza.Start(),
            this.OnDisable(),
            CameraControllerBase.Lza)
        ).Stop(),
      (this.IsActivate
        ? (CameraControllerBase.Aza.Start(),
          this.UpdateInternal(e),
          CameraControllerBase.Aza)
        : (CameraControllerBase.Dza.Start(),
          this.UpdateDeactivateInternal(e),
          CameraControllerBase.Dza)
      ).Stop();
  }
  get IsActivate() {
    return this.u1e && 0 === this.c1e.size;
  }
  ShowBlockSetInfo(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Camera", 57, "[ShowCameraBlockSet]", [
        "controllerName",
        t,
      ]),
      this.c1e.forEach((e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Camera",
            57,
            "[ShowCameraBlockSet]",
            ["elementName", e?.constructor?.name ?? ""],
            ["controllerName", t],
          );
      });
  }
  GetConfigMapValue(e) {
    return String(this.$.get(e));
  }
}
((exports.CameraControllerBase = CameraControllerBase).Iza =
  Stats_1.Stat.Create("UpdateCustomEnableConditionStat")),
  (CameraControllerBase.Tza = Stats_1.Stat.Create("OnEnableStat")),
  (CameraControllerBase.Lza = Stats_1.Stat.Create("OnDisableStat")),
  (CameraControllerBase.Aza = Stats_1.Stat.Create("UpdateInternalStat")),
  (CameraControllerBase.Dza = Stats_1.Stat.Create(
    "UpdateDeactivateInternalStat",
  ));
//# sourceMappingURL=CameraControllerBase.js.map
