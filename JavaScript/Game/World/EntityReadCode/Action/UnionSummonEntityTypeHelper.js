"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSummonEntityTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbSummonVehicle_1 = require("./FbSummonVehicle");
class UnionSummonEntityTypeHelper {
  static GetUnionSummonEntityTypeObject(e) {
    if (e === fb_action_1.UnionSummonEntityType.SummonVehicle)
      return new fb_action_1.SummonVehicle();
  }
  static ReadUnionSummonEntityType(e, t) {
    return void 0 !== t && e === fb_action_1.UnionSummonEntityType.SummonVehicle
      ? FbSummonVehicle_1.FbSummonVehicle.Create(t)
      : void 0;
  }
}
exports.UnionSummonEntityTypeHelper = UnionSummonEntityTypeHelper;
//# sourceMappingURL=UnionSummonEntityTypeHelper.js.map
