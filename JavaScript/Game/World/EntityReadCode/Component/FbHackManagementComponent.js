"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHackManagementComponent = void 0);
class FbHackManagementComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Hd_ = !1),
      (this.Wd_ = 0),
      (this.O7_ = !1),
      (this.G7_ = 0);
  }
  static Create(t) {
    if (t) return new FbHackManagementComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get MaxHackingCount() {
    return (
      this.Hd_ ||
        ((this.Hd_ = !0), (this.Wd_ = this.FbDataInternal.maxHackingCount())),
      this.Wd_
    );
  }
  get ValidDistance() {
    return (
      this.O7_ ||
        ((this.O7_ = !0), (this.G7_ = this.FbDataInternal.validDistance())),
      this.G7_
    );
  }
}
exports.FbHackManagementComponent = FbHackManagementComponent;
//# sourceMappingURL=FbHackManagementComponent.js.map
