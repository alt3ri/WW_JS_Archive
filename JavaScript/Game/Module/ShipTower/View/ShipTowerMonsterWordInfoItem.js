"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerMonsterWordInfoItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerMonsterWordInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  Refresh(r) {
    var e = !!r?.IconPath,
      t = this.GetSprite(1),
      s = this.GetItem(0);
    e && this.SetSpriteByPath(r.IconPath, t, !1),
      s.SetUIActive(e),
      this.GetText(2).SetText(r.Desc);
  }
}
exports.ShipTowerMonsterWordInfoItem = ShipTowerMonsterWordInfoItem;
//# sourceMappingURL=ShipTowerMonsterWordInfoItem.js.map
