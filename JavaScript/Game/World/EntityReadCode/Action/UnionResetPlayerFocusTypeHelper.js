"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionResetPlayerFocusTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbResetPlayerFocusToDefaultDirection_1 = require("./FbResetPlayerFocusToDefaultDirection"),
  FbResetPlayerFocusToFixedDirection_1 = require("./FbResetPlayerFocusToFixedDirection");
class UnionResetPlayerFocusTypeHelper {
  static GetUnionResetPlayerFocusTypeObject(e) {
    switch (e) {
      case fb_action_1.UnionResetPlayerFocusType
        .ResetPlayerFocusToDefaultDirection:
        return new fb_action_1.ResetPlayerFocusToDefaultDirection();
      case fb_action_1.UnionResetPlayerFocusType
        .ResetPlayerFocusToFixedDirection:
        return new fb_action_1.ResetPlayerFocusToFixedDirection();
      default:
        return;
    }
  }
  static ReadUnionResetPlayerFocusType(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionResetPlayerFocusType
          .ResetPlayerFocusToDefaultDirection:
          return FbResetPlayerFocusToDefaultDirection_1.FbResetPlayerFocusToDefaultDirection.Create(
            t,
          );
        case fb_action_1.UnionResetPlayerFocusType
          .ResetPlayerFocusToFixedDirection:
          return FbResetPlayerFocusToFixedDirection_1.FbResetPlayerFocusToFixedDirection.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionResetPlayerFocusTypeHelper = UnionResetPlayerFocusTypeHelper;
//# sourceMappingURL=UnionResetPlayerFocusTypeHelper.js.map
