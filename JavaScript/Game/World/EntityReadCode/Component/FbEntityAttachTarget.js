"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityAttachTarget = void 0);
class FbEntityAttachTarget {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.x7h = !1),
      (this.R7h = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityAttachTarget(t);
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
  get AttachPoint() {
    return (
      this.x7h ||
        ((this.x7h = !0), (this.R7h = this.FbDataInternal.attachPoint())),
      this.R7h
    );
  }
}
exports.FbEntityAttachTarget = FbEntityAttachTarget;
//# sourceMappingURL=FbEntityAttachTarget.js.map
