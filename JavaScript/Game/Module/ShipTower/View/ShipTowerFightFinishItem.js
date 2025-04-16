"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerFightFinishItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerFightFinishItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.fGt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
    ];
  }
  Refresh(i) {
    var t = (this.fGt = i).ScoreA + i.ScoreB;
    this.GetText(0).SetText(t.toString()),
      this.GetText(1).SetText(i.ScoreA.toString()),
      this.GetText(2).SetText(i.ScoreB.toString()),
      this.GetText(3).ShowTextNew(i.TotalTitle),
      this.GetText(4).ShowTextNew(i.TitleA),
      this.GetText(5).ShowTextNew(i.TitleB),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ShipTower", 69, "ShipTowerFightFinishItem", [
          "Refresh",
          this.fGt,
        ]);
  }
}
exports.ShipTowerFightFinishItem = ShipTowerFightFinishItem;
//# sourceMappingURL=ShipTowerFightFinishItem.js.map
