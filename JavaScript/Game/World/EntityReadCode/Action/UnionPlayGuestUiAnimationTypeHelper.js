"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPlayGuestUiAnimationTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbPlayGuestCartethyia_1 = require("./FbPlayGuestCartethyia");
class UnionPlayGuestUiAnimationTypeHelper {
  static GetUnionPlayGuestUiAnimationTypeObject(t) {
    if (t === fb_action_1.UnionPlayGuestUiAnimationType.PlayGuestCartethyia)
      return new fb_action_1.PlayGuestCartethyia();
  }
  static ReadUnionPlayGuestUiAnimationType(t, e) {
    return void 0 !== e &&
      t === fb_action_1.UnionPlayGuestUiAnimationType.PlayGuestCartethyia
      ? FbPlayGuestCartethyia_1.FbPlayGuestCartethyia.Create(e)
      : void 0;
  }
}
exports.UnionPlayGuestUiAnimationTypeHelper =
  UnionPlayGuestUiAnimationTypeHelper;
//# sourceMappingURL=UnionPlayGuestUiAnimationTypeHelper.js.map
