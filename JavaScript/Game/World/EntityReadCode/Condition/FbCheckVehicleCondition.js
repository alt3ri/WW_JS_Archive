"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckVehicleCondition = void 0);
const UnionVehicleConditionHelper_1 = require("./UnionVehicleConditionHelper");
class FbCheckVehicleCondition {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.f_h = !1),
      (this.X6o = void 0);
  }
  static Create(i) {
    if (i) return new FbCheckVehicleCondition(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Condition() {
    var i, e;
    return (
      !this.f_h &&
        ((this.f_h = !0),
        (i = this.FbDataInternal.conditionType()),
        (e =
          UnionVehicleConditionHelper_1.UnionVehicleConditionHelper.GetUnionVehicleConditionObject(
            i,
          ))) &&
        (this.X6o =
          UnionVehicleConditionHelper_1.UnionVehicleConditionHelper.ReadUnionVehicleCondition(
            i,
            this.FbDataInternal.condition(e),
          )),
      this.X6o
    );
  }
}
exports.FbCheckVehicleCondition = FbCheckVehicleCondition;
//# sourceMappingURL=FbCheckVehicleCondition.js.map
