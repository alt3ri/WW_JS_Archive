"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsChampionRewardItem = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RacingBetsChampionRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ETt = 0),
      (this.O_1 = () => {
        0 < this.ETt &&
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            this.ETt,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.O_1]]);
  }
  Refresh(e) {
    (this.ETt = e),
      this.SetItemIcon(this.GetTexture(1), this.ETt),
      this.GetText(2).SetText("x1");
  }
}
exports.RacingBetsChampionRewardItem = RacingBetsChampionRewardItem;
//# sourceMappingURL=RacingBetsChampionRewardItem.js.map
