"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectEnvironment = void 0);
const cpp_1 = require("cpp"),
  Info_1 = require("../Common/Info");
class EffectEnvironment {
  static get GlobalTimeScale() {
    return this.Lgl;
  }
  static set GlobalTimeScale(t) {
    this.Lgl !== t &&
      ((this.Lgl = t),
      this.OpenTickOptimize &&
        cpp_1.FKuroEffectSystemInterface.UpdateGlobalTimeScale(t),
      this.OpenCppOptimize) &&
      cpp_1.FEffectSystem.SetGlobalTimeScale(t);
  }
  static get DisableOtherEffect() {
    return this.Thc;
  }
  static set DisableOtherEffect(t) {
    this.Thc !== t &&
      ((this.Thc = t), this.OpenCppOptimize) &&
      cpp_1.FEffectSystem.OnDisableOtherEffectChange(t);
  }
  static get EffectQualityBiasRemote() {
    return this.bhc;
  }
  static set EffectQualityBiasRemote(t) {
    this.bhc !== t &&
      ((this.bhc = t), this.OpenCppOptimize) &&
      cpp_1.FEffectSystem.OnEffectQualityBiasRemoteChange(t);
  }
  static get OpenTickOptimize() {
    return !Info_1.Info.IsInEditorTick() && this.f0l;
  }
  static Initialize() {
    this.UseLog = Info_1.Info.IsBuildDevelopmentOrDebug;
  }
  static Tick(t, e) {
    this.GameTimeInSeconds += 0.001 * t;
  }
}
((exports.EffectEnvironment = EffectEnvironment).GameTimeInSeconds = 0),
  (EffectEnvironment.Lgl = 1),
  (EffectEnvironment.UseLog = !0),
  (EffectEnvironment.Thc = !1),
  (EffectEnvironment.UsePool = !0),
  (EffectEnvironment.bhc = -1),
  (EffectEnvironment.CloseEffectSubStat = !0),
  (EffectEnvironment.OpenVisibilityOptimize = !0),
  (EffectEnvironment.OpenDistanceOptimize = !0),
  (EffectEnvironment.OpenCppOptimize = !0),
  (EffectEnvironment.f0l = !0);
//# sourceMappingURL=EffectEnvironment.js.map
