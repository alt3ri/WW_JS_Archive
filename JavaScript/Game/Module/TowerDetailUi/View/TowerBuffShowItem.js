"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerBuffShowItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class TowerBuffShowItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(), (this.lLo = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  Refresh(e, r, t) {
    (this.lLo = Number(e)), this.Og();
  }
  Og() {
    var e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerBuffDesc(
      this.lLo,
    );
    var e =
      (this.GetText(1).SetText(e),
      ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerBuffIcon(
        this.lLo,
      ));
    this.SetTextureByPath(e, this.GetTexture(0)),
      this.GetTexture(0)?.SetUIActive(!0);
  }
}
exports.TowerBuffShowItem = TowerBuffShowItem;
// # sourceMappingURL=TowerBuffShowItem.js.map
