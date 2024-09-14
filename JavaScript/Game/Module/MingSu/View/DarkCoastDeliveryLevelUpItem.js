"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DarkCoastDeliveryLevelUpItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class DarkCoastDeliveryLevelUpItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(e, r, t) {
    e = e.Config.VisionTexture;
    this.SetTextureShowUntilLoaded(e, this.GetTexture(0));
  }
}
exports.DarkCoastDeliveryLevelUpItem = DarkCoastDeliveryLevelUpItem;
//# sourceMappingURL=DarkCoastDeliveryLevelUpItem.js.map
