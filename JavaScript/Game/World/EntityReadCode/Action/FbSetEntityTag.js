"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetEntityTag = void 0);
class FbSetEntityTag {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.Rvh = !1),
      (this.wvh = void 0),
      (this.Pvh = !1),
      (this.Uvh = void 0),
      (this.Gfh = !1),
      (this.Ofh = 0),
      (this.Dvh = !1),
      (this.Bvh = !1);
  }
  static Create(t) {
    if (t) return new FbSetEntityTag(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get GameplayTag() {
    return (
      this.Rvh ||
        ((this.Rvh = !0), (this.wvh = this.FbDataInternal.gameplayTag())),
      this.wvh
    );
  }
  get SetType() {
    return (
      this.Pvh || ((this.Pvh = !0), (this.Uvh = this.FbDataInternal.setType())),
      this.Uvh
    );
  }
  get DelayTime() {
    return (
      this.Gfh ||
        ((this.Gfh = !0), (this.Ofh = this.FbDataInternal.delayTime())),
      this.Ofh
    );
  }
  get BeforeHide() {
    return (
      this.Dvh ||
        ((this.Dvh = !0), (this.Bvh = this.FbDataInternal.beforeHide())),
      this.Bvh
    );
  }
}
exports.FbSetEntityTag = FbSetEntityTag;
//# sourceMappingURL=FbSetEntityTag.js.map
