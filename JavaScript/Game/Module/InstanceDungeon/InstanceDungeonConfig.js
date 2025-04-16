"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
  InstanceDungeonTitleById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonTitleById"),
  InstanceEnterControlById_1 = require("../../../Core/Define/ConfigQuery/InstanceEnterControlById"),
  InstanceGameplayModeById_1 = require("../../../Core/Define/ConfigQuery/InstanceGameplayModeById"),
  InstanceTrialRoleConfigById_1 = require("../../../Core/Define/ConfigQuery/InstanceTrialRoleConfigById"),
  TowerDefenceInstanceById_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceById"),
  TowerDefenceInstanceByInstanceId_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceByInstanceId"),
  TowerDefencePhantomById_1 = require("../../../Core/Define/ConfigQuery/TowerDefencePhantomById"),
  TowerDefenseConfigById_1 = require("../../../Core/Define/ConfigQuery/TowerDefenseConfigById"),
  TowerDefenseSettleById_1 = require("../../../Core/Define/ConfigQuery/TowerDefenseSettleById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager");
class InstanceDungeonConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.thi = new Map()),
      (this._ec = new Map()),
      (this.cec = () => {
        return ModelManager_1.ModelManager.TowerModel.CheckInTower()
          ? !this.uec()
          : !ModelManager_1.ModelManager.ShipTowerModel?.CheckInBattleShipTower() ||
              !UiManager_1.UiManager.IsViewOpen("ShipTowerDescView");
      }),
      (this.mec = () => this.cec()),
      (this.uec = () =>
        !!UiManager_1.UiManager.IsViewOpen("TeamRoleSelectView") ||
        !!UiManager_1.UiManager.IsViewOpen("MultiTeamRoleSelectView"));
  }
  OnInit() {
    return (
      this._ec.set("RoleRootView", this.cec),
      this._ec.set("WeaponRootView", this.mec),
      !0
    );
  }
  ihi(e) {
    let n = this.thi.get(e);
    return (
      n ||
        ((n = new Array()),
        (n = Array.from(this.GetConfig(e).RecommendLevel)).sort(
          (e, n) => e[0] - n[0],
        ),
        this.thi.set(e, n)),
      n
    );
  }
  GetConfig(e) {
    var n = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e);
    if (n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 16, "获取副本配置错误", ["id", e]);
  }
  GetCountConfig(e) {
    var n =
      InstanceEnterControlById_1.configInstanceEnterControlById.GetConfig(e);
    if (n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 16, "获取副本配置错误", ["id", e]);
  }
  GetTitleConfig(e) {
    var n =
      InstanceDungeonTitleById_1.configInstanceDungeonTitleById.GetConfig(e);
    if (n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 16, "获取副本标题配置错误", ["id", e]);
  }
  GetTrialRoleConfig(e) {
    var n =
      InstanceTrialRoleConfigById_1.configInstanceTrialRoleConfigById.GetConfig(
        e,
      );
    if (n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 48, "获取副本试用角色配置错误", [
        "id",
        e,
      ]);
  }
  GetGameplayModeConfig(e) {
    var n =
      InstanceGameplayModeById_1.configInstanceGameplayModeById.GetConfig(e);
    if (n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 48, "获取副本玩法模式配置错误", [
        "id",
        e,
      ]);
  }
  GetLimitChallengeTimes(e) {
    return this.GetCountConfig(e)?.EnterCount ?? 0;
  }
  CheckViewShield(e, n) {
    e = this.GetConfig(e);
    return (
      !!e?.LimitViewName?.length &&
      !!e.LimitViewName.some((e) => e === n) &&
      (!this._ec.has(n) || this._ec.get(n)())
    );
  }
  GetUnlockCondition(e) {
    return this.GetConfig(e)?.EnterCondition ?? void 0;
  }
  GetUnlockConditionGroupHintText(e) {
    return this.GetConfig(e).EnterConditionText ?? void 0;
  }
  GetRecommendLevel(e, n) {
    e = this.ihi(e);
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("InstanceDungeon", 16, "推荐等级区间配置错误"),
        0
      );
    let r = 0;
    for (const o of e) (!r || n >= o[0]) && (r = o[1]);
    return r;
  }
  GetInstanceRewardId(e) {
    return this.GetConfig(e)?.RewardId;
  }
  GetInstanceFirstRewardId(e) {
    return this.GetConfig(e)?.FirstRewardId;
  }
  IsMiniMapShow(e) {
    return 0 !== (this.GetConfig(e)?.MiniMapId ?? 0);
  }
  GetGuide(e) {
    e = this.GetConfig(e);
    return [e?.GuideType ?? 0, e?.GuideValue ?? 0];
  }
  GetTowerDefenseInstanceByInstance(e) {
    return TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
      e,
    );
  }
  GetTowerDefenseConfigByActivityId(e) {
    return TowerDefenseConfigById_1.configTowerDefenseConfigById.GetConfig(e);
  }
  GetTowerDefenseSettleById(e) {
    return TowerDefenseSettleById_1.configTowerDefenseSettleById.GetConfig(e);
  }
  GetTowerDefenseConfigById(e) {
    return TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(
      e,
    );
  }
  GetTowerDefenseRankListSize() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "TowerDefenceRankListSize",
    );
  }
  GetTowerDefensePhantomById(e) {
    return TowerDefencePhantomById_1.configTowerDefencePhantomById.GetConfig(e);
  }
}
exports.InstanceDungeonConfig = InstanceDungeonConfig;
//# sourceMappingURL=InstanceDungeonConfig.js.map
