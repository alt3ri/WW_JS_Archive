"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbModifyTargetSceneItemAttributeTag = void 0);
class FbModifyTargetSceneItemAttributeTag {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.pLh = !1),
      (this.vLh = !1),
      (this.gLh = !1),
      (this.fLh = void 0),
      (this.V1h = !1),
      (this.j1h = void 0);
  }
  static Create(t) {
    if (t) return new FbModifyTargetSceneItemAttributeTag(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get IsAddTag() {
    return (
      this.pLh ||
        ((this.pLh = !0), (this.vLh = this.FbDataInternal.isAddTag())),
      this.vLh
    );
  }
  get PerformanceTag() {
    if (!this.gLh) {
      (this.gLh = !0), (this.fLh = new Array());
      var i = this.FbDataInternal.performanceTagLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.fLh.push(this.FbDataInternal.performanceTag(t));
    }
    return this.fLh;
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
}
exports.FbModifyTargetSceneItemAttributeTag =
  FbModifyTargetSceneItemAttributeTag;
//# sourceMappingURL=FbModifyTargetSceneItemAttributeTag.js.map
