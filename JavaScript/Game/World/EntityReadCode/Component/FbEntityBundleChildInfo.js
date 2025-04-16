"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityBundleChildInfo = void 0);
class FbEntityBundleChildInfo {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.K9l = !1),
      (this.$9l = !1),
      (this.X9l = !1),
      (this.Y9l = 0),
      (this.a_h = !1),
      (this.I9o = 0);
  }
  static Create(t) {
    if (t) return new FbEntityBundleChildInfo(t);
  }
  get IsDisable() {
    return (
      this.K9l ||
        ((this.K9l = !0), (this.$9l = this.FbDataInternal.isDisable())),
      this.$9l
    );
  }
  get ChildId() {
    return (
      this.X9l || ((this.X9l = !0), (this.Y9l = this.FbDataInternal.childId())),
      this.Y9l
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
}
exports.FbEntityBundleChildInfo = FbEntityBundleChildInfo;
//# sourceMappingURL=FbEntityBundleChildInfo.js.map
