"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerReviewItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ShipTowerDefine_1 = require("../ShipTowerDefine");
class ShipTowerReviewItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.fGt = void 0), (this.ClickCallBack = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  Refresh(e) {
    (this.fGt = e), this.GetText(0)?.SetText(this.fGt.Title);
    var e = ShipTowerDefine_1.shipTowerTextKey.ScorePointNoColor,
      i = this.GetText(1),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(i, e, this.fGt.Score.toString()),
        void 0 !== this.fGt.Grade),
      e = this.GetTexture(2);
    e?.SetUIActive(i),
      i &&
        ((i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          this.fGt.Grade,
        )),
        this.SetTextureByPath(i, e)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ShipTower", 69, "ShipTowerReviewItem", [
          "Refresh",
          this.fGt,
        ]);
  }
}
exports.ShipTowerReviewItem = ShipTowerReviewItem;
//# sourceMappingURL=ShipTowerReviewItem.js.map
