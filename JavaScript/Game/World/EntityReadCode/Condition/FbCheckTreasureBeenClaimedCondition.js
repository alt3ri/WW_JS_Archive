"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckTreasureBeenClaimedCondition = void 0);
class FbCheckTreasureBeenClaimedCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0);
  }
  static Create(t) {
    if (t) return new FbCheckTreasureBeenClaimedCondition(t);
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
}
exports.FbCheckTreasureBeenClaimedCondition =
  FbCheckTreasureBeenClaimedCondition;
//# sourceMappingURL=FbCheckTreasureBeenClaimedCondition.js.map
