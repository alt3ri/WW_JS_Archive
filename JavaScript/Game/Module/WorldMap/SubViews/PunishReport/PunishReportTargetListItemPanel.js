"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportTargetListItemPanel = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class PunishReportTargetListItemPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIText],
    ];
  }
  SetDescLocalNewTxt(e) {
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
  }
  SetDescTxt(e) {
    this.GetText(0).SetText(e);
  }
  SetNumTxt(e) {
    this.GetText(3).SetText(e);
  }
  SetState(e) {
    let t = "";
    switch (e) {
      case 0:
        t = "T_MapDifficultyLock";
        break;
      case 1:
        t = "T_MapDifficultyEmpty";
        break;
      case 2:
        t = "T_MapDifficultyTick";
    }
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetTextureByPath(e, this.GetTexture(1));
  }
}
exports.PunishReportTargetListItemPanel = PunishReportTargetListItemPanel;
//# sourceMappingURL=PunishReportTargetListItemPanel.js.map
