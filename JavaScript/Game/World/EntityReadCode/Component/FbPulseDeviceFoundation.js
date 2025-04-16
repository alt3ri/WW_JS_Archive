"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPulseDeviceFoundation = void 0);
class FbPulseDeviceFoundation {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbPulseDeviceFoundation(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbPulseDeviceFoundation = FbPulseDeviceFoundation;
//# sourceMappingURL=FbPulseDeviceFoundation.js.map
