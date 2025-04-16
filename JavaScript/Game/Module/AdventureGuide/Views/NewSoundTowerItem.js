"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundTowerItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class NewSoundTowerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UIItem],
    ];
  }
  Update(e) {
    this.LV_(e),
      28 === e.DetectRecordData.Conf?.Secondary ? this.wV_(e) : this.RV_(e);
  }
  LV_(e) {
    var e = e.DetectRecordData,
      t = this.GetText(0),
      t =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Conf.Name),
        this.GetTexture(1)),
      a = e.IsLock ? e.Conf.LockBigIcon : e.Conf.BigIcon,
      a = (this.SetTextureShowUntilLoaded(a, t), this.GetText(2)),
      t = this.GetText(3);
    a.SetUIActive(!e.IsLock), t.SetUIActive(!e.IsLock);
  }
  RV_(e) {
    var t;
    e.DetectRecordData.IsLock ||
      ((e = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty()),
      (t =
        ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(
          e,
        )),
      this.AV_(t),
      (t = ModelManager_1.ModelManager.TowerModel.GetDifficultyMaxStars(e)),
      (e = ModelManager_1.ModelManager.TowerModel.GetDifficultyAllStars(e)),
      this.PV_(t + "/" + e),
      this.GetItem(5)?.SetUIActive(!0));
  }
  wV_(e) {
    e.DetectRecordData.IsLock ||
      (this.AV_(
        ModelManager_1.ModelManager.ShipTowerModel.GetCurrentStageSeasonName(),
      ),
      this.PV_(
        ModelManager_1.ModelManager.ShipTowerModel.GetRewardProgressText(!1),
      ),
      this.GetItem(5)?.SetUIActive(!1));
  }
  AV_(e) {
    this.GetText(2).SetText(e);
  }
  PV_(e) {
    this.GetText(3).SetText(e);
  }
}
exports.NewSoundTowerItem = NewSoundTowerItem;
//# sourceMappingURL=NewSoundTowerItem.js.map
