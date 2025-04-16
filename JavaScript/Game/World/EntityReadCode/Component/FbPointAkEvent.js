"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPointAkEvent = void 0);
class FbPointAkEvent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.F8h = !1),
      (this.N8h = void 0),
      (this.V8h = !1),
      (this.j8h = !1),
      (this.NP_ = !1),
      (this.VP_ = !1);
  }
  static Create(t) {
    if (t) return new FbPointAkEvent(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PointIds() {
    if (!this.F8h) {
      (this.F8h = !0), (this.N8h = new Array());
      var i = this.FbDataInternal.pointIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.N8h.push(this.FbDataInternal.pointIds(t));
    }
    return this.N8h;
  }
  get UseListenerCone() {
    return (
      this.V8h ||
        ((this.V8h = !0), (this.j8h = this.FbDataInternal.useListenerCone())),
      this.j8h
    );
  }
  get EnableOcclusion() {
    return (
      this.NP_ ||
        ((this.NP_ = !0), (this.VP_ = this.FbDataInternal.enableOcclusion())),
      this.VP_
    );
  }
}
exports.FbPointAkEvent = FbPointAkEvent;
//# sourceMappingURL=FbPointAkEvent.js.map
