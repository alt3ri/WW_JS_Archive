"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymDifficultyStateItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class LordGymDifficultyStateItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(e, t, r) {
    let i = "";
    switch (e) {
      case 0:
        i = "T_MapDifficultyLock";
        break;
      case 1:
        i = "T_MapDifficultyEmpty";
        break;
      case 2:
        i = "T_MapDifficultyTick";
    }
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetTextureByPath(e, this.GetTexture(0));
  }
}
exports.LordGymDifficultyStateItem = LordGymDifficultyStateItem;
//# sourceMappingURL=LordGymDifficultyStateItem.js.map
