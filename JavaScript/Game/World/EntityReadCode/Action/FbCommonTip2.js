"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCommonTip2 = void 0);
const UnionCommonTip2OptionHelper_1 = require("./UnionCommonTip2OptionHelper");
class FbCommonTip2 {
  constructor(i) {
    (this.FbDataInternal = i), (this.syh = !1), (this.ayh = void 0);
  }
  static Create(i) {
    if (i) return new FbCommonTip2(i);
  }
  get TipOption() {
    var i, o;
    return (
      !this.syh &&
        ((this.syh = !0),
        (i = this.FbDataInternal.tipOptionType()),
        (o =
          UnionCommonTip2OptionHelper_1.UnionCommonTip2OptionHelper.GetUnionCommonTip2OptionObject(
            i,
          ))) &&
        (this.ayh =
          UnionCommonTip2OptionHelper_1.UnionCommonTip2OptionHelper.ReadUnionCommonTip2Option(
            i,
            this.FbDataInternal.tipOption(o),
          )),
      this.ayh
    );
  }
}
exports.FbCommonTip2 = FbCommonTip2;
//# sourceMappingURL=FbCommonTip2.js.map
