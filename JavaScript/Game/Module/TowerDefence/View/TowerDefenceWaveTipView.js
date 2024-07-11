"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseWaveTipView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GenericPromptFloatTipsBase_1 = require("../../GenericPrompt/View/GenericPromptFloatTipsBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class TowerDefenseWaveTipView extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    var e = this.OpenParam,
      e =
        ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptMainTextObj(
          e.PromptId,
        );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TextKey ?? "");
  }
}
exports.TowerDefenseWaveTipView = TowerDefenseWaveTipView;
//# sourceMappingURL=TowerDefenceWaveTipView.js.map
