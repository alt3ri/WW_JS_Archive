"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckEntityHasSceneItemAttributeTag = void 0);
class FbCheckEntityHasSceneItemAttributeTag {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.wJh = !1),
      (this.PJh = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.UJh = !1),
      (this.DJh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckEntityHasSceneItemAttributeTag(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CheckType() {
    return (
      this.wJh ||
        ((this.wJh = !0), (this.PJh = this.FbDataInternal.checkType())),
      this.PJh
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get Tags() {
    if (!this.UJh) {
      (this.UJh = !0), (this.DJh = new Array());
      var i = this.FbDataInternal.tagsLength();
      if (i)
        for (let t = 0; t < i; ++t) this.DJh.push(this.FbDataInternal.tags(t));
    }
    return this.DJh;
  }
}
exports.FbCheckEntityHasSceneItemAttributeTag =
  FbCheckEntityHasSceneItemAttributeTag;
//# sourceMappingURL=FbCheckEntityHasSceneItemAttributeTag.js.map
