"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetResetPosition = void 0);
class FbSetResetPosition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.S0h = !1),
      (this.M0h = 0);
  }
  static Create(t) {
    if (t) return new FbSetResetPosition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get PositionEntityId() {
    return (
      this.S0h ||
        ((this.S0h = !0), (this.M0h = this.FbDataInternal.positionEntityId())),
      this.M0h
    );
  }
}
exports.FbSetResetPosition = FbSetResetPosition;
//# sourceMappingURL=FbSetResetPosition.js.map
