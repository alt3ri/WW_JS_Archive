"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionStopGuestUiAnimationTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbStopGuestCartethyia_1 = require("./FbStopGuestCartethyia");
class UnionStopGuestUiAnimationTypeHelper {
  static GetUnionStopGuestUiAnimationTypeObject(t) {
    if (t === fb_action_1.UnionStopGuestUiAnimationType.StopGuestCartethyia)
      return new fb_action_1.StopGuestCartethyia();
  }
  static ReadUnionStopGuestUiAnimationType(t, e) {
    return void 0 !== e &&
      t === fb_action_1.UnionStopGuestUiAnimationType.StopGuestCartethyia
      ? FbStopGuestCartethyia_1.FbStopGuestCartethyia.Create(e)
      : void 0;
  }
}
exports.UnionStopGuestUiAnimationTypeHelper =
  UnionStopGuestUiAnimationTypeHelper;
//# sourceMappingURL=UnionStopGuestUiAnimationTypeHelper.js.map
