"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotNodeItem = exports.HandBookQuestPlotItem = void 0);
const UE = require("ue"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class HandBookQuestPlotItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.PlotNodeItem = void 0),
      (this.Hxn = void 0),
      (this.bBn = void 0);
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), void 0, !0), await this.WZt();
  }
  async WZt() {
    (this.PlotNodeItem = new PlotNodeItem()),
      this.AddChild(this.PlotNodeItem),
      this.GetItem(0).SetUIActive(!1),
      await this.PlotNodeItem.CreateByActorAsync(this.GetItem(1).GetOwner()),
      this.PlotNodeItem.BindClickCallback(this.Hxn);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  GetUsingItem(t) {
    return this.GetItem(1).GetOwner();
  }
  Update(t, e) {
    this.PlotNodeItem.SetUiActive(!0),
      this.PlotNodeItem.Update(t.TidText, this.qBn(t.TidText));
  }
  GetNodeToggle() {
    return this.PlotNodeItem.GetNodeToggle();
  }
  SetToggleState(t) {
    this.PlotNodeItem.SetToggleState(t);
  }
  ClearItem() {
    this.Destroy();
  }
  BindClickCallback(t) {
    this.Hxn = t;
  }
  qBn(t) {
    return !!this.bBn && this.bBn(t);
  }
  BindIsSelectFunction(t) {
    this.bBn = t;
  }
  GetTidText() {
    return this.PlotNodeItem?.GetTidText();
  }
  GetToggleItem() {
    return this.PlotNodeItem?.GetNodeToggle();
  }
}
exports.HandBookQuestPlotItem = HandBookQuestPlotItem;
class PlotNodeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Hxn = void 0),
      (this.$Ve = void 0),
      (this.os = ""),
      (this.OnClickExtendToggle = (t) => {
        1 === t && this.Hxn && this.Hxn(this.os, this.$Ve);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickExtendToggle]]);
  }
  OnStart() {
    (this.$Ve = this.GetExtendToggle(0)), this.$Ve.SetToggleState(0);
  }
  BindClickCallback(t) {
    this.Hxn = t;
  }
  Update(t, e) {
    this.os = t;
    t = PublicUtil_1.PublicUtil.GetConfigTextByKey(t)
      .replace("{q_count}", "0")
      .replace("{q_countMax}", "-");
    this.GetText(1)?.SetText(t),
      this.$Ve?.SetToggleStateForce(e ? 1 : 0, !1, !1);
  }
  GetTidText() {
    return this.os;
  }
  SetToggleState(t) {
    this.$Ve?.SetToggleStateForce(t, !1, !1);
  }
  GetNodeToggle() {
    return this.$Ve;
  }
}
exports.PlotNodeItem = PlotNodeItem;
//# sourceMappingURL=HandBookQuestPlotItem.js.map
