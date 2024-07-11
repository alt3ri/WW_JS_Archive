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
      (this.Zqi = void 0),
      (this.eGi = void 0),
      (this.tGi = void 0),
      (this.WorldTeamPlayerFightInfo = []),
      (this.iGi = Protocol_1.Aki.Protocol.J3s.Proto_ConfirmJoin),
      (this.oGi = void 0),
      (this.rGi = 0),
      (this.nGi = 0),
      (this.sGi = 0),
      (this.aGi = 0),
      (this.hGi = void 0),
      (this.lGi = 3),
      (this._Gi = !1),
      (this.uGi = !1),
      (this.cGi = void 0),
      (this.mGi = new Map()),
      (this.dGi = -1),
      (this.CGi = -1),
      (this.gGi = !0),
      (this.fGi = new Map()),
      (this.CachePlayerData = void 0);
  }
  OnInit() {
    return (
      (this.Zqi = new Array()),
      (this.eGi = new Array()),
      (this.tGi = new Array()),
      (this.oGi = new Map()),
      (this.hGi = new Map()),
      (this.rGi = -1),
      (this.aGi = -1),
      (this.nGi =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "apply_valid_time",
        )),
      (this.sGi = CommonParamById_1.configCommonParamById.GetIntConfig(
        "world_level_enter_diff",
      )),
      (this.cGi = new Map()),
      !0
    );
  }
  OnClear() {
    return (
      this.Zqi && (this.Zqi.length = 0),
      (this.Zqi = void 0),
      this.eGi && (this.eGi.length = 0),
      (this.eGi = void 0),
      this.tGi && (this.tGi.length = 0),
      (this.tGi = void 0),
      this.oGi && this.oGi.clear(),
      (this.oGi = void 0),
      this.hGi && this.hGi.clear(),
      (this.hGi = void 0),
      (this.rGi = void 0),
      (this.nGi = void 0),
      (this.sGi = void 0),
      this.cGi?.clear(),
      (this.cGi = void 0),
      this.mGi && this.mGi.clear(),
      this.fGi && this.fGi.clear(),
      (this.dGi = -1),
      (this.CGi = -1),
      (this.gGi = !0)
    );
  }
  OnLeaveLevel() {
    return (
      this.mGi && this.mGi.clear(),
      (this.dGi = -1),
      (this.CGi = -1),
      (this.gGi = !0)
    );
  }
  ClearOnlineTeamMap() {
    this.hGi && this.hGi.clear();
  }
  get StrangerWorld() {
    return this.Zqi;
  }
  get FriendWorld() {
    return this.eGi;
  }
  get SearchResult() {
    return this.tGi;
  }
  get CurrentPermissionsSetting() {
    return this.iGi;
  }
  get CurrentApply() {
    return this.oGi.get(this.rGi);
  }
  get CurrentApplyList() {
    return this.oGi;
  }
  get ApplyCd() {
    return this.nGi;
  }
  get EnterDiff() {
    return this.sGi;
  }
  get OwnerId() {
    return this.aGi;
  }
  get TeamMaxSize() {
    return this.lGi;
  }
  get ShowCanJoin() {
    return this.uGi;
  }
  get ShowFriend() {
    return this._Gi;
  }
  get ChallengeApplyPlayerId() {
    return this.dGi;
  }
  get NextInitiateTime() {
    return this.CGi;
  }
  get NextInitiateLeftTime() {
    return this.CGi - TimeUtil_1.TimeUtil.GetServerTime();
  }
  get AllowInitiate() {
    return this.gGi;
  }
  SetHallShowCanJoin(e) {
    this.uGi = e;
  }
  SetHallShowFriend(e) {
    this._Gi = e;
  }
  SetTeamOwnerId(e) {
    this.aGi = e;
  }
  SetPermissionsSetting(e) {
    this.iGi = e;
  }
  CleanSearchResultList() {
    this.tGi.length = 0;
  }
  CleanFriendWorldList() {
    this.eGi.length = 0;
  }
  CleanStrangerWorldList() {
    this.Zqi.length = 0;
  }
  CleanCurrentApply() {
    this.oGi.delete(this.rGi), (this.rGi = -1);
  }
  PushSearchResultList(e) {
    this.tGi.push(e);
  }
  PushFriendWorldList(e) {
    this.eGi.push(e);
  }
  PushStrangerWorldList(e) {
    this.Zqi.push(e);
  }
  PushCurrentApplyList(e) {
    this.oGi.set(e.PlayerId, e), -1 === this.rGi && (this.rGi = e.PlayerId);
  }
  PushCurrentTeamList(e) {
    this.hGi.set(e.PlayerId, e);
  }
  DeleteCurrentApplyListById(t) {
    if ((this.oGi.delete(t), this.oGi.size < 1)) this.rGi = -1;
    else {
      let e = this.nGi;
      for (const [t, i] of this.oGi)
        i.ApplyTimeLeftTime <= e && ((e = i.ApplyTimeLeftTime), (this.rGi = t));
    }
  }
  DeleteCurrentTeamListById(e) {
    this.hGi.delete(e);
  }
  ResetTeamDataPlayer(e) {
    for (const i of this.hGi) {
      var t = i[1];
      t.PlayerNumber > e && t.PlayerNumber--;
    }
  }
  GetCurrentApplyListById(e) {
    return this.oGi.get(e);
  }
  GetCurrentTeamListById(e) {
    return this.hGi.get(e);
  }
  GetCurrentApplyList() {
    var e,
      t,
      i = new Array();
    for ([e, t] of this.oGi) 0 < e && i.push(t);
    return i.sort((e, t) => e.ApplyTimeLeftTime - t.ApplyTimeLeftTime);
  }
  GetCurrentApplySize() {
    return this.oGi.size;
  }
  GetCurrentTeamSize() {
    return this.hGi.size;
  }
  GetIsTeamModel() {
    return -1 !== this.aGi;
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
    for (const i of this.Zqi) i.WorldLevel <= e + this.EnterDiff && t.push(i);
    return t;
  }
  GetCanJoinFormFriend() {
    var e = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      t = new Array();
    for (const i of this.eGi)
      this.CanJoinOtherWorld(e, i.WorldLevel) && t.push(i);
    return t;
  }
  CanJoinOtherWorld(e, t) {
    return e + this.EnterDiff >= t;
  }
  GetTeamList() {
    var e = new Array();
    for (const t of this.hGi) e.push(t[1]);
    return e.sort((e, t) => e.PlayerNumber - t.PlayerNumber);
  }
  DisableOnline(e, t, i = 0) {
    t ? this.cGi?.set(i, e) : this.cGi?.delete(i),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnlineDisableStateChange,
      );
  }
  IsOnlineDisabled() {
    return !!this.cGi && 0 < this.cGi.size;
  }
  GetOnlineDisabledSource() {
    return this.cGi;
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
      var t = this.GetWorldTeamPlayerFightInfo(r.aFn);
      if (t)
        for (const n of r.J4n)
          if (-1 === n.$4n) {
            var i = new Array();
            for (const s of n.FLs)
              i.push(new OnlineHallData_1.WorldTeamRoleInfo(s.l3n, s.r3n));
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
    this.mGi.clear();
    for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers()) {
      var e = t.GetPlayerId();
      this.mGi.set(e, 2);
    }
  }
  SetContinuingChallengeConfirmState(e, t) {
    this.mGi.set(e, t);
  }
  GetContinuingChallengeConfirmState(e) {
    return this.mGi.get(e);
  }
  SetChallengeApplyPlayerId(e) {
    this.dGi = e;
  }
  RefreshInitiateTime() {
    this.CGi = TimeUtil_1.TimeUtil.GetServerTime() + this.ApplyCd;
  }
  SetAllowInitiate(e) {
    this.gGi = e;
  }
  SetPlayerTeleportState(e, t) {
    this.fGi.set(e, t);
  }
  GetPlayerTeleportState(e) {
    return this.fGi.get(e);
  }
  DeletePlayerTeleportState(e) {
    this.fGi.delete(e);
  }
  ClearPlayerTeleportState() {
    this.fGi.clear();
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
