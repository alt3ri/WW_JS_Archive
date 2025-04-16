"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerModel = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  BabelTowerDifficultyByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerDifficultyByActivityId"),
  BabelTowerLevelById_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerLevelById"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BabelTowerDefine_1 = require("./BabelTowerDefine");
class BabelTowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.U1c = void 0),
      (this.ItemCountMax = 0),
      (this.DeTermSelectInfo = new Map()),
      (this.LevelChoseHandle = 0);
  }
  get CurrentChallengeInstData() {
    return this.U1c;
  }
  OnInit() {
    return (
      (this.ItemCountMax =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "BabelTowerItemCountMax",
        ) ?? 0),
      !0
    );
  }
  UpdateCurrentChallengeInstDataByNotify(e) {
    this.U1c || (this.U1c = new BabelTowerDefine_1.BabelTowerInstanceData());
    var r = e.NX_;
    (this.U1c.LevelId = e.gG_),
      (this.U1c.CurStarNum = e.Psc),
      (this.U1c.UseReviveCount = e.zX_),
      (this.U1c.RoleCd = r),
      (this.U1c.BuffSelection = e.Dks),
      (this.U1c.DeTermIdList = e.GX_),
      0 < r &&
        ModelManager_1.ModelManager.SceneTeamModel.UpdateChangeRoleCooldown(r),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnBabelActivityInstInfoUpdate,
      );
  }
  GetIfLevelTooLow(e, r) {
    let t = 0,
      o = 0;
    for (const l of r) {
      var a = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(l),
        a =
          (a && ((t += a.GetLevelData().GetLevel()), o++),
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(l));
      a && ((t += a.GetLevelData().GetLevel()), o++);
    }
    var n = t / o;
    if (n < this.GetRecommendLevel(e) && 0 != n) return !0;
    for (const s of r) {
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(s),
        i =
          (i && ((t += i.GetLevelData().GetLevel()), o++),
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(s));
      i && ((t += i.GetLevelData().GetLevel()), o++);
    }
    n = t / o;
    return n < this.GetRecommendLevel(e) && 0 != n;
  }
  GetRecommendLevel(e) {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
      e,
      ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
    );
  }
  CalculateDifficultyConfigByStarNum(e, r) {
    var t =
      BabelTowerDifficultyByActivityId_1.configBabelTowerDifficultyByActivityId.GetConfigList(
        e,
      );
    for (let e = t.length - 1; 0 <= e; e--) {
      var o = t[e];
      if (r >= o.StarNum) return o;
    }
  }
  CoverStarNumToQualityId(e) {
    return e + 2;
  }
  CheckInBattleBabelTower() {
    var e;
    return !(
      !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      ((e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
      !(e =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))) ||
      30 !== e.InstSubType
    );
  }
  CheckCanRevive() {
    var e,
      r = this.CurrentChallengeInstData;
    return (
      !!r &&
      ((e = r.LevelId),
      (e =
        BabelTowerLevelById_1.configBabelTowerLevelById.GetConfig(
          e,
        ).ReviveStar),
      r.CurStarNum >= e)
    );
  }
  GetCurStarNum() {
    return this.CurrentChallengeInstData?.CurStarNum ?? 0;
  }
}
exports.BabelTowerModel = BabelTowerModel;
//# sourceMappingURL=BabelTowerModel.js.map
