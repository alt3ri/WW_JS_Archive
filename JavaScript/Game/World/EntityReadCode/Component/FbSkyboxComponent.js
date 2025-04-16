"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSkyboxComponent = void 0);
const UnionTriggerModeHelper_1 = require("./UnionTriggerModeHelper");
class FbSkyboxComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.$jh = !1),
      (this.Xjh = void 0),
      (this.Yjh = !1),
      (this.zjh = void 0),
      (this.Jjh = !1),
      (this.Zjh = 0),
      (this.e5h = !1),
      (this.t5h = 0),
      (this.NIh = !1),
      (this.cui = 0),
      (this.i5h = !1),
      (this.r5h = void 0);
  }
  static Create(t) {
    if (t) return new FbSkyboxComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get WeatherDataAsset() {
    return (
      this.$jh ||
        ((this.$jh = !0), (this.Xjh = this.FbDataInternal.weatherDataAsset())),
      this.Xjh
    );
  }
  get PPTODDataAsset() {
    return (
      this.Yjh ||
        ((this.Yjh = !0), (this.zjh = this.FbDataInternal.pptodDataAsset())),
      this.zjh
    );
  }
  get SkyboxSetting() {
    return (
      this.Jjh ||
        ((this.Jjh = !0), (this.Zjh = this.FbDataInternal.skyboxSetting())),
      this.Zjh
    );
  }
  get FadeTime() {
    return (
      this.e5h ||
        ((this.e5h = !0), (this.t5h = this.FbDataInternal.fadeTime())),
      this.t5h
    );
  }
  get Priority() {
    return (
      this.NIh ||
        ((this.NIh = !0), (this.cui = this.FbDataInternal.priority())),
      this.cui
    );
  }
  get TriggerMode() {
    var t, i;
    return (
      !this.i5h &&
        ((this.i5h = !0),
        (t = this.FbDataInternal.triggerModeType()),
        (i =
          UnionTriggerModeHelper_1.UnionTriggerModeHelper.GetUnionTriggerModeObject(
            t,
          ))) &&
        (this.r5h =
          UnionTriggerModeHelper_1.UnionTriggerModeHelper.ReadUnionTriggerMode(
            t,
            this.FbDataInternal.triggerMode(i),
          )),
      this.r5h
    );
  }
}
exports.FbSkyboxComponent = FbSkyboxComponent;
//# sourceMappingURL=FbSkyboxComponent.js.map
