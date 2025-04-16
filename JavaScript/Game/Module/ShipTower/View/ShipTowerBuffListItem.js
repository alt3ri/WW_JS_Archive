"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerBuffListItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  ShipTowerBuffItem_1 = require("./ShipTowerBuffItem");
class ShipTowerBuffListItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.s4e = void 0),
      (this.OnItemClickCallback = void 0),
      (this.GetStageIdCallback = void 0),
      (this.BuffComponentLoadedCallback = void 0),
      (this.gDo = () => {
        var t = new ShipTowerBuffItem_1.ShipTowerBuffItem();
        return (
          (t.OnItemClickCallback = this.OnItemClickCallback),
          (t.GetStageIdCallback = this.GetStageIdCallback),
          (t.AllComponentLoadedCallback = this.BuffComponentLoadedCallback),
          t
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIGridLayout],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.s4e = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(1),
        this.gDo,
      ));
  }
  async RefreshAsync(t) {
    (this.fGt = t),
      await this.s4e?.RefreshByDataAsync(this.fGt?.BuffList, !0),
      this.GetText(0).ShowTextNew(this.fGt.Title),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Map", 69, this.constructor.name, [
          "RefreshAsync",
          this.fGt,
        ]);
  }
  Refresh(t) {
    (this.fGt = t),
      this.s4e?.RefreshByData(this.fGt?.BuffList, void 0, !0),
      this.GetText(0).ShowTextNew(this.fGt.Title),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Map", 69, this.constructor.name, [
          "Refresh",
          this.fGt,
        ]);
  }
  UpdateBuffInfo() {
    this.s4e?.GetLayoutItemList().forEach((t) => {
      t.UpdateBuffInfo();
    });
  }
  UpdateBuffSelected() {
    this.s4e?.GetLayoutItemList().forEach((t) => {
      t.UpdateBuffSelected();
    });
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (this.fGt && 0 !== this.fGt.BuffList.length && 3 === t.length)
      return (
        (t = Number(t[2])),
        !(isNaN(t) || t < 0 || t >= this.fGt.BuffList.length) &&
        (t = this.s4e?.GetItemByIndex(t))
          ? [t, t]
          : void 0
      );
  }
}
exports.ShipTowerBuffListItem = ShipTowerBuffListItem;
//# sourceMappingURL=ShipTowerBuffListItem.js.map
