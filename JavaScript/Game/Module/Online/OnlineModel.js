"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineModel =
    exports.onlineDisabledSourceTipsId =
    exports.onlineContinuingChallengeIcon =
      void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  OnlineHallData_1 = require("./OnlineHallData");
(exports.onlineContinuingChallengeIcon = {
  [0]: "ContinuingChallengeAccept",
  1: "ContinuingChallengeRefuse",
  2: "ContinuingChallengePending",
}),
  (exports.onlineDisabledSourceTipsId = {
    [0]: "OnlineDisabledByNonOnlineQuest",
    1: "OnlineDisabledByNonOnlinePlay",
    2: "OnlineDisabledByTrialRole",
  });
class OnlineModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ZGi = void 0),
      (this.eNi = void 0),
      (this.tNi = void 0),
      (this.WorldTeamPlayerFightInfo = []),
      (this.iNi = Protocol_1.Aki.Protocol.$8s.Proto_ConfirmJoin),
      (this.oNi = void 0),
      (this.rNi = 0),
      (this.nNi = 0),
      (this.sNi = 0),
      (this.aNi = 0),
      (this.hNi = void 0),
      (this.lNi = 3),
      (this._Ni = !1),
      (this.uNi = !1),
      (this.cNi = void 0),
      (this.mNi = new Map()),
      (this.dNi = -1),
      (this.CNi = -1),
      (this.gNi = !0),
      (this.fNi = new Map()),
      (this.CachePlayerData = void 0),
      (this.WCa = (e, t) => {
        var i = ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel;
        return (e.PlayerOriginWorldLevel > i && t.PlayerOriginWorldLevel > i) ||
          (e.PlayerOriginWorldLevel <= i && t.PlayerOriginWorldLevel <= i)
          ? t.PlayerLastOfflineTime - e.PlayerLastOfflineTime
          : e.PlayerOriginWorldLevel - t.PlayerOriginWorldLevel;
      });
  }
  OnInit() {
    return (
      (this.ZGi = new Array()),
      (this.eNi = new Array()),
      (this.tNi = new Array()),
      (this.oNi = new Map()),
      (this.hNi = new Map()),
      (this.rNi = -1),
      (this.aNi = -1),
      (this.nNi =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "apply_valid_time",
        )),
      (this.sNi = CommonParamById_1.configCommonParamById.GetIntConfig(
        "world_level_enter_diff",
      )),
      (this.cNi = new Map()),
      !0
    );
  }
  OnClear() {
    return (
      this.ZGi && (this.ZGi.length = 0),
      (this.ZGi = void 0),
      this.eNi && (this.eNi.length = 0),
      (this.eNi = void 0),
      this.tNi && (this.tNi.length = 0),
      (this.tNi = void 0),
      this.oNi && this.oNi.clear(),
      (this.oNi = void 0),
      this.hNi && this.hNi.clear(),
      (this.hNi = void 0),
      (this.rNi = void 0),
      (this.nNi = void 0),
      (this.sNi = void 0),
      this.cNi?.clear(),
      (this.cNi = void 0),
      this.mNi && this.mNi.clear(),
      this.fNi && this.fNi.clear(),
      (this.dNi = -1),
      (this.CNi = -1),
      (this.gNi = !0)
    );
  }
  OnLeaveLevel() {
    return (
      this.mNi && this.mNi.clear(),
      (this.dNi = -1),
      (this.CNi = -1),
      (this.gNi = !0)
    );
  }
  ClearOnlineTeamMap() {
    this.hNi && this.hNi.clear();
  }
  get StrangerWorld() {
    return this.ZGi;
  }
  get FriendWorld() {
    return this.eNi;
  }
  get SearchResult() {
    return this.tNi;
  }
  get CurrentPermissionsSetting() {
    return this.iNi;
  }
  get CurrentApply() {
    return this.oNi.get(this.rNi);
  }
  get CurrentApplyList() {
    return this.oNi;
  }
  get ApplyCd() {
    return this.nNi;
  }
  get EnterDiff() {
    return this.sNi;
  }
  get OwnerId() {
    return this.aNi;
  }
  get TeamMaxSize() {
    return this.lNi;
  }
  get ShowCanJoin() {
    return this.uNi;
  }
  get ShowFriend() {
    return this._Ni;
  }
  get ChallengeApplyPlayerId() {
    return this.dNi;
  }
  get NextInitiateTime() {
    return this.CNi;
  }
  get NextInitiateLeftTime() {
    return this.CNi - TimeUtil_1.TimeUtil.GetServerTime();
  }
  get AllowInitiate() {
    return this.gNi;
  }
  SetHallShowCanJoin(e) {
    this.uNi = e;
  }
  SetHallShowFriend(e) {
    this._Ni = e;
  }
  SetTeamOwnerId(e) {
    this.aNi = e;
  }
  SetPermissionsSetting(e) {
    this.iNi = e;
  }
  CleanSearchResultList() {
    this.tNi.length = 0;
  }
  CleanFriendWorldList() {
    this.eNi.length = 0;
  }
  CleanStrangerWorldList() {
    this.ZGi.length = 0;
  }
  CleanCurrentApply() {
    this.oNi.delete(this.rNi), (this.rNi = -1);
  }
  PushSearchResultList(e) {
    this.tNi.push(e);
  }
  PushFriendWorldList(e) {
    this.eNi.push(e);
  }
  PushStrangerWorldList(e) {
    this.ZGi.push(e);
  }
  SortWorldList(e) {
    (e ? this.eNi : this.ZGi)?.sort(this.WCa);
  }
  PushCurrentApplyList(e) {
    this.oNi.set(e.PlayerId, e), -1 === this.rNi && (this.rNi = e.PlayerId);
  }
  PushCurrentTeamList(e) {
    this.hNi.set(e.PlayerId, e);
  }
  DeleteCurrentApplyListById(t) {
    if ((this.oNi.delete(t), this.oNi.size < 1)) this.rNi = -1;
    else {
      let e = this.nNi;
      for (const [t, i] of this.oNi)
        i.ApplyTimeLeftTime <= e && ((e = i.ApplyTimeLeftTime), (this.rNi = t));
    }
  }
  DeleteCurrentTeamListById(e) {
    this.hNi.delete(e);
  }
  ResetTeamDataPlayer(e) {
    for (const i of this.hNi) {
      var t = i[1];
      t.PlayerNumber > e && t.PlayerNumber--;
    }
  }
  GetCurrentApplyListById(e) {
    return this.oNi.get(e);
  }
  GetCurrentTeamListById(e) {
    return this.hNi.get(e);
  }
  GetCurrentApplyList() {
    var e,
      t,
      i = new Array();
    for ([e, t] of this.oNi) 0 < e && i.push(t);
    return i.sort((e, t) => e.ApplyTimeLeftTime - t.ApplyTimeLeftTime);
  }
  GetCurrentApplySize() {
    return this.oNi.size;
  }
  GetCurrentTeamSize() {
    return this.hNi.size;
  }
  GetIsTeamModel() {
    return -1 !== this.aNi;
  }
  GetIsMyTeam() {
    return (
      ModelManager_1.ModelManager.OnlineModel.OwnerId ===
      ModelManager_1.ModelManager.PlayerInfoModel.GetId()
    );
  }
  GetExistOnlineTeam() {
    return -1 !== ModelManager_1.ModelManager.OnlineModel.OwnerId;
  }
  GetCanJoinFormStranger() {
    var e = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      t = new Array();
    for (const i of this.ZGi) i.WorldLevel <= e + this.EnterDiff && t.push(i);
    return t;
  }
  GetCanJoinFormFriend() {
    var e = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      t = new Array();
    for (const i of this.eNi)
      this.CanJoinOtherWorld(e, i.WorldLevel) && t.push(i);
    return t;
  }
  CanJoinOtherWorld(e, t) {
    return e + this.EnterDiff >= t;
  }
  GetTeamList() {
    var e = new Array();
    for (const t of this.hNi) e.push(t[1]);
    return e.sort((e, t) => e.PlayerNumber - t.PlayerNumber);
  }
  DisableOnline(e, t, i = 0) {
    t ? this.cNi?.set(i, e) : this.cNi?.delete(i),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnlineDisableStateChange,
      );
  }
  IsOnlineDisabled() {
    return !!this.cNi && 0 < this.cNi.size;
  }
  GetOnlineDisabledSource() {
    return this.cNi;
  }
  ClearWorldTeamPlayerFightInfo() {
    this.WorldTeamPlayerFightInfo.length = 0;
  }
  DeleteWorldTeamPlayerFightInfo(e) {
    for (const t of this.WorldTeamPlayerFightInfo)
      t.PlayerId === e &&
        this.WorldTeamPlayerFightInfo.splice(
          this.WorldTeamPlayerFightInfo.indexOf(t),
          1,
        );
  }
  PushWorldTeamPlayerFightInfo(e) {
    this.WorldTeamPlayerFightInfo.push(e);
  }
  GetWorldTeamPlayerFightInfo(e) {
    for (const t of this.WorldTeamPlayerFightInfo)
      if (t.PlayerId === e) return t;
  }
  GetAllWorldTeamPlayer() {
    var e = new Array();
    for (const t of this.WorldTeamPlayerFightInfo) e.push(t.PlayerId);
    return e;
  }
  RefreshWorldTeamRoleInfo(e) {
    for (const r of e) {
      var t = this.GetWorldTeamPlayerFightInfo(r.q5n);
      if (t)
        for (const s of r.xVn)
          if (-1 === s.AVn) {
            var i = new Array();
            for (const n of s.sUs)
              i.push(new OnlineHallData_1.WorldTeamRoleInfo(n.O6n, n.P6n));
            t.RoleInfos = i;
          }
    }
    this.WorldTeamPlayerResetIndex();
  }
  WorldTeamPlayerResetIndex() {
    let e = 0;
    for (const t of this.WorldTeamPlayerFightInfo)
      for (const i of t.RoleInfos) i.RoleIndex = e++;
  }
  ResetContinuingChallengeConfirmState() {
    this.mNi.clear();
    for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers()) {
      var e = t.GetPlayerId();
      this.mNi.set(e, 2);
    }
  }
  SetContinuingChallengeConfirmState(e, t) {
    this.mNi.set(e, t);
  }
  GetContinuingChallengeConfirmState(e) {
    return this.mNi.get(e);
  }
  SetChallengeApplyPlayerId(e) {
    this.dNi = e;
  }
  RefreshInitiateTime() {
    this.CNi = TimeUtil_1.TimeUtil.GetServerTime() + this.ApplyCd;
  }
  SetAllowInitiate(e) {
    this.gNi = e;
  }
  SetPlayerTeleportState(e, t) {
    this.fNi.set(e, t);
  }
  GetPlayerTeleportState(e) {
    return this.fNi.get(e);
  }
  DeletePlayerTeleportState(e) {
    this.fNi.delete(e);
  }
  ClearPlayerTeleportState() {
    this.fNi.clear();
  }
  SetRoleActivated(e, t) {
    e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
      ParamType: 2,
      IsControl: !0,
    }).EntityHandle;
    e?.Valid &&
      e?.Entity &&
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
        e.Entity,
        t,
        "[OnlineModel.SetRoleActivated] 传送中隐藏",
      );
  }
}
exports.OnlineModel = OnlineModel;
//# sourceMappingURL=OnlineModel.js.map
