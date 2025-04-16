"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbUnlockAtlasSystemItem = void 0);
const UnionUnlockAtlasSystemOptionHelper_1 = require("./UnionUnlockAtlasSystemOptionHelper");
class FbUnlockAtlasSystemItem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.eyh = !1),
      (this.tyh = void 0);
  }
  static Create(t) {
    if (t) return new FbUnlockAtlasSystemItem(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get UnlockOption() {
    var t, s;
    return (
      !this.eyh &&
        ((this.eyh = !0),
        (t = this.FbDataInternal.unlockOptionType()),
        (s =
          UnionUnlockAtlasSystemOptionHelper_1.UnionUnlockAtlasSystemOptionHelper.GetUnionUnlockAtlasSystemOptionObject(
            t,
          ))) &&
        (this.tyh =
          UnionUnlockAtlasSystemOptionHelper_1.UnionUnlockAtlasSystemOptionHelper.ReadUnionUnlockAtlasSystemOption(
            t,
            this.FbDataInternal.unlockOption(s),
          )),
      this.tyh
    );
  }
}
exports.FbUnlockAtlasSystemItem = FbUnlockAtlasSystemItem;
//# sourceMappingURL=FbUnlockAtlasSystemItem.js.map
