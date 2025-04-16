"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsRewardTabItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsRewardTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Evc = void 0),
      (this.ClickToggleCallBack = void 0),
      (this.Ef1 = [
        "Dango_RewardPage_RewardType_1",
        "Dango_CurrencyPage_DailyTask",
        "Dango_RewardPage_RewardType_2",
      ]),
      (this.onl = () => {
        this.ClickToggleCallBack && this.ClickToggleCallBack(this.Evc);
      }),
      (this.Ivc = () => 1 !== this.GetExtendToggle(0).ToggleState);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.onl]]);
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.Ivc);
  }
  Refresh(t, e, s) {
    (this.Evc = t), this.RefreshItem();
  }
  RefreshItem() {
    this.Evc &&
      (this.GetText(1).ShowTextNew(this.Ef1[this.Evc.Id - 1]), this.BNe());
  }
  BNe() {
    var t = this.Evc.GetRewardDataList().some((t) => t.CanReceiveReward());
    this.GetItem(2)?.SetUIActive(t);
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleStateForce(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
  BindClickToggleCallBack(t) {
    this.ClickToggleCallBack = t;
  }
}
exports.RacingBetsRewardTabItem = RacingBetsRewardTabItem;
//# sourceMappingURL=RacingBetsRewardTabItem.js.map
