"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonCostItem = void 0);
const ue_1 = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ExchangeRewardModel_1 = require("../ExchangeReward/ExchangeRewardModel");
class InstanceDungeonCostItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Uth = void 0),
      (this.Nli = () => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(
          ExchangeRewardModel_1.POWER_DISCOUNT_HELP_ID,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, ue_1.UITexture],
      [1, ue_1.UIText],
      [2, ue_1.UIButtonComponent],
      [3, ue_1.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.Nli]]);
  }
  OnStart() {
    this.GetItem(3)?.SetUIActive(!1),
      this.GetButton(2)?.RootUIComp.SetUIActive(!1),
      this.Uth && this.RefreshItem(this.Uth.Item);
  }
  RefreshItem(e) {
    this.InAsyncLoading()
      ? (this.Uth = { Item: e })
      : (this.GetText(1)?.SetText("x" + e[1]),
        this.SetItemIcon(this.GetTexture(0), e[0]?.ItemId));
  }
}
exports.InstanceDungeonCostItem = InstanceDungeonCostItem;
//# sourceMappingURL=InstanceDungeonCostItem.js.map
