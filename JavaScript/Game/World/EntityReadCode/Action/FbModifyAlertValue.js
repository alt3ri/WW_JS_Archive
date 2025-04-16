"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbModifyAlertValue = void 0);
const UnionAlertValueChangeSpeedHelper_1 = require("./UnionAlertValueChangeSpeedHelper"),
  UnionSetAlertValueTypeHelper_1 = require("./UnionSetAlertValueTypeHelper");
class FbModifyAlertValue {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Yph = !1),
      (this.zph = 0),
      (this.Pvh = !1),
      (this.Uvh = void 0),
      (this.XSh = !1),
      (this.YSh = void 0);
  }
  static Create(e) {
    if (e) return new FbModifyAlertValue(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get AreaId() {
    return (
      this.Yph || ((this.Yph = !0), (this.zph = this.FbDataInternal.areaId())),
      this.zph
    );
  }
  get SetType() {
    var e, t;
    return (
      !this.Pvh &&
        ((this.Pvh = !0),
        (e = this.FbDataInternal.setTypeType()),
        (t =
          UnionSetAlertValueTypeHelper_1.UnionSetAlertValueTypeHelper.GetUnionSetAlertValueTypeObject(
            e,
          ))) &&
        (this.Uvh =
          UnionSetAlertValueTypeHelper_1.UnionSetAlertValueTypeHelper.ReadUnionSetAlertValueType(
            e,
            this.FbDataInternal.setType(t),
          )),
      this.Uvh
    );
  }
  get ChangeSpeed() {
    var e, t;
    return (
      !this.XSh &&
        ((this.XSh = !0),
        (e = this.FbDataInternal.changeSpeedType()),
        (t =
          UnionAlertValueChangeSpeedHelper_1.UnionAlertValueChangeSpeedHelper.GetUnionAlertValueChangeSpeedObject(
            e,
          ))) &&
        (this.YSh =
          UnionAlertValueChangeSpeedHelper_1.UnionAlertValueChangeSpeedHelper.ReadUnionAlertValueChangeSpeed(
            e,
            this.FbDataInternal.changeSpeed(t),
          )),
      this.YSh
    );
  }
}
exports.FbModifyAlertValue = FbModifyAlertValue;
//# sourceMappingURL=FbModifyAlertValue.js.map
