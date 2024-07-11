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
    ];
  }
  Update(e) {
    var a = this.GetText(0),
      a =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(a, e.Conf.Name), this.GetText(2)),
      r = this.GetText(3),
      i = this.GetTexture(1);
    e.IsLock
      ? (this.SetTextureByPath(e.Conf.LockBigIcon, i),
        a.SetUIActive(!1),
        r.SetUIActive(!1))
      : (this.SetTextureByPath(e.Conf.BigIcon, i),
        (e = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty()),
        (i =
          ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(
            e,
          )),
        a.SetText(i),
        r.SetText(
          ModelManager_1.ModelManager.TowerModel.GetDifficultyMaxStars(e) +
            "/" +
            ModelManager_1.ModelManager.TowerModel.GetDifficultyAllStars(e),
        ));
  }
}
exports.NewSoundTowerItem = NewSoundTowerItem;
//# sourceMappingURL=NewSoundTowerItem.js.map
