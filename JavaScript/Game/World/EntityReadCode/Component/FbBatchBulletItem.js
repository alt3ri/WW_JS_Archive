"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBatchBulletItem = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbBatchBulletCaster_1 = require("./FbBatchBulletCaster");
class FbBatchBulletItem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Fph = !1),
      (this.Nph = 0),
      (this.mXh = !1),
      (this.CXh = void 0);
  }
  static Create(t) {
    if (t) return new FbBatchBulletItem(t);
  }
  get Time() {
    return (
      this.Fph || ((this.Fph = !0), (this.Nph = this.FbDataInternal.time())),
      this.Nph
    );
  }
  get CasterList() {
    if (!this.mXh) {
      (this.mXh = !0), (this.CXh = new Array());
      var e = this.FbDataInternal.casterListLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var s = this.FbDataInternal.casterList(
            t,
            new fb_component_1.BatchBulletCaster(),
          );
          this.CXh.push(FbBatchBulletCaster_1.FbBatchBulletCaster.Create(s));
        }
    }
    return this.CXh;
  }
}
exports.FbBatchBulletItem = FbBatchBulletItem;
//# sourceMappingURL=FbBatchBulletItem.js.map
