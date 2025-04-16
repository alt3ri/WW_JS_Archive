"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityCustomAudioComponent = void 0);
const UnionAkEventTypeHelper_1 = require("./UnionAkEventTypeHelper"),
  UnionAudioControlTypeHelper_1 = require("./UnionAudioControlTypeHelper");
class FbEntityCustomAudioComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.D8h = !1),
      (this.B8h = void 0),
      (this.q8h = !1),
      (this.k8h = void 0),
      (this.Oi_ = !1),
      (this.Gi_ = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityCustomAudioComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get AkEventType() {
    var t, e;
    return (
      !this.D8h &&
        ((this.D8h = !0),
        (t = this.FbDataInternal.akEventTypeType()),
        (e =
          UnionAkEventTypeHelper_1.UnionAkEventTypeHelper.GetUnionAkEventTypeObject(
            t,
          ))) &&
        (this.B8h =
          UnionAkEventTypeHelper_1.UnionAkEventTypeHelper.ReadUnionAkEventType(
            t,
            this.FbDataInternal.akEventType(e),
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
  get AudioControlType() {
    var t, e;
    return (
      !this.Oi_ &&
        ((this.Oi_ = !0),
        (t = this.FbDataInternal.audioControlTypeType()),
        (e =
          UnionAudioControlTypeHelper_1.UnionAudioControlTypeHelper.GetUnionAudioControlTypeObject(
            t,
          ))) &&
        (this.Gi_ =
          UnionAudioControlTypeHelper_1.UnionAudioControlTypeHelper.ReadUnionAudioControlType(
            t,
            this.FbDataInternal.audioControlType(e),
          )),
      this.Gi_
    );
  }
}
exports.FbEntityCustomAudioComponent = FbEntityCustomAudioComponent;
//# sourceMappingURL=FbEntityCustomAudioComponent.js.map
