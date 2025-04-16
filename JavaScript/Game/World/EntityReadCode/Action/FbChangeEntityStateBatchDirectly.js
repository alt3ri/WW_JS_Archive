"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeEntityStateBatchDirectly = void 0);
class FbChangeEntityStateBatchDirectly {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.V1h = !1),
      (this.j1h = void 0),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this.Gch = !1),
      (this.Och = !1);
  }
  static Create(t) {
    if (t) return new FbChangeEntityStateBatchDirectly(t);
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
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var i = this.FbDataInternal.entityIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get DelayChange() {
    return (
      this.Gch ||
        ((this.Gch = !0), (this.Och = this.FbDataInternal.delayChange())),
      this.Och
    );
  }
}
exports.FbChangeEntityStateBatchDirectly = FbChangeEntityStateBatchDirectly;
//# sourceMappingURL=FbChangeEntityStateBatchDirectly.js.map
