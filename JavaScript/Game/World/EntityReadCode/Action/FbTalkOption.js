"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTalkOption = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("./FbActionInfo"),
  FbOptionLockTip_1 = require("./FbOptionLockTip"),
  UnionTalkOptionParamHelper_1 = require("./UnionTalkOptionParamHelper"),
  UnionTalkOptionPreConditionHelper_1 = require("./UnionTalkOptionPreConditionHelper");
class FbTalkOption {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Ggh = !1),
      (this.Ogh = void 0),
      (this.CCh = !1),
      (this.gCh = 0),
      (this.igh = !1),
      (this.rgh = 0),
      (this.vCh = !1),
      (this.yCh = void 0),
      (this.d_h = !1),
      (this.m_h = 0),
      (this.Fgh = !1),
      (this.Ngh = !1),
      (this.L_h = !1),
      (this.A_h = void 0),
      (this.Vgh = !1),
      (this.jgh = void 0),
      (this.Hgh = !1),
      (this.Wgh = void 0),
      (this.ogh = !1),
      (this.ngh = !1),
      (this.sgh = !1),
      (this.agh = void 0),
      (this.T_h = !1),
      (this.b_h = void 0),
      (this.Qgh = !1),
      (this.Kgh = void 0);
  }
  static Create(t) {
    if (t) return new FbTalkOption(t);
  }
  get TidTalkOption() {
    return (
      this.Ggh ||
        ((this.Ggh = !0), (this.Ogh = this.FbDataInternal.tidTalkOption())),
      this.Ogh
    );
  }
  get TextId() {
    return (
      this.CCh || ((this.CCh = !0), (this.gCh = this.FbDataInternal.textId())),
      this.gCh
    );
  }
  get PlotLineId() {
    return (
      this.igh ||
        ((this.igh = !0), (this.rgh = this.FbDataInternal.plotLineId())),
      this.rgh
    );
  }
  get PlotLineKey() {
    return (
      this.vCh ||
        ((this.vCh = !0), (this.yCh = this.FbDataInternal.plotLineKey())),
      this.yCh
    );
  }
  get Icon() {
    return (
      this.d_h || ((this.d_h = !0), (this.m_h = this.FbDataInternal.icon())),
      this.m_h
    );
  }
  get ReadMarkEnabled() {
    return (
      this.Fgh ||
        ((this.Fgh = !0), (this.Ngh = this.FbDataInternal.readMarkEnabled())),
      this.Ngh
    );
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.A_h;
  }
  get OptionStyle() {
    return (
      this.Vgh ||
        ((this.Vgh = !0), (this.jgh = this.FbDataInternal.optionStyle())),
      this.jgh
    );
  }
  get PreCondition() {
    var t, i;
    return (
      !this.Hgh &&
        ((this.Hgh = !0),
        (t = this.FbDataInternal.preConditionType()),
        (i =
          UnionTalkOptionPreConditionHelper_1.UnionTalkOptionPreConditionHelper.GetUnionTalkOptionPreConditionObject(
            t,
          ))) &&
        (this.Wgh =
          UnionTalkOptionPreConditionHelper_1.UnionTalkOptionPreConditionHelper.ReadUnionTalkOptionPreCondition(
            t,
            this.FbDataInternal.preCondition(i),
          )),
      this.Wgh
    );
  }
  get _folded() {
    return (
      this.ogh || ((this.ogh = !0), (this.ngh = this.FbDataInternal.folded())),
      this.ngh
    );
  }
  get _editFlag() {
    return (
      this.sgh ||
        ((this.sgh = !0), (this.agh = this.FbDataInternal.editFlag())),
      this.agh
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
  get TypeParams() {
    var t, i;
    return (
      !this.Qgh &&
        ((this.Qgh = !0),
        (t = this.FbDataInternal.typeParamsType()),
        (i =
          UnionTalkOptionParamHelper_1.UnionTalkOptionParamHelper.GetUnionTalkOptionParamObject(
            t,
          ))) &&
        (this.Kgh =
          UnionTalkOptionParamHelper_1.UnionTalkOptionParamHelper.ReadUnionTalkOptionParam(
            t,
            this.FbDataInternal.typeParams(i),
          )),
      this.Kgh
    );
  }
}
exports.FbTalkOption = FbTalkOption;
//# sourceMappingURL=FbTalkOption.js.map
