"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbUnlockSystemItem = void 0);
const UnionUnlockSystemOptionHelper_1 = require("./UnionUnlockSystemOptionHelper");
class FbUnlockSystemItem {
  constructor(t) {
    (this.FbDataInternal = t), (this.Jvh = !1), (this.Zvh = void 0);
  }
  static Create(t) {
    if (t) return new FbUnlockSystemItem(t);
  }
  get SystemOption() {
    var t, e;
    return (
      !this.Jvh &&
        ((this.Jvh = !0),
        (t = this.FbDataInternal.systemOptionType()),
        (e =
          UnionUnlockSystemOptionHelper_1.UnionUnlockSystemOptionHelper.GetUnionUnlockSystemOptionObject(
            t,
          ))) &&
        (this.Zvh =
          UnionUnlockSystemOptionHelper_1.UnionUnlockSystemOptionHelper.ReadUnionUnlockSystemOption(
            t,
            this.FbDataInternal.systemOption(e),
          )),
      this.Zvh
    );
  }
}
exports.FbUnlockSystemItem = FbUnlockSystemItem;
//# sourceMappingURL=FbUnlockSystemItem.js.map
