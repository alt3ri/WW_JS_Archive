"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerRecordItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  ShipTowerMediumItem_1 = require("./ShipTowerMediumItem");
class ShipTowerRecordItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.H3e = void 0),
      (this.ClickCallBack = void 0),
      (this.wD_ = () => {
        var e = new ShipTowerMediumItem_1.ShipTowerMediumItem();
        return (e.RefreshCallBack = e.RefreshRecord.bind(e)), e;
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIHorizontalLayout],
      [4, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.H3e = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.wD_,
      ));
  }
  Refresh(e) {
    (this.fGt = e),
      this.GetText(0)?.SetText(this.fGt.Title),
      this.GetText(1)?.SetText(this.fGt.Score.toString()),
      this.GetText(2)?.SetText(this.fGt.Wave.toString());
    e = [...this.fGt.TeamList, { Id: this.fGt.BuffId, Count: 1 }];
    this.H3e?.RefreshByData(e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ShipTower", 69, "ShipTowerRecordItem", [
          "Refresh",
          this.fGt,
        ]);
  }
}
exports.ShipTowerRecordItem = ShipTowerRecordItem;
//# sourceMappingURL=ShipTowerRecordItem.js.map
