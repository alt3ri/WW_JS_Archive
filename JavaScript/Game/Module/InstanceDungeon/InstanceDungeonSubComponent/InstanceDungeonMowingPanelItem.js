"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonMowingPanelItem = void 0);
const ue_1 = require("ue"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class InstanceDungeonMowingPanelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.k9a = () => {
        this.Pe?.LeftBtnClickCallBack?.();
      }),
      (this.N9a = () => {
        this.Pe?.RightBtnClickCallBack?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, ue_1.UIButtonComponent],
      [1, ue_1.UIItem],
      [2, ue_1.UIButtonComponent],
      [3, ue_1.UIItem],
      [4, ue_1.UIText],
      [5, ue_1.UIItem],
      [6, ue_1.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.k9a],
        [2, this.N9a],
      ]);
  }
  OnStart() {
    RedDotController_1.RedDotController.BindRedDot(
      "RedDotMowingRiskBuffAll",
      this.GetItem(1),
    ),
      RedDotController_1.RedDotController.BindRedDot(
        "RedDotMowingRiskReward",
        this.GetItem(3),
      ),
      this.Pe && this.RefreshItem();
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindRedDot("RedDotMowingRiskBuffAll"),
      RedDotController_1.RedDotController.UnBindRedDot(
        "RedDotMowingRiskReward",
      );
  }
  RefreshItemByData(e) {
    (this.Pe = e), this.InAsyncLoading() || this.RefreshItem();
  }
  RefreshItem() {
    this.Pe &&
      (this.GetItem(6)?.SetUIActive(this.Pe.ScoreItemActive),
      this.Pe.ScoreItemActive) &&
      this.Pe.ScoreText &&
      this.GetText(4).SetText(this.Pe.ScoreText);
  }
}
exports.InstanceDungeonMowingPanelItem = InstanceDungeonMowingPanelItem;
//# sourceMappingURL=InstanceDungeonMowingPanelItem.js.map
