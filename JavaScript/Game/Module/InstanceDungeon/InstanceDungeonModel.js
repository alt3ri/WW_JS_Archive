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
      (this.CurrentInstanceIsFinish = !1);
  }
  OnClear() {
    return !(this.B1i = void 0);
  }
  OnLeaveLevel() {
    return (
      this.B1i?.SetTrack(!1),
      (this.InstanceFinishSuccess = 0),
      !(this.InstanceRewardHaveTake = !1)
    );
  }
  GetInstanceId() {
    return this.NUe;
  }
  SetInstanceId(t) {
    this.NUe = t;
  }
  SetMatchTeamInfo(t) {
    this.R1i = t;
  }
  GetMatchTeamInfo() {
    return this.R1i;
  }
  SetMatchTeamHost(t) {
    this.R1i.DVn = t;
  }
  SetMatchTeamState(t) {
    this.R1i.y9n = t;
  }
  GetMatchTeamName(t) {
    for (const e of this.R1i.vRs) if (e.q5n === t) return e.HMs;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 5, "获取匹配副本队伍队员信息失败", [
        "队员Id",
        t,
      ]);
  }
  GetMatchTeamRoleCfgId(t) {
    var e = [];
    for (const r of this.R1i.vRs)
      if (r.q5n === t) for (const a of r.V6n) e.push(a.O6n);
    return e;
  }
  IsMatchTeamHost() {
    return (
      ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === this.R1i?.DVn
    );
  }
  IsTeamNotFull() {
    return this.G1i() < MATCHINGTEAMSIZE;
  }
  GetNeedMatchSize() {
    return MATCHINGTEAMSIZE - this.G1i();
  }
  G1i() {
    var t = this.R1i.vRs;
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return t.length;
    var e = ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer();
    let r = t.length + e.length;
    for (const a of e) for (const n of t) a === n.q5n && r--;
    return r;
  }
  IsAllPlayerInMatchTeam() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
    var t = [];
    for (const r of this.R1i.vRs) t.push(r.q5n);
    let e = !0;
    for (const a of ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer())
      t.includes(a) || (e = !1);
    return e;
  }
  InitMatchingTeamConfirmReadyState(t) {
    for (const e of t) {
      this.U1i.set(e.q5n, e.gbs), this.P1i.set(e.q5n, e.p9n);
      for (const r of this.A1i)
        r.GetPlayerId() === e.q5n && r.SetIsReady(e.p9n);
    }
  }
  SetMatchingPlayerConfirmState(t, e) {
    this.U1i.set(t, e);
  }
  GetMatchingPlayerConfirmStateByPlayerId(t) {
    return this.U1i.get(t);
  }
  GetMatchingTeamReady() {
    return this.R1i.y9n === Protocol_1.Aki.Protocol.D6s.Proto_ReadyConfirm;
  }
  GetPlayerUiState(t) {
    for (const e of this.R1i.vRs) if (e.q5n === t) return e.T9n;
    return Protocol_1.Aki.Protocol.P6s.Proto_Wait;
  }
  SetPlayerUiState(t, e) {
    for (const r of this.R1i.vRs) r.q5n === t && (r.T9n = e);
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
  JYs(t, e) {
    t.SetLevel(e.Cbs), t.SetConfigId(e.O6n);
  }
  SetPrewarFormationDataList() {
    this.ClearPrewarData();
    var t = this.GetMatchTeamInfo();
    if (t) {
      for (const r of t.vRs)
        for (const a of r.V6n) {
          var e = new PrewarFormationData_1.PrewarFormationData();
          e.SetPlayerId(r.q5n),
            e.SetIsReady(this.GetPrewarPlayerReadyState(r.q5n)),
            e.SetLife(1),
            e.SetMaxLife(1),
            this.JYs(e, a),
            this.A1i.push(e);
        }
      this.N1i();
    }
  }
  AddPrewarFormationDataByPlayerInfo(t, e = !0) {
    e && this.R1i.vRs.push(t);
    for (const a of t.V6n) {
      var r = new PrewarFormationData_1.PrewarFormationData();
      r.SetPlayerId(t.q5n),
        r.SetIsReady(this.GetPrewarPlayerReadyState(t.q5n)),
        r.SetLife(1),
        r.SetMaxLife(1),
        this.JYs(r, a),
        this.A1i.push(r);
    }
    this.N1i();
  }
  N1i() {
    var t = this.GetMatchTeamInfo().DVn;
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
    for (const n of this.R1i.vRs) {
      var r, a;
      n.q5n === t &&
        ((r = n.V6n.length),
        (a = e.length),
        (n.V6n = e),
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
    for (let t = this.R1i.vRs.length - 1; 0 <= t; --t) {
      var a = this.R1i.vRs[t];
      a && a.q5n === e && ((r = !0), this.R1i.vRs.splice(t, 1));
    }
    return this.N1i(), r;
  }
  O1i(e) {
    var r = this.A1i.length;
    let a = 0;
    for (let t = 0; t < r; t++) {
      var n,
        o = this.A1i[t];
      e.q5n === o.GetPlayerId() && ((n = e.V6n[a++]), this.JYs(o, n));
    }
  }
  F1i(t) {
    var r = t.q5n,
      a = t.V6n;
    for (let e = this.A1i.length - 1; 0 <= e; --e) {
      var n = this.A1i[e];
      if (n.GetPlayerId() === r) {
        let t = !1;
        for (const o of a)
          if (o.O6n === n.GetConfigId()) {
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
      Log_1.Log.Debug("InstanceDungeon", 28, "尝试清除副本行为树"),
      this.B1i
        ? ((t = this.B1i), (this.B1i = void 0), t.Destroy())
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("InstanceDungeon", 5, "销毁副本树时，副本树不存在");
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
}
exports.InstanceDungeonModel = InstanceDungeonModel;
//# sourceMappingURL=InstanceDungeonModel.js.map
