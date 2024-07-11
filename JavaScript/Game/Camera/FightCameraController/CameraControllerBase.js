"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraControllerBase = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
class CameraControllerBase {
  constructor(t) {
    (this.BreakModifyArmLength = !1),
      (this.BreakModifyCameraOffset = !1),
      (this.BreakModifyArmRotation = !1),
      (this.BreakModifyFov = !1),
      (this.u1e = !0),
      (this.c1e = new Set()),
      (this.m1e = new Map()),
      (this.$ = new Map()),
      (this.d1e = new Map()),
      (this.C1e = new Map()),
      (this.g1e = new Set()),
      (this.OnChangeRole = (t, e) => {}),
      (this.Camera = t),
      this.OnInit();
  }
  SetConfigMap(t, e) {
    this.$.has(t) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("Camera", 6, "重复注册了Key", ["Key", t]),
      this.g1e.has(e) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Camera", 6, "重复注册了Value", ["value", e]),
      this.$.set(t, e),
      this.g1e.add(e);
  }
  SetCurveConfigMap(t, e) {
    this.C1e.has(t) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("Camera", 6, "重复注册了Key", ["Key", t]),
      this.g1e.has(e) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Camera", 6, "重复注册了Value", ["value", e]),
      this.C1e.set(t, e),
      this.g1e.add(e);
  }
  f1e(t, e) {
    this[t] = e;
  }
  p1e(t, e) {
    this[t] = e;
  }
  SetDefaultConfigs(e, i) {
    for (let t = 0; t < e.Num(); t++) {
      var s = e.GetKey(t);
      this.m1e.set(e.GetKey(t), e.Get(s));
    }
    for (let t = 0; t < i.Num(); t++) {
      var h = i.GetKey(t);
      this.d1e.set(
        i.GetKey(t),
        CurveUtils_1.CurveUtils.CreateCurveByStruct(i.Get(h)),
      );
    }
  }
  SetConfigs(t, e) {
    if (t) {
      for (var [i, s] of t) {
        i = this.$.get(i);
        this.f1e(i, s);
      }
      for (var [h, a] of this.$)
        void 0 === this[a] &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              6,
              "CameraController缺少配置",
              ["CameraType", this.constructor],
              ["key", h],
              ["value", a],
            ),
          this.f1e(a, 1));
    }
    if (e) {
      for (var [r, o] of e) {
        r = this.C1e.get(r);
        this.p1e(r, o);
      }
      for (var [n, v] of this.C1e)
        void 0 === this[v] &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              6,
              "CameraController缺少曲线配置",
              ["CameraType", this.constructor.name],
              ["key", n],
              ["value", v],
            ),
          this.p1e(v, CurveUtils_1.CurveUtils.CreateCurve(0)));
    }
  }
  ResetDefaultConfig() {
    this.SetConfigs(this.m1e, this.d1e);
  }
  ResetBreakModifyInfo() {
    (this.BreakModifyArmLength = !1),
      (this.BreakModifyCameraOffset = !1),
      (this.BreakModifyArmRotation = !1),
      (this.BreakModifyFov = !1);
  }
  UpdateBreakModifyInfo() {
    this.Camera.IsModifiedArmLength && (this.BreakModifyArmLength = !0),
      this.Camera.IsModifiedCameraOffset && (this.BreakModifyCameraOffset = !0),
      this.Camera.IsModifiedArmRotation && (this.BreakModifyArmRotation = !0),
      this.Camera.IsModifiedFov && (this.BreakModifyFov = !0);
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
  UpdateInternal(t) {}
  UpdateDeactivateInternal(t) {}
  Lock(t) {
    var e = this.IsActivate;
    this.c1e.add(t), !this.IsActivate && e && this.OnDisable();
  }
  Unlock(t) {
    var e = this.IsActivate;
    this.c1e.delete(t), this.IsActivate && !e && this.OnEnable();
  }
  Update(t) {
    var e = this.IsActivate;
    (this.u1e = this.UpdateCustomEnableCondition()),
      this.IsActivate !== e &&
        (this.IsActivate ? this.OnEnable() : this.OnDisable()),
      this.IsActivate
        ? this.UpdateInternal(t)
        : this.UpdateDeactivateInternal(t);
  }
  get IsActivate() {
    return this.u1e && 0 === this.c1e.size;
  }
  GetConfigMapValue(t) {
    return String(this.$.get(t));
  }
}
exports.CameraControllerBase = CameraControllerBase;
//# sourceMappingURL=CameraControllerBase.js.map
