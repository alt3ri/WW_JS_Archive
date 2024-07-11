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
    super(...arguments), (this.JOe = new Map()), (this.pCa = void 0);
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
    var t = this.JOe.get(e.q6n);
    (t.IsUnlock = e.G6n),
      (t.Level = e.P6n),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MoonChasingRefreshBuildingRedDot,
      );
  }
  ConditionUnlockBuildingData(e) {
    this.SetBuildingData(e);
  }
  LevelUpBuildingData(e, t, i) {
    this.SetBuildingData(e), this.InitPopularityData(e.q6n, t, i, !0);
  }
  GetBuildingDataById(e) {
    return this.JOe.get(e);
  }
  UnlockBuildingData(e, t, i) {
    var n = this.JOe.get(e);
    (n.IsUnlock = !0),
      (n.Level = 1),
      this.InitPopularityData(e, t, i, !1),
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
  InitPopularityData(e, t, i, n) {
    var a =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPopularityConfigByValue(
          i,
        ),
      e = this.JOe.get(e),
      n = n ? "Moonfiesta_Title4" : "Moonfiesta_Title3",
      e = new MoonChasingPopularityUpData_1.MoonChasingPopularityUpData(
        e.GetAssociateRoleId(),
        t,
        i,
        a.NpcDialog,
        n,
      );
    this.SetPopularityUpData(e);
  }
  SetPopularityUpData(e) {
    this.pCa = e;
  }
  GetPopularityUpData() {
    return this.pCa;
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
