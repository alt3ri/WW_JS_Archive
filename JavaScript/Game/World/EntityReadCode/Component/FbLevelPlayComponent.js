"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLevelPlayComponent = void 0);
class FbLevelPlayComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Ryh = !1),
      (this.wyh = 0);
  }
  static Create(t) {
    if (t) return new FbLevelPlayComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get LevelPlayId() {
    return (
      this.Ryh ||
        ((this.Ryh = !0), (this.wyh = this.FbDataInternal.levelPlayId())),
      this.wyh
    );
  }
}
exports.FbLevelPlayComponent = FbLevelPlayComponent;
//# sourceMappingURL=FbLevelPlayComponent.js.map
