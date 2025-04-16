"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVolumeTriggerShape = void 0);
class FbVolumeTriggerShape {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.IZh = !1),
      (this.TZh = void 0);
  }
  static Create(t) {
    if (t) return new FbVolumeTriggerShape(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get VolumeKey() {
    return (
      this.IZh ||
        ((this.IZh = !0), (this.TZh = this.FbDataInternal.volumeKey())),
      this.TZh
    );
  }
}
exports.FbVolumeTriggerShape = FbVolumeTriggerShape;
//# sourceMappingURL=FbVolumeTriggerShape.js.map
