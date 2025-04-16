"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInteractGearComponent = void 0);
class FbInteractGearComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.x6h = !1),
      (this.R6h = 0),
      (this.w6h = !1),
      (this.P6h = 0);
  }
  static Create(t) {
    if (t) return new FbInteractGearComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get NormalPrepareTime() {
    return (
      this.x6h ||
        ((this.x6h = !0), (this.R6h = this.FbDataInternal.normalPrepareTime())),
      this.R6h
    );
  }
  get ActivePrepareTime() {
    return (
      this.w6h ||
        ((this.w6h = !0), (this.P6h = this.FbDataInternal.activePrepareTime())),
      this.P6h
    );
  }
}
exports.FbInteractGearComponent = FbInteractGearComponent;
//# sourceMappingURL=FbInteractGearComponent.js.map
