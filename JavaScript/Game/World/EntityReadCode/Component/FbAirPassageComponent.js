"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAirPassageComponent = void 0);
class FbAirPassageComponent {
  constructor(s) {
    (this.FbDataInternal = s), (this.q_h = !1), (this.k_h = !1);
  }
  static Create(s) {
    if (s) return new FbAirPassageComponent(s);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
}
exports.FbAirPassageComponent = FbAirPassageComponent;
//# sourceMappingURL=FbAirPassageComponent.js.map
