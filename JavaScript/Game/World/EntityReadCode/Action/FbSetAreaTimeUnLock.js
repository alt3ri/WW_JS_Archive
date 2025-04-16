"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetAreaTimeUnLock = void 0);
class FbSetAreaTimeUnLock {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.g5h = !1),
      (this.f5h = void 0);
  }
  static Create(t) {
    if (t) return new FbSetAreaTimeUnLock(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get AreaIds() {
    if (!this.g5h) {
      (this.g5h = !0), (this.f5h = new Array());
      var e = this.FbDataInternal.areaIdsLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.f5h.push(this.FbDataInternal.areaIds(t));
    }
    return this.f5h;
  }
}
exports.FbSetAreaTimeUnLock = FbSetAreaTimeUnLock;
//# sourceMappingURL=FbSetAreaTimeUnLock.js.map
