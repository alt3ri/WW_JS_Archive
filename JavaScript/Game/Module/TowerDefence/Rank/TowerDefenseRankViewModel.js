"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseRankViewModel = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  TowerDefenceController_1 = require("../TowerDefenceController");
class TowerDefenseRankViewModel {
  constructor() {
    (this.InstanceId = 0),
      (this.Yzt = void 0),
      (this.a8e = void 0),
      (this.ToggleAnonymousClick = (e) => {
        const r = 1 === e;
        TowerDefenceController_1.TowerDefenseController.RequestRankShowName(
          !r,
          () => {
            ModelManager_1.ModelManager.TowerDefenseModel.RankData.SetIsOpenAnonymousName(
              r,
            ),
              ModelManager_1.ModelManager.TowerDefenseModel.RankData.RefreshSelfRankItemDataName(
                this.InstanceId,
              ),
              this.Yzt.RefreshContentShowName();
          },
        );
      });
  }
  RegisterView(e) {
    this.Yzt = e;
  }
  async RequestRankData() {
    var e =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(
        this.InstanceId,
      );
    await TowerDefenceController_1.TowerDefenseController.RequestRankList(e.Id),
      ModelManager_1.ModelManager.TowerDefenseModel.RankData.RefreshAllPassDataRank(
        this.InstanceId,
      );
  }
  TabItemToggle(e) {
    var r = this.a8e;
    (this.a8e = e),
      void 0 !== r && this.Yzt.ResetLastTabItemSelected(r),
      this.Yzt.RefreshContent(this.a8e);
  }
  TabItemCanExecuteChange(e) {
    return this.a8e !== e;
  }
}
exports.TowerDefenseRankViewModel = TowerDefenseRankViewModel;
//# sourceMappingURL=TowerDefenseRankViewModel.js.map
