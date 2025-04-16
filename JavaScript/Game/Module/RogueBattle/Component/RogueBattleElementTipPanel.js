"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleElementTipPanel = void 0);
const UE = require("ue"),
  BuffById_1 = require("../../../../Core/Define/ConfigQuery/BuffById"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleElementTipPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  OnBeforeShow() {
    var i = ModelManager_1.ModelManager.RogueBattleModel.GetTotalElementCount();
    if ((this.GetText(1).SetText("" + i), 0 === i))
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "Roguelike_Yuansu_Empty",
      );
    else {
      var a =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetElementLevelGain(4);
      if (a) {
        let e = 0;
        for (const t of a.AddBuffs) {
          var r = BuffById_1.configBuffById.GetConfig(t);
          r && (e += (r.ModifierMagnitude[0] * i) / 100);
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), a.TextId, e);
      } else this.GetText(2).SetText("");
    }
  }
}
exports.RogueBattleElementTipPanel = RogueBattleElementTipPanel;
//# sourceMappingURL=RogueBattleElementTipPanel.js.map
