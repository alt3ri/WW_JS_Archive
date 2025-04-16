"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTurntableControllerHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbFixedAngleTurntable_1 = require("./FbFixedAngleTurntable"),
  FbFreeAngleTurntable_1 = require("./FbFreeAngleTurntable");
class UnionTurntableControllerHelper {
  static GetUnionTurntableControllerObject(e) {
    switch (e) {
      case fb_component_1.UnionTurntableController.FixedAngleTurntable:
        return new fb_component_1.FixedAngleTurntable();
      case fb_component_1.UnionTurntableController.FreeAngleTurntable:
        return new fb_component_1.FreeAngleTurntable();
      default:
        return;
    }
  }
  static ReadUnionTurntableController(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_component_1.UnionTurntableController.FixedAngleTurntable:
          return FbFixedAngleTurntable_1.FbFixedAngleTurntable.Create(n);
        case fb_component_1.UnionTurntableController.FreeAngleTurntable:
          return FbFreeAngleTurntable_1.FbFreeAngleTurntable.Create(n);
        default:
          return;
      }
  }
}
exports.UnionTurntableControllerHelper = UnionTurntableControllerHelper;
//# sourceMappingURL=UnionTurntableControllerHelper.js.map
