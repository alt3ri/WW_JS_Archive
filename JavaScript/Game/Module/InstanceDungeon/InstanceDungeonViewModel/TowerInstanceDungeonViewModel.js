"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerInstanceDungeonViewModel = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  TowerDefenseRankTimeModel_1 = require("../../TowerDefence/Rank/TowerDefenseRankTimeModel"),
  TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  InstanceDungeonViewModelBase_1 = require("./InstanceDungeonViewModelBase");
class TowerInstanceDungeonViewModel extends InstanceDungeonViewModelBase_1.InstanceDungeonViewModelBase {
  constructor() {
    super(...arguments),
      (this.RankItemModel =
        new TowerDefenseRankTimeModel_1.TowerDefenseRankTimeModel());
  }
  GetInstanceByTitleMap() {
    var n,
      r,
      e =
        ModelManager_1.ModelManager.TowerDefenseModel.GetSortedByTitleEntranceInstanceIdList(),
      o = new Map();
    for ([n, r] of e) {
      let e = o.get(r);
      e || ((e = []), o.set(r, e)), e.push(n);
    }
    return o;
  }
  OnSortInstanceArray(e) {
    e.sort((e, n) => {
      (e =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(
          e,
        )),
        (n =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(
            n,
          ));
      return e && n ? e.Difficulty - n.Difficulty : 0;
    });
  }
  OnGetInstanceItemTextureBg(e) {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(
      e,
    ).IsDifficult
      ? "T_TogHoldDeathmatch"
      : "T_TogListNor";
  }
  OnGetUnlockConditionTextId(e) {
    var n =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(
          e,
        ),
      n =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseConfigById(
          n[2],
        );
    return ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.IsStageUnLocked(
      n.InstanceId,
    )
      ? new LguiUtil_1.TableTextArgNew("OnlineGymnasium_LevelRst")
      : (n =
            TowerDefenceController_1.TowerDefenseController.BuildInstanceCountDownTextParam(
              e,
            ))
        ? new LguiUtil_1.TableTextArgNew("OnlineGymnasium_LevelRst", n)
        : void 0;
  }
  OnIsFinishInstance(e) {
    return TowerDefenceController_1.TowerDefenseController.CheckInstancePassedByInstanceId(
      e,
    );
  }
  OnGetInstanceDetectItemIcon() {
    return "";
  }
  OnGetDefaultSelectData() {
    if (TowerDefenceController_1.TowerDefenseController.CheckInUiFlow()) {
      var e =
          TowerDefenceController_1.TowerDefenseController.GetSuitableInstanceId(),
        n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
      if (n) return { InstanceId: e, SeriesId: n.Title };
    }
  }
  OnCheckNeedOnTimer(e) {
    return (
      !!TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() &&
      !TowerDefenceController_1.TowerDefenseController.CheckIsInstanceUnlock(e)
    );
  }
  OnTimerRefreshFunction(e) {
    this.View.RefreshTowerDefenseInstance();
  }
  async OnRequestServerData() {
    var e =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(
        this.EntranceId,
      );
    await TowerDefenceController_1.TowerDefenseController.RequestSelfRankData(
      e.ActivityId,
    );
  }
  OnCheckInstanceHasRedDot(e) {
    return ModelManager_1.ModelManager.TowerDefenseModel.CheckTowerDefenseInstanceHasRedDot(
      e,
    );
  }
}
exports.TowerInstanceDungeonViewModel = TowerInstanceDungeonViewModel;
//# sourceMappingURL=TowerInstanceDungeonViewModel.js.map
