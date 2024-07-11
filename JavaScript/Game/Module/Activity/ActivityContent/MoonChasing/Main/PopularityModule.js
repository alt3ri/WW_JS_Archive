"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopularityModule = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class PopularityModule extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
    ];
  }
  OnBeforeShow() {
    this.RefreshPopularity();
  }
  RefreshPopularity() {
    var e =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetCurrentPopularityConfig(),
      i = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
    this.GetText(1)?.SetText(
      "<color=#ffd52b>" + i + "</color>/" + e.PopularityValue,
    ),
      this.GetSprite(2).SetFillAmount(i / e.PopularityValue),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.PopularityRating);
  }
}
exports.PopularityModule = PopularityModule;
//# sourceMappingURL=PopularityModule.js.map
