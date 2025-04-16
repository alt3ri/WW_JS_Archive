"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityStateAudioComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEntityStateAudioConfig_1 = require("./FbEntityStateAudioConfig"),
  UnionAkEventTypeHelper_1 = require("./UnionAkEventTypeHelper");
class FbEntityStateAudioComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.D8h = !1),
      (this.B8h = void 0),
      (this.q8h = !1),
      (this.k8h = void 0),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityStateAudioComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get AkEventType() {
    var t, i;
    return (
      !this.D8h &&
        ((this.D8h = !0),
        (t = this.FbDataInternal.akEventTypeType()),
        (i =
          UnionAkEventTypeHelper_1.UnionAkEventTypeHelper.GetUnionAkEventTypeObject(
            t,
          ))) &&
        (this.B8h =
          UnionAkEventTypeHelper_1.UnionAkEventTypeHelper.ReadUnionAkEventType(
            t,
            this.FbDataInternal.akEventType(i),
          )),
      this.B8h
    );
  }
  get AudioRangeType() {
    return (
      this.q8h ||
        ((this.q8h = !0), (this.k8h = this.FbDataInternal.audioRangeType())),
      this.k8h
    );
  }
  get Config() {
    if (!this.bSh) {
      (this.bSh = !0), (this.TAe = new Array());
      var i = this.FbDataInternal.configLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.config(
            t,
            new fb_component_1.EntityStateAudioConfig(),
          );
          this.TAe.push(
            FbEntityStateAudioConfig_1.FbEntityStateAudioConfig.Create(e),
          );
        }
    }
    return this.TAe;
  }
}
exports.FbEntityStateAudioComponent = FbEntityStateAudioComponent;
//# sourceMappingURL=FbEntityStateAudioComponent.js.map
