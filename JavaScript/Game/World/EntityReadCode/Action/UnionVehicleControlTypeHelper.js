"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionVehicleControlTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbVehicleEnterPathMove_1 = require("./FbVehicleEnterPathMove"),
  FbVehicleExitPathMove_1 = require("./FbVehicleExitPathMove");
class UnionVehicleControlTypeHelper {
  static GetUnionVehicleControlTypeObject(e) {
    switch (e) {
      case fb_action_1.UnionVehicleControlType.VehicleEnterPathMove:
        return new fb_action_1.VehicleEnterPathMove();
      case fb_action_1.UnionVehicleControlType.VehicleExitPathMove:
        return new fb_action_1.VehicleExitPathMove();
      default:
        return;
    }
  }
  static ReadUnionVehicleControlType(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionVehicleControlType.VehicleEnterPathMove:
          return FbVehicleEnterPathMove_1.FbVehicleEnterPathMove.Create(t);
        case fb_action_1.UnionVehicleControlType.VehicleExitPathMove:
          return FbVehicleExitPathMove_1.FbVehicleExitPathMove.Create(t);
        default:
          return;
      }
  }
}
exports.UnionVehicleControlTypeHelper = UnionVehicleControlTypeHelper;
//# sourceMappingURL=UnionVehicleControlTypeHelper.js.map
