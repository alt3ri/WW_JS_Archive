"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymLordStarItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class LordGymLordStarItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  Refresh(r, t, e) {
    this.GetItem(0)?.SetUIActive(r);
  }
}
exports.LordGymLordStarItem = LordGymLordStarItem;
//# sourceMappingURL=LordGymLordStarItem.js.map
