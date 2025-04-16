"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PrewarFormationData_1 = require("./Define/PrewarFormationData"),
  InstanceDungeonInfo_1 = require("./InstanceDungeonInfo"),
  MATCHINGTEAMSIZE = 3;
class InstanceDungeonModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.NUe = 0),
      (this.$Dc = !1),
      (this.R1i = void 0),
      (this.U1i = new Map()),
      (this.A1i = new Array()),
      (this.P1i = new Map()),
      (this.x1i = void 0),
      (this.w1i = new Map()),
      (this.InstanceFinishSuccess = 0),
      (this.InstanceRewardHaveTake = !1),
      (this.B1i = void 0),
      (this.b1i = void 0),
      (this.q1i = void 0),
      (this.CurrentInstanceIsFinish = !1),
      (this.HidePowerLackConfirmBox = !1),
      (this.InstanceEnterContentText = new Protocol_1.Aki.Protocol.$ah()),
      (this.TrialRoleDungeonWhiteList = []),
      (this.$y1 = new Set());
  }
  OnLeaveLevel() {
    return (
      this.B1i?.SetTrack(!1),
      (this.InstanceFinishSuccess = 0),
      (this.InstanceRewardHaveTake = !1),
      this.ClearInstanceDungeonInfo(),
      !0
    );
  }
  GetInstanceId() {
    return this.NUe;
  }
  SetInstanceId(t) {
    this.NUe = t;
  }
  get InstanceContinue() {
    return this.$Dc;
  }
  set InstanceContinue(t) {
    this.$Dc = t;
  }
  SetMatchTeamInfo(t) {
    this.R1i = t;
  }
  GetMatchTeamInfo() {
    return this.R1i;
  }
  SetMatchTeamHost(t) {
    this.R1i.qVn = t;
  }
  SetMatchTeamState(t) {
    this.R1i.P9n = t;
  }
  GetMatchTeamName(t) {
    for (const e of this.R1i.TRs) if (e.W5n === t) return e.JMs;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 5, "获取匹配副本队伍队员信息失败", [
        "队员Id",
        t,
      ]);
  }
  GetMatchTeamOnlineId(t) {
    for (const e of this.R1i.TRs) if (e.W5n === t) return e.Qxa;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 5, "获取匹配副本队伍队员信息失败", [
        "队员Id",
        t,
      ]);
  }
  GetMatchTeamRoleCfgId(t) {
    var e = [];
    for (const r of this.R1i.TRs)
      if (r.W5n === t) for (const a of r.J6n) e.push(a.Q6n);
    return e;
  }
  IsMatchTeamHost() {
    return (
      ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === this.R1i?.qVn
    );
  }
  IsTeamNotFull() {
    return this.G1i() < MATCHINGTEAMSIZE;
  }
  GetNeedMatchSize() {
    return MATCHINGTEAMSIZE - this.G1i();
  }
  G1i() {
    var t = this.R1i.TRs;
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return t.length;
    var e = ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer();
    let r = t.length + e.length;
    for (const a of e) for (const n of t) a === n.W5n && r--;
    return r;
  }
  IsAllPlayerInMatchTeam() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
    var t = [];
    for (const r of this.R1i.TRs) t.push(r.W5n);
    let e = !0;
    for (const a of ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer())
      t.includes(a) || (e = !1);
    return e;
  }
  InitMatchingTeamConfirmReadyState(t) {
    for (const e of t) {
      this.U1i.set(e.W5n, e.ybs), this.P1i.set(e.W5n, e.D9n);
      for (const r of this.A1i)
        r.GetPlayerId() === e.W5n && r.SetIsReady(e.D9n);
    }
  }
  SetMatchingPlayerConfirmState(t, e) {
    this.U1i.set(t, e);
  }
  GetMatchingPlayerConfirmStateByPlayerId(t) {
    return this.U1i.get(t);
  }
  GetMatchingTeamReady() {
    return this.R1i.P9n === Protocol_1.Aki.Protocol.B5s.Proto_ReadyConfirm;
  }
  GetPlayerUiState(t) {
    for (const e of this.R1i.TRs) if (e.W5n === t) return e.w9n;
    return Protocol_1.Aki.Protocol.G5s.Proto_Wait;
  }
  SetPlayerUiState(t, e) {
    for (const r of this.R1i.TRs) r.W5n === t && (r.w9n = e);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnRefreshPlayerUiState,
      t,
    );
  }
  SetPrewarPlayerReadyState(t, e) {
    this.P1i.set(t, e);
    for (const r of this.A1i) r.GetPlayerId() === t && r.SetIsReady(e);
  }
  RemovePrewarPlayerReadyState(t) {
    this.P1i.delete(t);
  }
  ClearPrewarPlayerReadyState() {
    this.P1i.clear();
  }
  RemoveMatchingTeamConfirmState(t) {
    this.U1i.delete(t);
  }
  ClearMatchingTeamConfirmState() {
    this.U1i.clear();
  }
  GetPrewarPlayerReadyState(t) {
    t = this.P1i.get(t);
    return t || !1;
  }
  Kzs(t, e) {
    t.SetLevel(e.Ebs), t.SetConfigId(e.Q6n), t.SetSkinId(e.eI_);
  }
  SetPrewarFormationDataList() {
    this.ClearPrewarData();
    var t = this.GetMatchTeamInfo();
    if (t) {
      for (const r of t.TRs)
        for (const a of r.J6n) {
          var e = new PrewarFormationData_1.PrewarFormationData();
          e.SetPlayerId(r.W5n),
            e.SetIsReady(this.GetPrewarPlayerReadyState(r.W5n)),
            e.SetLife(1),
            e.SetMaxLife(1),
            this.Kzs(e, a),
            this.A1i.push(e);
        }
      this.N1i();
    }
  }
  AddPrewarFormationDataByPlayerInfo(t, e = !0) {
    e && this.R1i.TRs.push(t);
    for (const a of t.J6n) {
      var r = new PrewarFormationData_1.PrewarFormationData();
      r.SetPlayerId(t.W5n),
        r.SetIsReady(this.GetPrewarPlayerReadyState(t.W5n)),
        r.SetLife(1),
        r.SetMaxLife(1),
        this.Kzs(r, a),
        this.A1i.push(r);
    }
    this.N1i();
  }
  N1i() {
    var t = this.GetMatchTeamInfo().qVn;
    let e = 1,
      r = 1;
    for (const a of this.A1i)
      a.GetPlayerId() === t && (a.SetIndex(e++), a.SetOnlineNumber(r));
    r++;
    for (const n of this.A1i)
      n.GetPlayerId() !== t && (n.SetIndex(e++), n.SetOnlineNumber(r++));
    this.A1i.sort((t, e) => t.GetIndex() - e.GetIndex());
  }
  SetMatchTeamInfoPlayerRole(t, e) {
    for (const n of this.R1i.TRs) {
      var r, a;
      n.W5n === t &&
        ((r = n.J6n.length),
        (a = e.length),
        (n.J6n = e),
        r === a && this.O1i(n),
        r < a && (this.k1i(t), this.AddPrewarFormationDataByPlayerInfo(n, !1)),
        a < r) &&
        this.F1i(n);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PrewarFormationChanged,
    );
  }
  GetPrewarFormationDataList() {
    return this.A1i;
  }
  RemovePrewarFormationDataByPlayer(e) {
    let r = !1;
    for (let t = this.A1i.length - 1; 0 <= t; --t)
      this.A1i[t].GetPlayerId() === e &&
        ((r = !0),
        this.A1i.splice(t, 1),
        this.RemovePrewarPlayerReadyState(e),
        this.RemoveMatchingTeamConfirmState(e));
    for (let t = this.R1i.TRs.length - 1; 0 <= t; --t) {
      var a = this.R1i.TRs[t];
      a && a.W5n === e && ((r = !0), this.R1i.TRs.splice(t, 1));
    }
    return this.N1i(), r;
  }
  O1i(e) {
    var r = this.A1i.length;
    let a = 0;
    for (let t = 0; t < r; t++) {
      var n,
        i = this.A1i[t];
      e.W5n === i.GetPlayerId() && ((n = e.J6n[a++]), this.Kzs(i, n));
    }
  }
  F1i(t) {
    var r = t.W5n,
      a = t.J6n;
    for (let e = this.A1i.length - 1; 0 <= e; --e) {
      var n = this.A1i[e];
      if (n.GetPlayerId() === r) {
        let t = !1;
        for (const i of a)
          if (i.Q6n === n.GetConfigId()) {
            t = !0;
            break;
          }
        t || this.A1i.splice(e, 1);
      }
    }
    this.N1i();
  }
  k1i(e) {
    for (let t = this.A1i.length - 1; 0 <= t; --t)
      this.A1i[t].GetPlayerId() === e && this.A1i.splice(t, 1);
  }
  IsInPrewarFormation(t) {
    for (const e of this.A1i) if (e.GetPlayerId() === t) return !0;
    return !1;
  }
  ClearPrewarData() {
    this.A1i.length = 0;
  }
  MatchingPlayerCount() {
    return this.U1i.size;
  }
  get FormationAverageRoleLevel() {
    let t = 0;
    var e = ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
    if (!e) return 0;
    let r = 0;
    for (const a of e) a.GetRoleData && ((t += a.GetRoleData?.Level ?? 0), r++);
    return r ? (t /= r) : 0;
  }
  CheckPrewarFormationAverageLowLevel(t) {
    var e =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        t,
      ).FightFormationId;
    if (e) {
      e =
        ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
          e,
        );
      if (0 < e.AutoRole.length && 0 < e.TrialRole.length) return !1;
    }
    var e = this.FormationAverageRoleLevel,
      [r, a] =
        ModelManager_1.ModelManager.ActivityModel.CheckActivityLevelBelongToType(
          t,
        );
    return r
      ? e <
          ModelManager_1.ModelManager.ActivityModel.GetActivityLevelRecommendLevel(
            t,
            ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
            a,
          )
      : e <
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
            t,
            ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
          );
  }
  GetInstanceBeInviteDataList() {
    return this.x1i;
  }
  AddInstanceBeInviteData(t) {
    t &&
      (this.x1i
        ? this.RemoveInstanceBeInviteData(t.GetPlayerId())
        : (this.x1i = new Array()),
      this.x1i.push(t));
  }
  RemoveInstanceBeInviteData(e) {
    for (let t = 0; t < this.x1i.length; t++)
      if (this.x1i[t].GetPlayerId() === e) return this.x1i.splice(t, 1), !0;
    return !1;
  }
  GetInvitePlayerCd(t) {
    t = this.w1i.get(t);
    return t || 0;
  }
  SetInvitePlayerCd(t, e) {
    this.w1i.set(t, e);
  }
  CreateInstanceInfo(t) {
    return (
      (this.B1i = new InstanceDungeonInfo_1.InstanceDungeonInfo(t)),
      this.B1i.InitConfig(),
      this.B1i
    );
  }
  ClearInstanceDungeonInfo() {
    var t;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 27, "尝试清除副本行为树"),
      this.B1i && ((t = this.B1i), (this.B1i = void 0), t.Destroy());
  }
  GetInstanceDungeonInfo() {
    return this.B1i;
  }
  ResetData() {
    this.ClearPrewarData(),
      this.ClearPrewarPlayerReadyState(),
      this.ClearMatchingTeamConfirmState(),
      (this.R1i = void 0);
  }
  get LastEnterRoleList() {
    return this.b1i;
  }
  set LastEnterRoleList(t) {
    this.b1i = t;
  }
  SetInstanceDungeonName(t) {
    this.q1i = t;
  }
  GetInstanceDungeonName() {
    return this.q1i;
  }
  ConstructCurrentDungeonAreaName() {
    (this.q1i = void 0),
      ModelManager_1.ModelManager.TowerModel.CheckInTower() &&
        this.SetInstanceDungeonName(
          ModelManager_1.ModelManager.TowerModel.GetCurrentFloorName(),
        );
  }
  ClearInstanceEnterContentText() {
    (this.InstanceEnterContentText.Vah = void 0),
      (this.InstanceEnterContentText.Hah = void 0),
      (this.InstanceEnterContentText.jah = void 0),
      (this.InstanceEnterContentText.RLl = void 0),
      (this.InstanceEnterContentText.Wah = void 0),
      (this.InstanceEnterContentText.Qah = void 0),
      (this.InstanceEnterContentText.y7l = void 0),
      (this.InstanceEnterContentText.Yn_ = void 0),
      (this.InstanceEnterContentText.Wsc = void 0),
      (this.InstanceEnterContentText.iY_ = void 0),
      (this.InstanceEnterContentText.Qsc = void 0),
      (this.InstanceEnterContentText.JDc = void 0);
  }
  ParseExitDungeonConfirmData(t) {
    t = t.ExitDungeonConfirmId;
    return {
      ParseRuleType: 0 < t.length ? t[0] : 0,
      UnfinishedBoxId: 1 < t.length ? t[1] : void 0,
      FinishBoxId: 2 < t.length ? t[2] : void 0,
      UnfinishedTelBoxId: 3 < t.length ? t[3] : void 0,
      FinishTelBoxId: 4 < t.length ? t[4] : void 0,
    };
  }
  GetCurrentDungeonExitConfirmData() {
    var t = this.ParseExitDungeonConfirmData(
        ModelManager_1.ModelManager.GameModeModel.InstanceDungeon,
      ),
      e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id,
      r = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.InstSubType;
    return (
      0 !== t.ParseRuleType ||
        (1 !== r && 2 !== r && 16 !== r) ||
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonSupportArchive(
          e,
        )
          ? (t.UnfinishedBoxId || (t.UnfinishedBoxId = 284),
            t.UnfinishedTelBoxId || (t.UnfinishedTelBoxId = 284))
          : (t.UnfinishedBoxId || (t.UnfinishedBoxId = 285),
            t.UnfinishedTelBoxId || (t.UnfinishedTelBoxId = 285)),
        t.FinishBoxId || (t.FinishBoxId = 290),
        t.FinishTelBoxId) ||
        (t.FinishTelBoxId = 290),
      t
    );
  }
  GetCurrentDungeonExitConfirmId() {
    var t = this.GetCurrentDungeonExitConfirmData();
    return ModelManager_1.ModelManager.InstanceDungeonModel
      .InstanceFinishSuccess
      ? t.FinishBoxId
      : t.UnfinishedBoxId;
  }
  GetCurrentDungeonTelExitConfirmId() {
    var t = this.GetCurrentDungeonExitConfirmData();
    return ModelManager_1.ModelManager.InstanceDungeonModel
      .InstanceFinishSuccess
      ? t.FinishTelBoxId
      : t.UnfinishedTelBoxId;
  }
  ClearInstanceIdsWithSaveData() {
    this.$y1.clear();
  }
  AddInstanceIdsWithSaveData(...t) {
    for (const e of t) this.$y1.add(e);
  }
  GetIfInstanceHasSaveData(t) {
    return this.$y1.has(t);
  }
}
exports.InstanceDungeonModel = InstanceDungeonModel;
//# sourceMappingURL=InstanceDungeonModel.js.map
