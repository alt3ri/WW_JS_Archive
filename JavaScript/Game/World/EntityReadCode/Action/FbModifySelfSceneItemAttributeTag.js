"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbModifySelfSceneItemAttributeTag = void 0);
class FbModifySelfSceneItemAttributeTag {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.pLh = !1),
      (this.vLh = !1),
      (this.gLh = !1),
      (this.fLh = void 0);
  }
  static Create(t) {
    if (t) return new FbModifySelfSceneItemAttributeTag(t);
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
      var e = this.FbDataInternal.performanceTagLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.fLh.push(this.FbDataInternal.performanceTag(t));
    }
    return this.fLh;
  }
}
exports.FbModifySelfSceneItemAttributeTag = FbModifySelfSceneItemAttributeTag;
//# sourceMappingURL=FbModifySelfSceneItemAttributeTag.js.map
