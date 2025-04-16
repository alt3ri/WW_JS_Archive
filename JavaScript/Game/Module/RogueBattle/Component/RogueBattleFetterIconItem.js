"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleFetterIconItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RogueBattleFetterIconItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(e, t, r) {
    e = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBond(e);
    e && this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(0));
  }
}
exports.RogueBattleFetterIconItem = RogueBattleFetterIconItem;
//# sourceMappingURL=RogueBattleFetterIconItem.js.map
