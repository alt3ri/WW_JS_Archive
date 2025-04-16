"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbUnLockCookSystemItem = void 0);
const UnionUnlockCookSystemOptionHelper_1 = require("./UnionUnlockCookSystemOptionHelper");
class FbUnLockCookSystemItem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.eyh = !1),
      (this.tyh = void 0);
  }
  static Create(t) {
    if (t) return new FbUnLockCookSystemItem(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get UnlockOption() {
    var t, o;
    return (
      !this.eyh &&
        ((this.eyh = !0),
        (t = this.FbDataInternal.unlockOptionType()),
        (o =
          UnionUnlockCookSystemOptionHelper_1.UnionUnlockCookSystemOptionHelper.GetUnionUnlockCookSystemOptionObject(
            t,
          ))) &&
        (this.tyh =
          UnionUnlockCookSystemOptionHelper_1.UnionUnlockCookSystemOptionHelper.ReadUnionUnlockCookSystemOption(
            t,
            this.FbDataInternal.unlockOption(o),
          )),
      this.tyh
    );
  }
}
exports.FbUnLockCookSystemItem = FbUnLockCookSystemItem;
//# sourceMappingURL=FbUnLockCookSystemItem.js.map
