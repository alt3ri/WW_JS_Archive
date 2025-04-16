"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbListenEntitySelfEventCondition = void 0);
class FbListenEntitySelfEventCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.lmh = !1),
      (this._mh = void 0),
      (this.TJh = !1),
      (this.bJh = !1);
  }
  static Create(t) {
    if (t) return new FbListenEntitySelfEventCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EventKey() {
    return (
      this.lmh ||
        ((this.lmh = !0), (this._mh = this.FbDataInternal.eventKey())),
      this._mh
    );
  }
  get ResetAfterConditionMet() {
    return (
      this.TJh ||
        ((this.TJh = !0),
        (this.bJh = this.FbDataInternal.resetAfterConditionMet())),
      this.bJh
    );
  }
}
exports.FbListenEntitySelfEventCondition = FbListenEntitySelfEventCondition;
//# sourceMappingURL=FbListenEntitySelfEventCondition.js.map
