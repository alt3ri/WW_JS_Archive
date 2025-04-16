"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeEntityStateLoop = void 0);
class FbChangeEntityStateLoop {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.Fch = !1),
      (this.Nch = void 0);
  }
  static Create(t) {
    if (t) return new FbChangeEntityStateLoop(t);
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
  get Circulation() {
    return (
      this.Fch ||
        ((this.Fch = !0), (this.Nch = this.FbDataInternal.circulation())),
      this.Nch
    );
  }
}
exports.FbChangeEntityStateLoop = FbChangeEntityStateLoop;
//# sourceMappingURL=FbChangeEntityStateLoop.js.map
