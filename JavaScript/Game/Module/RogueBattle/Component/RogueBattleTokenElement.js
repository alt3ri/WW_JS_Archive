"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleTokenElement = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RogueBattleTokenElement extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
    ];
  }
  Refresh(e, r, t) {
    var s,
      e = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e);
    e &&
      ((s = UE.Color.FromHex(e.ElementColor)),
      this.GetSprite(0).SetColor(s),
      this.SetTextureByPath(e.Icon5, this.GetTexture(1)));
  }
}
exports.RogueBattleTokenElement = RogueBattleTokenElement;
//# sourceMappingURL=RogueBattleTokenElement.js.map
