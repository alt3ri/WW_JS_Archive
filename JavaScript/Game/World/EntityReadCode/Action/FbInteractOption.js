"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInteractOption = void 0);
const FbDurationInteract_1 = require("./FbDurationInteract"),
  FbOptionLockTip_1 = require("./FbOptionLockTip"),
  UnionInteractOptionHelper_1 = require("./UnionInteractOptionHelper"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbInteractOption {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.__h = !1),
      (this.c_h = void 0),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.d_h = !1),
      (this.m_h = void 0),
      (this.C_h = !1),
      (this.g_h = void 0),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.p_h = !1),
      (this.v_h = void 0),
      (this.y_h = !1),
      (this.S_h = void 0),
      (this.M_h = !1),
      (this.E_h = 0),
      (this.I_h = !1),
      (this.y6o = void 0),
      (this.T_h = !1),
      (this.b_h = void 0);
  }
  static Create(t) {
    if (t) return new FbInteractOption(t);
  }
  get Guid() {
    return (
      this.__h || ((this.__h = !0), (this.c_h = this.FbDataInternal.guid())),
      this.c_h
    );
  }
  get Type() {
    var t, i;
    return (
      !this.u_h &&
        ((this.u_h = !0),
        (t = this.FbDataInternal.typeType()),
        (i =
          UnionInteractOptionHelper_1.UnionInteractOptionHelper.GetUnionInteractOptionObject(
            t,
          ))) &&
        (this.f8o =
          UnionInteractOptionHelper_1.UnionInteractOptionHelper.ReadUnionInteractOption(
            t,
            this.FbDataInternal.type(i),
          )),
      this.f8o
    );
  }
  get Icon() {
    return (
      this.d_h || ((this.d_h = !0), (this.m_h = this.FbDataInternal.icon())),
      this.m_h
    );
  }
  get TidContent() {
    return (
      this.C_h ||
        ((this.C_h = !0), (this.g_h = this.FbDataInternal.tidContent())),
      this.g_h
    );
  }
  get Condition() {
    return (
      this.f_h ||
        ((this.f_h = !0),
        (this.X6o = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.condition(),
        ))),
      this.X6o
    );
  }
  get UniquenessTest() {
    return (
      this.p_h ||
        ((this.p_h = !0), (this.v_h = this.FbDataInternal.uniquenessTest())),
      this.v_h
    );
  }
  get DoIntactType() {
    return (
      this.y_h ||
        ((this.y_h = !0), (this.S_h = this.FbDataInternal.doIntactType())),
      this.S_h
    );
  }
  get Range() {
    return (
      this.M_h || ((this.M_h = !0), (this.E_h = this.FbDataInternal.range())),
      this.E_h
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0),
        (this.y6o = FbDurationInteract_1.FbDurationInteract.Create(
          this.FbDataInternal.duration(),
        ))),
      this.y6o
    );
  }
  get OptionLockTip() {
    return (
      this.T_h ||
        ((this.T_h = !0),
        (this.b_h = FbOptionLockTip_1.FbOptionLockTip.Create(
          this.FbDataInternal.optionLockTip(),
        ))),
      this.b_h
    );
  }
}
exports.FbInteractOption = FbInteractOption;
//# sourceMappingURL=FbInteractOption.js.map
