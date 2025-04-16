"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnableAlertArea = void 0);
const UnionDisableAlertConditionHelper_1 = require("./UnionDisableAlertConditionHelper");
class FbEnableAlertArea {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Yph = !1),
      (this.zph = 0),
      (this.Dch = !1),
      (this.bSo = !1),
      (this.jSh = !1),
      (this.HSh = void 0);
  }
  static Create(t) {
    if (t) return new FbEnableAlertArea(t);
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
  get IsEnable() {
    return (
      this.Dch ||
        ((this.Dch = !0), (this.bSo = this.FbDataInternal.isEnable())),
      this.bSo
    );
  }
  get AutoDisableCondition() {
    var t, i;
    return (
      !this.jSh &&
        ((this.jSh = !0),
        (t = this.FbDataInternal.autoDisableConditionType()),
        (i =
          UnionDisableAlertConditionHelper_1.UnionDisableAlertConditionHelper.GetUnionDisableAlertConditionObject(
            t,
          ))) &&
        (this.HSh =
          UnionDisableAlertConditionHelper_1.UnionDisableAlertConditionHelper.ReadUnionDisableAlertCondition(
            t,
            this.FbDataInternal.autoDisableCondition(i),
          )),
      this.HSh
    );
  }
}
exports.FbEnableAlertArea = FbEnableAlertArea;
//# sourceMappingURL=FbEnableAlertArea.js.map
