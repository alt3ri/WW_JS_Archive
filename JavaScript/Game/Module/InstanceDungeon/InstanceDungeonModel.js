"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const PrewarFormationData_1 = require("./Define/PrewarFormationData");
const InstanceDungeonInfo_1 = require("./InstanceDungeonInfo");
const MATCHINGTEAMSIZE = 3;
class InstanceDungeonModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.NUe = 0),
      (this.Rli = void 0),
      (this.Uli = new Map()),
      (this.Ali = new Array()),
      (this.Pli = new Map()),
      (this.xli = void 0),
      (this.wli = new Map()),
      (this.InstanceFinishSuccess = 0),
      (this.InstanceRewardHaveTake = !1),
      (this.Bli = void 0),
      (this.bli = void 0),
      (this.qli = void 0),
      (this.CurrentInstanceIsFinish = !1);
  }
  OnClear() {
    return !(this.Bli = void 0);
  }
  OnLeaveLevel() {
    return (
      this.Bli?.SetTrack(!1),
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
    this.Rli = t;
  }
  GetMatchTeamInfo() {
    return this.Rli;
  }
  SetMatchTeamHost(t) {
    this.Rli.Q4n = t;
  }
  SetMatchTeamState(t) {
    this.Rli.H5n = t;
  }
  GetMatchTeamName(t) {
    for (const e of this.Rli.ZEs) if (e.aFn === t) return e.Rgs;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 5, "获取匹配副本队伍队员信息失败", [
        "队员Id",
        t,
      ]);
  }
  IsMatchTeamHost() {
    return (
      ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === this.Rli?.Q4n
    );
  }
  IsTeamNotFull() {
    return this.Gli() < MATCHINGTEAMSIZE;
  }
  GetNeedMatchSize() {
    return MATCHINGTEAMSIZE - this.Gli();
  }
  Gli() {
    const t = this.Rli.ZEs;
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return t.length;
    const e = ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer();
    let r = t.length + e.length;
    for (const a of e) for (const n of t) a === n.aFn && r--;
    return r;
  }
  IsAllPlayerInMatchTeam() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
    const t = [];
    for (const r of this.Rli.ZEs) t.push(r.aFn);
    let e = !0;
    for (const a of ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer())
      t.includes(a) || (e = !1);
    return e;
  }
  InitMatchingTeamConfirmReadyState(t) {
    for (const e of t) {
      this.Uli.set(e.aFn, e.YAs), this.Pli.set(e.aFn, e.O5n);
      for (const r of this.Ali)
        r.GetPlayerId() === e.aFn && r.SetIsReady(e.O5n);
    }
  }
  SetMatchingPlayerConfirmState(t, e) {
    this.Uli.set(t, e);
  }
  GetMatchingPlayerConfirmStateByPlayerId(t) {
    return this.Uli.get(t);
  }
  GetMatchingTeamReady() {
    return this.Rli.H5n === Protocol_1.Aki.Protocol.kNs.Proto_ReadyConfirm;
  }
  GetPlayerUiState(t) {
    for (const e of this.Rli.ZEs) if (e.aFn === t) return e.K5n;
    return Protocol_1.Aki.Protocol.FNs.Proto_Wait;
  }
  SetPlayerUiState(t, e) {
    for (const r of this.Rli.ZEs) r.aFn === t && (r.K5n = e);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnRefreshPlayerUiState,
      t,
    );
  }
  SetPrewarPlayerReadyState(t, e) {
    this.Pli.set(t, e);
    for (const r of this.Ali) r.GetPlayerId() === t && r.SetIsReady(e);
  }
  RemovePrewarPlayerReadyState(t) {
    this.Pli.delete(t);
  }
  ClearPrewarPlayerReadyState() {
    this.Pli.clear();
  }
  RemoveMatchingTeamConfirmState(t) {
    this.Uli.delete(t);
  }
  ClearMatchingTeamConfirmState() {
    this.Uli.clear();
  }
  GetPrewarPlayerReadyState(t) {
    t = this.Pli.get(t);
    return t || !1;
  }
  SetPrewarFormationDataList() {
    this.ClearPrewarData();
    for (const e of this.GetMatchTeamInfo().ZEs)
      for (const r of e.j5n) {
        const t = new PrewarFormationData_1.PrewarFormationData();
        t.SetPlayerId(e.aFn),
          t.SetIsReady(this.GetPrewarPlayerReadyState(e.aFn)),
          t.SetLife(1),
          t.SetMaxLife(1),
          t.SetLevel(r.XAs),
          t.SetConfigId(r.l3n),
          this.Ali.push(t);
      }
    this.Nli();
  }
  AddPrewarFormationDataByPlayerInfo(t, e = !0) {
    e && this.Rli.ZEs.push(t);
    for (const a of t.j5n) {
      const r = new PrewarFormationData_1.PrewarFormationData();
      r.SetPlayerId(t.aFn),
        r.SetIsReady(this.GetPrewarPlayerReadyState(t.aFn)),
        r.SetLife(1),
        r.SetMaxLife(1),
        r.SetLevel(a.XAs),
        r.SetConfigId(a.l3n),
        this.Ali.push(r);
    }
    this.Nli();
  }
  Nli() {
    const t = this.GetMatchTeamInfo().Q4n;
    let e = 1;
    let r = 1;
    for (const a of this.Ali)
      a.GetPlayerId() === t && (a.SetIndex(e++), a.SetOnlineNumber(r));
    r++;
    for (const n of this.Ali)
      n.GetPlayerId() !== t && (n.SetIndex(e++), n.SetOnlineNumber(r++));
    this.Ali.sort((t, e) => t.GetIndex() - e.GetIndex());
  }
  SetMatchTeamInfoPlayerRole(t, e) {
    for (const n of this.Rli.ZEs) {
      var r, a;
      n.aFn === t &&
        ((r = n.j5n.length),
        (a = e.length),
        (n.j5n = e),
        r === a && this.Oli(n),
        r < a && (this.kli(t), this.AddPrewarFormationDataByPlayerInfo(n, !1)),
        a < r) &&
        this.Fli(n);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PrewarFormationChanged,
    );
  }
  GetPrewarFormationDataList() {
    return this.Ali;
  }
  RemovePrewarFormationDataByPlayer(e) {
    let r = !1;
    for (let t = this.Ali.length - 1; t >= 0; --t)
      this.Ali[t].GetPlayerId() === e &&
        ((r = !0),
        this.Ali.splice(t, 1),
        this.RemovePrewarPlayerReadyState(e),
        this.RemoveMatchingTeamConfirmState(e));
    for (let t = this.Rli.ZEs.length - 1; t >= 0; --t) {
      const a = this.Rli.ZEs[t];
      a && a.aFn === e && ((r = !0), this.Rli.ZEs.splice(t, 1));
    }
    return this.Nli(), r;
  }
  Oli(e) {
    const r = this.Ali.length;
    let a = 0;
    for (let t = 0; t < r; t++) {
      var n;
      const o = this.Ali[t];
      e.aFn === o.GetPlayerId() &&
        ((n = e.j5n[a++]), o.SetConfigId(n.l3n), o.SetLevel(n.XAs));
    }
  }
  Fli(t) {
    const r = t.aFn;
    const a = t.j5n;
    for (let e = this.Ali.length - 1; e >= 0; --e) {
      const n = this.Ali[e];
      if (n.GetPlayerId() === r) {
        let t = !1;
        for (const o of a)
          if (o.l3n === n.GetConfigId()) {
            t = !0;
            break;
          }
        t || this.Ali.splice(e, 1);
      }
    }
    this.Nli();
  }
  kli(e) {
    for (let t = this.Ali.length - 1; t >= 0; --t)
      this.Ali[t].GetPlayerId() === e && this.Ali.splice(t, 1);
  }
  IsInPrewarFormation(t) {
    for (const e of this.Ali) if (e.GetPlayerId() === t) return !0;
    return !1;
  }
  ClearPrewarData() {
    this.Ali.length = 0;
  }
  MatchingPlayerCount() {
    return this.Uli.size;
  }
  get FormationAverageRoleLevel() {
    let t = 0;
    const e =
      ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
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
      if (e.AutoRole.length > 0 && e.TrialRole.length > 0) return !1;
    }
    var e = this.FormationAverageRoleLevel;
    const [r, a] =
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
    return this.xli;
  }
  AddInstanceBeInviteData(t) {
    t &&
      (this.xli
        ? this.RemoveInstanceBeInviteData(t.GetPlayerId())
        : (this.xli = new Array()),
      this.xli.push(t));
  }
  RemoveInstanceBeInviteData(e) {
    for (let t = 0; t < this.xli.length; t++)
      if (this.xli[t].GetPlayerId() === e) return this.xli.splice(t, 1), !0;
    return !1;
  }
  GetInvitePlayerCd(t) {
    t = this.wli.get(t);
    return t || 0;
  }
  SetInvitePlayerCd(t, e) {
    this.wli.set(t, e);
  }
  CreateInstanceInfo(t) {
    return (
      (this.Bli = new InstanceDungeonInfo_1.InstanceDungeonInfo(t)),
      this.Bli.InitConfig(),
      this.Bli
    );
  }
  ClearInstanceDungeonInfo() {
    let t;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 28, "尝试清除副本行为树"),
      this.Bli
        ? ((t = this.Bli), (this.Bli = void 0), t.Destroy())
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("InstanceDungeon", 5, "销毁副本树时，副本树不存在");
  }
  GetInstanceDungeonInfo() {
    return this.Bli;
  }
  ResetData() {
    this.ClearPrewarData(),
      this.ClearPrewarPlayerReadyState(),
      this.ClearMatchingTeamConfirmState(),
      (this.Rli = void 0);
  }
  get LastEnterRoleList() {
    return this.bli;
  }
  set LastEnterRoleList(t) {
    this.bli = t;
  }
  SetInstanceDungeonName(t) {
    this.qli = t;
  }
  GetInstanceDungeonName() {
    return this.qli;
  }
  ConstructCurrentDungeonAreaName() {
    (this.qli = void 0),
      ModelManager_1.ModelManager.TowerModel.CheckInTower() &&
        this.SetInstanceDungeonName(
          ModelManager_1.ModelManager.TowerModel.GetCurrentFloorName(),
        );
  }
}
exports.InstanceDungeonModel = InstanceDungeonModel;
// # sourceMappingURL=InstanceDungeonModel.js.map
