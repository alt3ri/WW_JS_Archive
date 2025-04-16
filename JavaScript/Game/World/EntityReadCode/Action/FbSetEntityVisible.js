"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetEntityVisible = void 0);
class FbSetEntityVisible {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.V1h = !1),
      (this.j1h = void 0),
      (this.Amh = !1),
      (this.xmh = !1);
  }
  static Create(t) {
    if (t) return new FbSetEntityVisible(t);
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
  get Visible() {
    return (
      this.Amh || ((this.Amh = !0), (this.xmh = this.FbDataInternal.visible())),
      this.xmh
    );
  }
}
exports.FbSetEntityVisible = FbSetEntityVisible;
//# sourceMappingURL=FbSetEntityVisible.js.map
