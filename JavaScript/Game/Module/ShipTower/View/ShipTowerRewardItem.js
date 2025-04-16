"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerRewardItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class ShipTowerRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.H3e = void 0),
      (this.ClickCallBack = void 0),
      (this.BtnReceive = void 0),
      (this.AA_ = () => {
        this.ClickCallBack?.(this.fGt);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIItem],
      [5, UE.UISprite],
      [6, UE.UISprite],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.H3e = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid(),
      )),
      this.GetItem(4)?.SetUIActive(!1),
      (this.BtnReceive = new ButtonItem_1.ButtonItem(
        this.GetButton(1).RootUIComp,
      )),
      this.BtnReceive.SetFunction(this.AA_);
  }
  Refresh(t) {
    (this.fGt = t),
      this.GetText(0)?.ShowTextNew(this.fGt.TitleKey),
      this.GetButton(1)?.RootUIComp.SetUIActive(this.fGt.IsReceive),
      this.GetText(2)?.SetUIActive(this.fGt.IsProgress),
      this.GetSprite(5)?.SetUIActive(this.fGt.IsCompleted),
      this.GetSprite(6)?.SetUIActive(this.fGt.IsCompleted),
      this.BtnReceive?.SetRedDotVisible(this.fGt.IsReceive),
      this.H3e?.RefreshByData(this.fGt.RewardList),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ShipTower", 69, "ShipTowerRewardItem", [
          "Refresh",
          this.fGt,
        ]);
  }
}
exports.ShipTowerRewardItem = ShipTowerRewardItem;
//# sourceMappingURL=ShipTowerRewardItem.js.map
