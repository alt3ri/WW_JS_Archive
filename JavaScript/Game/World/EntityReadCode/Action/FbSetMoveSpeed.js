"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetMoveSpeed = void 0);
class FbSetMoveSpeed {
  constructor(e) {
    (this.FbDataInternal = e), (this.qmh = !1), (this.H8o = 0);
  }
  static Create(e) {
    if (e) return new FbSetMoveSpeed(e);
  }
  get Speed() {
    return (
      this.qmh || ((this.qmh = !0), (this.H8o = this.FbDataInternal.speed())),
      this.H8o
    );
  }
}
exports.FbSetMoveSpeed = FbSetMoveSpeed;
//# sourceMappingURL=FbSetMoveSpeed.js.map
