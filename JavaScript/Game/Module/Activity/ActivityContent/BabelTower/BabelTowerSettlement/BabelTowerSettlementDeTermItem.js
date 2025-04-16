"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerSettlementDeTermItem = void 0);
const UE = require("ue"),
  BabelTowerDeTermById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerDeTermById"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class BabelTowerSettlementDeTermItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(e, r, t) {
    e = BabelTowerDeTermById_1.configBabelTowerDeTermById.GetConfig(e);
    this.SetTextureByPath(e.Texture, this.GetTexture(0));
  }
}
exports.BabelTowerSettlementDeTermItem = BabelTowerSettlementDeTermItem;
//# sourceMappingURL=BabelTowerSettlementDeTermItem.js.map
