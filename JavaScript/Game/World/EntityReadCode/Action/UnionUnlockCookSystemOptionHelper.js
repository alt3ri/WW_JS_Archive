"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionUnlockCookSystemOptionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbUnlockCookSystemCookBook_1 = require("./FbUnlockCookSystemCookBook");
class UnionUnlockCookSystemOptionHelper {
  static GetUnionUnlockCookSystemOptionObject(o) {
    if (o === fb_action_1.UnionUnlockCookSystemOption.UnlockCookSystemCookBook)
      return new fb_action_1.UnlockCookSystemCookBook();
  }
  static ReadUnionUnlockCookSystemOption(o, t) {
    return void 0 !== t &&
      o === fb_action_1.UnionUnlockCookSystemOption.UnlockCookSystemCookBook
      ? FbUnlockCookSystemCookBook_1.FbUnlockCookSystemCookBook.Create(t)
      : void 0;
  }
}
exports.UnionUnlockCookSystemOptionHelper = UnionUnlockCookSystemOptionHelper;
//# sourceMappingURL=UnionUnlockCookSystemOptionHelper.js.map
