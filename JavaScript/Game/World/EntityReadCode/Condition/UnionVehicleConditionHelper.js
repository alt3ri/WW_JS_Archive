"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionVehicleConditionHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbCheckIsPlayerUsingVehicle_1 = require("./FbCheckIsPlayerUsingVehicle"),
  FbCheckIsUsingVehicle_1 = require("./FbCheckIsUsingVehicle");
class UnionVehicleConditionHelper {
  static GetUnionVehicleConditionObject(e) {
    switch (e) {
      case fb_condition_1.UnionVehicleCondition.CheckIsPlayerUsingVehicle:
        return new fb_condition_1.CheckIsPlayerUsingVehicle();
      case fb_condition_1.UnionVehicleCondition.CheckIsUsingVehicle:
        return new fb_condition_1.CheckIsUsingVehicle();
      default:
        return;
    }
  }
  static ReadUnionVehicleCondition(e, i) {
    if (void 0 !== i)
      switch (e) {
        case fb_condition_1.UnionVehicleCondition.CheckIsPlayerUsingVehicle:
          return FbCheckIsPlayerUsingVehicle_1.FbCheckIsPlayerUsingVehicle.Create(
            i,
          );
        case fb_condition_1.UnionVehicleCondition.CheckIsUsingVehicle:
          return FbCheckIsUsingVehicle_1.FbCheckIsUsingVehicle.Create(i);
        default:
          return;
      }
  }
}
exports.UnionVehicleConditionHelper = UnionVehicleConditionHelper;
//# sourceMappingURL=UnionVehicleConditionHelper.js.map
