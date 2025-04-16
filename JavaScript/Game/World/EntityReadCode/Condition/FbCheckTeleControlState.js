"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckTeleControlState = void 0);
class FbCheckTeleControlState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.OJh = !1),
      (this.FJh = void 0),
      (this.Bch = !1),
      (this.Cbo = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckTeleControlState(t);
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
  get CompareType() {
    return (
      this.OJh ||
        ((this.OJh = !0), (this.FJh = this.FbDataInternal.compareType())),
      this.FJh
    );
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
}
exports.FbCheckTeleControlState = FbCheckTeleControlState;
//# sourceMappingURL=FbCheckTeleControlState.js.map
