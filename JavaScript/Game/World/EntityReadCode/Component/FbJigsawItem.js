"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbJigsawItem = void 0);
const UnionFillConfigHelper_1 = require("./UnionFillConfigHelper");
class FbJigsawItem {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.eNh = !1),
      (this.tNh = void 0);
  }
  static Create(i) {
    if (i) return new FbJigsawItem(i);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get FillCfg() {
    var i, t;
    return (
      !this.eNh &&
        ((this.eNh = !0),
        (i = this.FbDataInternal.fillCfgType()),
        (t =
          UnionFillConfigHelper_1.UnionFillConfigHelper.GetUnionFillConfigObject(
            i,
          ))) &&
        (this.tNh =
          UnionFillConfigHelper_1.UnionFillConfigHelper.ReadUnionFillConfig(
            i,
            this.FbDataInternal.fillCfg(t),
          )),
      this.tNh
    );
  }
}
exports.FbJigsawItem = FbJigsawItem;
//# sourceMappingURL=FbJigsawItem.js.map
