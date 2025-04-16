"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCommonTip = void 0);
const UnionCommonTipOptionHelper_1 = require("./UnionCommonTipOptionHelper");
class FbCommonTip {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.syh = !1),
      (this.ayh = void 0),
      (this.I_h = !1),
      (this.y6o = 0);
  }
  static Create(i) {
    if (i) return new FbCommonTip(i);
  }
  get TipOption() {
    var i, t;
    return (
      !this.syh &&
        ((this.syh = !0),
        (i = this.FbDataInternal.tipOptionType()),
        (t =
          UnionCommonTipOptionHelper_1.UnionCommonTipOptionHelper.GetUnionCommonTipOptionObject(
            i,
          ))) &&
        (this.ayh =
          UnionCommonTipOptionHelper_1.UnionCommonTipOptionHelper.ReadUnionCommonTipOption(
            i,
            this.FbDataInternal.tipOption(t),
          )),
      this.ayh
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
}
exports.FbCommonTip = FbCommonTip;
//# sourceMappingURL=FbCommonTip.js.map
