"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbResetTeleControlEntity = void 0);
class FbResetTeleControlEntity {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.V1h = !1),
      (this.j1h = void 0);
  }
  static Create(t) {
    if (t) return new FbResetTeleControlEntity(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var e = this.FbDataInternal.entityIdsLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
}
exports.FbResetTeleControlEntity = FbResetTeleControlEntity;
//# sourceMappingURL=FbResetTeleControlEntity.js.map
