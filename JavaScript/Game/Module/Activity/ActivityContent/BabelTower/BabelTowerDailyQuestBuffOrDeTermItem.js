"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerDailyQuestBuffOrDeTermItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class BabelTowerDailyQuestBuffOrDeTermItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(e, r, t) {
    this.SetTextureByPath(e, this.GetTexture(0));
  }
}
exports.BabelTowerDailyQuestBuffOrDeTermItem =
  BabelTowerDailyQuestBuffOrDeTermItem;
//# sourceMappingURL=BabelTowerDailyQuestBuffOrDeTermItem.js.map
