"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerStageItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ShipTowerDefine_1 = require("../ShipTowerDefine");
class ShipTowerStageItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.ItemData = void 0);
  }
  async Init(i, e) {
    (this.ItemData = e), await this.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UITexture],
    ];
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  UpdateData() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("ShipTower", 69, "UpdateData", ["", this.ItemData]);
    var i = this.ItemData.IsUnLocked(),
      e = this.ItemData.IsPassed(),
      t = this.ItemData.IsCurrent(),
      i =
        (this.GetItem(1).SetUIActive(i),
        this.GetItem(0).SetUIActive(!i),
        this.GetItem(2).SetUIActive(e),
        this.GetText(3).SetText(this.ItemData.OrderIndex.toString()),
        this.GetText(5).ShowTextNew(this.ItemData.TitleKey),
        this.GetSprite(6).SetUIActive(t),
        this.ItemData.GetStageGradeResIdByScore(this.ItemData.CurrentScore)),
      e = void 0 !== i,
      t = this.GetTexture(7),
      i =
        (t?.SetUIActive(e),
        e &&
          ((e =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i)),
          this.SetTextureByPath(e, t)),
        0 < this.ItemData.CurrentScore),
      e = this.GetText(4);
    e.SetUIActive(i),
      i &&
        ((t = ShipTowerDefine_1.shipTowerTextKey.ScorePoint),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          e,
          t,
          this.ItemData.CurrentScore.toString(),
        ));
  }
}
exports.ShipTowerStageItem = ShipTowerStageItem;
//# sourceMappingURL=ShipTowerStageItem.js.map
