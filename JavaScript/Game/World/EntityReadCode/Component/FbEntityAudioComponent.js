"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityAudioComponent = void 0);
const UnionAkEventTypeHelper_1 = require("./UnionAkEventTypeHelper");
class FbEntityAudioComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.D8h = !1),
      (this.B8h = void 0),
      (this.q8h = !1),
      (this.k8h = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityAudioComponent(t);
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
}
exports.FbEntityAudioComponent = FbEntityAudioComponent;
//# sourceMappingURL=FbEntityAudioComponent.js.map
