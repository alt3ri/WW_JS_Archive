"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionControlTrackingTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbControlTrackingOther_1 = require("./FbControlTrackingOther"),
  FbControlTrackingSelf_1 = require("./FbControlTrackingSelf");
class UnionControlTrackingTypeHelper {
  static GetUnionControlTrackingTypeObject(r) {
    switch (r) {
      case fb_action_1.UnionControlTrackingType.ControlTrackingOther:
        return new fb_action_1.ControlTrackingOther();
      case fb_action_1.UnionControlTrackingType.ControlTrackingSelf:
        return new fb_action_1.ControlTrackingSelf();
      default:
        return;
    }
  }
  static ReadUnionControlTrackingType(r, e) {
    if (void 0 !== e)
      switch (r) {
        case fb_action_1.UnionControlTrackingType.ControlTrackingOther:
          return FbControlTrackingOther_1.FbControlTrackingOther.Create(e);
        case fb_action_1.UnionControlTrackingType.ControlTrackingSelf:
          return FbControlTrackingSelf_1.FbControlTrackingSelf.Create(e);
        default:
          return;
      }
  }
}
exports.UnionControlTrackingTypeHelper = UnionControlTrackingTypeHelper;
//# sourceMappingURL=UnionControlTrackingTypeHelper.js.map
