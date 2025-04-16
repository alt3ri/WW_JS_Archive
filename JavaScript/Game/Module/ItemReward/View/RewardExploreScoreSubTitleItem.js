"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreScoreSubTitleItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreScoreSubTitleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  RefreshText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.DescriptionTextId),
      this.GetText(1).SetText(e.Target);
  }
}
exports.RewardExploreScoreSubTitleItem = RewardExploreScoreSubTitleItem;
//# sourceMappingURL=RewardExploreScoreSubTitleItem.js.map
