"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTowardEntityConfig = void 0);
class FbTowardEntityConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.MYh = !1),
      (this.EYh = void 0),
      (this.Vvh = !1),
      (this.jvh = 0);
  }
  static Create(t) {
    if (t) return new FbTowardEntityConfig(t);
  }
  get ReferenceActorKey() {
    return (
      this.MYh ||
        ((this.MYh = !0), (this.EYh = this.FbDataInternal.referenceActorKey())),
      this.EYh
    );
  }
  get TargetEntityId() {
    return (
      this.Vvh ||
        ((this.Vvh = !0), (this.jvh = this.FbDataInternal.targetEntityId())),
      this.jvh
    );
  }
}
exports.FbTowardEntityConfig = FbTowardEntityConfig;
//# sourceMappingURL=FbTowardEntityConfig.js.map
