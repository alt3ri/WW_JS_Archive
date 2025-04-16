"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerPassBuffShowItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerPassBuffShowItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.fGt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  Refresh(e) {
    this.fGt = e;
    var e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
        this.fGt[0].ItemId,
      ),
      r = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
        e.QualityId,
      ),
      s = this.GetText(1);
    s?.ShowTextNew(e.Name),
      s?.SetColor(UE.Color.FromHex(r.DropColor)),
      this.GetText(2)?.ShowTextNew(e.AttributesDescription),
      this.SetTextureByPath(e.Icon, this.GetTexture(0)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ShipTower", 69, "ShipTowerPassBuffShowItem", [
          "Refresh",
          this.fGt,
        ]);
  }
}
exports.ShipTowerPassBuffShowItem = ShipTowerPassBuffShowItem;
//# sourceMappingURL=ShipTowerPassBuffShowItem.js.map
