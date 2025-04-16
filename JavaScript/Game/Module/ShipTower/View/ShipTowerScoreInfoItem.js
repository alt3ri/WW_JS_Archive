"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerScoreInfoItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  ShipTowerScoreTargetItem_1 = require("./ShipTowerScoreTargetItem");
class ShipTowerScoreInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.s4e = void 0),
      (this.Sa_ = () => {
        return new ShipTowerScoreTargetItem_1.ShipTowerScoreTargetItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.s4e = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(1),
        this.Sa_,
      ));
  }
  OnBeforeCreate() {}
  OnStart() {}
  OnBeforeDestroy() {}
  Refresh(e) {
    (this.fGt = e),
      this.GetText(0).SetText(this.fGt.Title),
      this.s4e?.RefreshByDataAsync(this.fGt.TargetList),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Map", 69, this.constructor.name, [
          "Refresh",
          this.fGt,
        ]);
  }
}
exports.ShipTowerScoreInfoItem = ShipTowerScoreInfoItem;
//# sourceMappingURL=ShipTowerScoreInfoItem.js.map
