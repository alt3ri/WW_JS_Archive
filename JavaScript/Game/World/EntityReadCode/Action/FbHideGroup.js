"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHideGroup = void 0);
const UnionHideGroupConfigHelper_1 = require("./UnionHideGroupConfigHelper");
class FbHideGroup {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.sxh = !1),
      (this.axh = void 0),
      (this.JAh = !1),
      (this.ZAh = void 0),
      (this.ixh = !1),
      (this.rxh = !1);
  }
  static Create(i) {
    if (i) return new FbHideGroup(i);
  }
  get GroupKey() {
    return (
      this.sxh ||
        ((this.sxh = !0), (this.axh = this.FbDataInternal.groupKey())),
      this.axh
    );
  }
  get HideConfig() {
    var i, t;
    return (
      !this.JAh &&
        ((this.JAh = !0),
        (i = this.FbDataInternal.hideConfigType()),
        (t =
          UnionHideGroupConfigHelper_1.UnionHideGroupConfigHelper.GetUnionHideGroupConfigObject(
            i,
          ))) &&
        (this.ZAh =
          UnionHideGroupConfigHelper_1.UnionHideGroupConfigHelper.ReadUnionHideGroupConfig(
            i,
            this.FbDataInternal.hideConfig(t),
          )),
      this.ZAh
    );
  }
  get IsHidePasserByNpc() {
    return (
      this.ixh ||
        ((this.ixh = !0), (this.rxh = this.FbDataInternal.isHidePasserByNpc())),
      this.rxh
    );
  }
}
exports.FbHideGroup = FbHideGroup;
//# sourceMappingURL=FbHideGroup.js.map
