"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDestroyEntity = void 0);
class FbDestroyEntity {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.V1h = !1),
      (this.j1h = void 0),
      (this.Ych = !1),
      (this.zch = !1);
  }
  static Create(t) {
    if (t) return new FbDestroyEntity(t);
  }
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var s = this.FbDataInternal.entityIdsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
  get DelayDestroy() {
    return (
      this.Ych ||
        ((this.Ych = !0), (this.zch = this.FbDataInternal.delayDestroy())),
      this.zch
    );
  }
}
exports.FbDestroyEntity = FbDestroyEntity;
//# sourceMappingURL=FbDestroyEntity.js.map
