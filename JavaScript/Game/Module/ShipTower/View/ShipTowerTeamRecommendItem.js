"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerTeamRecommendItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  ShipTowerDefine_1 = require("../ShipTowerDefine"),
  ShipTowerMediumItem_1 = require("./ShipTowerMediumItem");
class ShipTowerTeamRecommendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.PD_ = void 0),
      (this.xD_ = void 0),
      (this.ClickCallBack = void 0),
      (this.i7_ = void 0),
      (this.UD_ = () => {
        this.ClickCallBack?.(this.fGt);
      }),
      (this.DD_ = () => {
        var e = new ShipTowerMediumItem_1.ShipTowerMediumItem();
        return (
          (e.RefreshCallBack = e.RefreshRecommend.bind(e)),
          (e.GetStageIdCallback = this.BW_),
          e
        );
      }),
      (this.BW_ = () => this.fGt.StageData?.Id);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIButtonComponent],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.PD_ = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(2),
        this.DD_,
      )),
      (this.xD_ = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.DD_,
      )),
      (this.i7_ = new ButtonItem_1.ButtonItem(this.GetButton(4)?.RootUIComp)),
      this.i7_.SetFunction(this.UD_),
      this.i7_.SetShowText(ShipTowerDefine_1.shipTowerTextKey.Use);
  }
  OnStart() {}
  Refresh(e, t, i) {
    var r = [...(this.fGt = e).RoleIdList1, { Id: e.Buff1, Count: 1 }],
      s = [...e.RoleIdList2, { Id: e.Buff2, Count: 1 }],
      r =
        (this.PD_?.RefreshByData(r),
        this.xD_?.RefreshByData(s),
        this.GetText(0)?.SetText(e.Name),
        this.GetText(1)?.SetText(e.UseRate + "%"),
        !!this.fGt.StageData?.IsCanApplyTeamRecommend(this.fGt));
    this.i7_.SetEnableClick(r),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ShipTower", 69, "ShipTowerTeamRecommendItem", [
          "Refresh",
          this.fGt.Name,
        ]);
  }
}
exports.ShipTowerTeamRecommendItem = ShipTowerTeamRecommendItem;
//# sourceMappingURL=ShipTowerTeamRecommendItem.js.map
