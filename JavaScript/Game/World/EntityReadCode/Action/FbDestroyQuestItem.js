"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDestroyQuestItem = void 0);
class FbDestroyQuestItem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.auh = !1),
      (this.huh = 0),
      (this.luh = !1),
      (this.v4i = 0),
      (this.muh = !1),
      (this.Cuh = !1);
  }
  static Create(t) {
    if (t) return new FbDestroyQuestItem(t);
  }
  get ItemId() {
    return (
      this.auh || ((this.auh = !0), (this.huh = this.FbDataInternal.itemId())),
      this.huh
    );
  }
  get Count() {
    return (
      this.luh || ((this.luh = !0), (this.v4i = this.FbDataInternal.count())),
      this.v4i
    );
  }
  get IsAll() {
    return (
      this.muh || ((this.muh = !0), (this.Cuh = this.FbDataInternal.isAll())),
      this.Cuh
    );
  }
}
exports.FbDestroyQuestItem = FbDestroyQuestItem;
//# sourceMappingURL=FbDestroyQuestItem.js.map
