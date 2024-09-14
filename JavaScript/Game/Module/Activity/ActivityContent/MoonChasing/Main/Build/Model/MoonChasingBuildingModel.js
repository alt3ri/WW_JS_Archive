"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingBuildingModel = void 0);
const CommonParamById_1 = require("../../../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  MoonChasingPopularityUpData_1 = require("../../Business/Model/MoonChasingPopularityUpData"),
  BuildingData_1 = require("./BuildingData");
class MoonChasingBuildingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.JOe = new Map()), (this.ofa = void 0);
  }
  OnInit() {
    var e = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingAll();
    if (e)
      for (const i of e) {
        var t = new BuildingData_1.BuildingData(i.Id);
        this.JOe.set(i.Id, t);
      }
    return !0;
  }
  SetAllBuildingData(e) {
    for (const t of e) this.SetBuildingData(t);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.TrackMoonHandbookUpdate,
    );
  }
  SetBuildingData(e) {
    var t = this.JOe.get(e.W6n);
    (t.IsUnlock = e.K6n),
      (t.Level = e.F6n),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MoonChasingRefreshBuildingRedDot,
      );
  }
  ConditionUnlockBuildingData(e) {
    this.SetBuildingData(e);
  }
  LevelUpBuildingData(e, t, i) {
    this.SetBuildingData(e), this.InitPopularityData(t, i, !0);
  }
  GetBuildingDataById(e) {
    return this.JOe.get(e);
  }
  UnlockBuildingData(e, t, i) {
    e = this.JOe.get(e);
    (e.IsUnlock = !0),
      (e.Level = 1),
      this.InitPopularityData(t, i, !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TrackMoonHandbookUpdate,
      );
  }
  GetBuildingDataSize() {
    return this.JOe.size;
  }
  GetAllBuildingData() {
    return Array.from(this.JOe.values());
  }
  GetBuiltBuildingCount() {
    let e = 0;
    for (var [, t] of this.JOe) t.IsBuild && e++;
    return e;
  }
  InitPopularityData(e, t, i) {
    var n =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPopularityConfigByValue(
          t,
        ),
      a =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPlayerRoleId(),
      o = 1 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender(),
      i = i ? "Moonfiesta_Title4" : "Moonfiesta_Title3",
      a = new MoonChasingPopularityUpData_1.MoonChasingPopularityUpData(
        a,
        e,
        t,
        o ? n.NpcDialog : n.NpcDialogGirl,
        i,
      );
    this.SetPopularityUpData(a);
  }
  SetPopularityUpData(e) {
    this.ofa = e;
  }
  GetPopularityUpData() {
    return this.ofa;
  }
  CheckAllBuildingRedDotState() {
    for (const e of this.JOe.values())
      if (this.CheckBuildingRedDotState(e)) return !0;
    return !1;
  }
  GetFirstUnLockBuildingData() {
    for (const e of this.JOe.values())
      if (e.IsUnlock && 0 === e.Level && e.IsCanLevelUp) return e;
  }
  GetFirstCanLevelUpBuildingId() {
    for (const e of this.JOe.values())
      if (e.IsAvailableLevelUp && this.CheckBuildingRedDotState(e)) return e.Id;
  }
  CheckBuildingRedDotState(e) {
    var t = ModelManager_1.ModelManager.MoonChasingModel.GetCoinValue();
    return !!e.IsUnlock && !e.IsMax && t >= e.GetConsumeCount();
  }
  GetBuildingConfigListBySort() {
    var e = [...ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingAll()];
    return e.sort((e, t) => (e.Sort < t.Sort ? -1 : 1)), e;
  }
  CheckPlotInfoValid(t) {
    var e, i, n;
    return (
      void 0 !==
        ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingAll().find(
          (e) =>
            e.FlowListName === t.FlowListName &&
            e.FlowId === t.FlowId &&
            e.StateId === t.StateId,
        ) ||
      ((e = CommonParamById_1.configCommonParamById.GetStringConfig(
        "MoonChasingBuildLastFlowName",
      )),
      (i = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MoonChasingBuildLastFlowIdF",
      )),
      (n = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MoonChasingBuildLastFlowIdC",
      )),
      e === t.FlowListName && i === t.FlowId && n === t.StateId)
    );
  }
  GetBuildingIdByRoleId(t) {
    var e = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingAll().find(
      (e) => e.AssociateRole === t,
    );
    return void 0 === e ? -1 : e.Id;
  }
}
exports.MoonChasingBuildingModel = MoonChasingBuildingModel;
//# sourceMappingURL=MoonChasingBuildingModel.js.map
