"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingPermanentRewardButton = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../../Ui/UiManager");
class FishingPermanentRewardButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.UFe = () => {
        UiManager_1.UiManager.OpenView("FishingHandBookRewardView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.UFe]]);
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh() {
    this.BNe(), this.Nqe();
  }
  BNe() {
    var e =
      ModelManager_1.ModelManager.FishingModel.GetHandBookRewardRedDotState();
    this.GetItem(2).SetUIActive(e);
  }
  Nqe() {
    var e =
        ModelManager_1.ModelManager.FishingModel.GetHandBookRewardHaveTakenCount(),
      r =
        ModelManager_1.ModelManager.FishingModel.FishingItemHandBookRewardMap
          .size;
    this.GetText(1).SetText(e + "/" + r);
  }
}
exports.FishingPermanentRewardButton = FishingPermanentRewardButton;
//# sourceMappingURL=FishingPermanentRewardButton.js.map
