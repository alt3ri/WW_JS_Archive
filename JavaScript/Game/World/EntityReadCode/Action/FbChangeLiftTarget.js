"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeLiftTarget = void 0);
class FbChangeLiftTarget {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.tIh = !1),
      (this.iIh = !1),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.rIh = !1),
      (this.oIh = 0);
  }
  static Create(t) {
    if (t) return new FbChangeLiftTarget(t);
  }
  get IsSelf() {
    return (
      this.tIh || ((this.tIh = !0), (this.iIh = this.FbDataInternal.isSelf())),
      this.iIh
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get Location() {
    return (
      this.rIh ||
        ((this.rIh = !0), (this.oIh = this.FbDataInternal.location())),
      this.oIh
    );
  }
}
exports.FbChangeLiftTarget = FbChangeLiftTarget;
//# sourceMappingURL=FbChangeLiftTarget.js.map
