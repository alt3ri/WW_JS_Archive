"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerWordItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerWordItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.fGt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UISprite],
    ];
  }
  Refresh(r) {
    (this.fGt = r),
      this.GetText(1).SetText(r.Title),
      r.TitleColor &&
        (this.GetText(1).SetColor(UE.Color.FromHex(r.TitleColor)),
        this.GetSprite(0).SetColor(UE.Color.FromHex(r.TitleColor))),
      this.SetSpriteByPath(r.IconPath, this.GetSprite(2), !1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ShipTower", 69, "ShipTowerWordItem", [
          "Refresh",
          this.fGt,
        ]);
  }
}
exports.ShipTowerWordItem = ShipTowerWordItem;
//# sourceMappingURL=ShipTowerWordItem.js.map
