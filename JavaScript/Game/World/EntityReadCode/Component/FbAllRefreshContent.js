"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAllRefreshContent = void 0);
class FbAllRefreshContent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.V1h = !1),
      (this.j1h = void 0);
  }
  static Create(t) {
    if (t) return new FbAllRefreshContent(t);
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
      var s = this.FbDataInternal.entityIdsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
}
exports.FbAllRefreshContent = FbAllRefreshContent;
//# sourceMappingURL=FbAllRefreshContent.js.map
