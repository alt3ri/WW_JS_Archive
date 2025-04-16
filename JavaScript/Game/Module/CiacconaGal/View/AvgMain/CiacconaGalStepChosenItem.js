"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalStepChosenItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class CiacconaGalStepChosenItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
    ];
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Content),
      this.SetTextureByPath(
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_PlotReasoningIcon03",
        ),
        this.GetTexture(1),
      );
  }
}
exports.CiacconaGalStepChosenItem = CiacconaGalStepChosenItem;
//# sourceMappingURL=CiacconaGalStepChosenItem.js.map
