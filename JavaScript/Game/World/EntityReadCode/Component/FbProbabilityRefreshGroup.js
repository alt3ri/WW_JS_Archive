"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbProbabilityRefreshGroup = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbProbabilityRefreshItem_1 = require("./FbProbabilityRefreshItem");
class FbProbabilityRefreshGroup {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.cBh = !1),
      (this.uBh = void 0),
      (this.dBh = !1),
      (this.mBh = void 0);
  }
  static Create(t) {
    if (t) return new FbProbabilityRefreshGroup(t);
  }
  get CheckOccupation() {
    return (
      this.cBh ||
        ((this.cBh = !0), (this.uBh = this.FbDataInternal.checkOccupation())),
      this.uBh
    );
  }
  get RefreshItems() {
    if (!this.dBh) {
      (this.dBh = !0), (this.mBh = new Array());
      var e = this.FbDataInternal.refreshItemsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.refreshItems(
            t,
            new fb_component_1.ProbabilityRefreshItem(),
          );
          this.mBh.push(
            FbProbabilityRefreshItem_1.FbProbabilityRefreshItem.Create(i),
          );
        }
    }
    return this.mBh;
  }
}
exports.FbProbabilityRefreshGroup = FbProbabilityRefreshGroup;
//# sourceMappingURL=FbProbabilityRefreshGroup.js.map
