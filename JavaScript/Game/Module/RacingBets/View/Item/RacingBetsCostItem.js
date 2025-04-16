"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsCostItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RacingBetsCostItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  RefreshUi(e, s) {
    e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(2)),
      this.GetText(1).SetText(s.toString());
  }
}
exports.RacingBetsCostItem = RacingBetsCostItem;
//# sourceMappingURL=RacingBetsCostItem.js.map
