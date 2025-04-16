"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerBuffWayItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerBuffWayItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.Is_ = () => {
        this.fGt?.Function();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.Is_]]);
  }
  Refresh(t) {
    (this.fGt = t),
      this.GetText(1).SetText(this.fGt.Text),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Map", 69, this.constructor.name, [
          "Refresh",
          this.fGt,
        ]);
  }
}
exports.ShipTowerBuffWayItem = ShipTowerBuffWayItem;
//# sourceMappingURL=ShipTowerBuffWayItem.js.map
