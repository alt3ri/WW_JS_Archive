"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const AdventureDefine_1 = require("../AdventureGuide/AdventureDefine");
const InstanceDungeonData_1 = require("./Define/InstanceDungeonData");
class InstanceDungeonEntranceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.qai = 0),
      (this.Gai = 0),
      (this.Nai = 0),
      (this.Oai = 0),
      (this.kai = void 0),
      (this.Fai = new Array()),
      (this.Vai = 0),
      (this.Hai = new Map()),
      (this.jai = new Map()),
      (this.Wai = new Array()),
      (this.Kai = 0),
      (this.Qai = 0),
      (this.Xai = void 0),
      (this.OnStopTimer = void 0),
      (this.OnStopHandle = void 0),
      (this.$ai = 0),
      (this.Yai = !1),
      (this.E0 = 0);
  }
  OnLeaveLevel() {
    return this.CancelMatchingTimer(), !0;
  }
  get EntranceId() {
    return this.qai;
  }
  set EntranceId(e) {
    this.qai = e;
  }
  get InstanceId() {
    return this.Gai;
  }
  set InstanceId(e) {
    this.Gai = e;
  }
  get SelectInstanceId() {
    return this.Nai;
  }
  set SelectInstanceId(e) {
    this.Nai = e;
  }
  get LastInstanceId() {
    return this.Oai;
  }
  set LastInstanceId(e) {
    this.Oai = e;
  }
  get TransitionOption() {
    return this.kai;
  }
  set TransitionOption(e) {
    this.kai = e;
  }
  get EntranceInstanceIdList() {
    return this.Fai;
  }
  set EntranceInstanceIdList(e) {
    this.Fai = e;
  }
  get EntranceEndTime() {
    return this.Vai;
  }
  set EntranceEndTime(e) {
    this.Vai = e;
  }
  GetInstanceResetTime(e) {
    return this.Hai.get(e);
  }
  SetInstanceResetTime(e, t) {
    this.Hai.set(e, t);
  }
  get SettleRewardItemList() {
    return this.Wai;
  }
  GetInstanceData(e) {
    let t;
    if (e)
      return (
        this.jai.get(e) ||
        ((t = new InstanceDungeonData_1.InstanceDungeonData(e)),
        this.jai.set(e, t),
        t)
      );
  }
  SetInstanceData(t) {
    const n = t.Ekn;
    if (n) {
      let e = this.jai.get(n);
      e ||
        ((e = new InstanceDungeonData_1.InstanceDungeonData(n)),
        this.jai.set(n, e)),
        (e.ChallengedTimes = t.WRs);
    }
  }
  get MatchingTime() {
    return this.Qai;
  }
  set MatchingTime(e) {
    this.Qai = e;
  }
  MatchingTimeIncrease() {
    this.Qai++;
  }
  get MatchingTimer() {
    return this.Xai;
  }
  set MatchingTimer(e) {
    this.Xai = e;
  }
  CancelMatchingTimer() {
    void 0 !== this.MatchingTimer &&
      TimerSystem_1.TimerSystem.Remove(this.MatchingTimer),
      this.OnStopHandle && this.OnStopHandle(),
      (this.OnStopTimer = void 0),
      (this.OnStopHandle = void 0),
      (this.MatchingTimer = void 0),
      this.SetMatchingState(0),
      this.SetMatchingId(0),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
  }
  GetMatchingState() {
    return this.Kai;
  }
  SetMatchingState(e) {
    this.Kai = e;
  }
  GetMatchingId() {
    return this.$ai;
  }
  SetMatchingId(e) {
    this.$ai = e;
  }
  InitInstanceDataList(e) {
    if (e) for (const t of e) this.SetInstanceData(t);
  }
  GetInstancePowerCost(e) {
    return !(e <= 0) &&
      !(
        (e =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
            e,
          ).RewardId) <= 0
      ) &&
      (e =
        ConfigManager_1.ConfigManager.LevelPlayConfig.GetExchangeRewardInfo(
          e,
        )) &&
      e.Cost
      ? e.Cost.get(5)
      : 0;
  }
  get EditBattleTeamMatching() {
    return this.Yai;
  }
  SetEditBattleTeamMatching(e) {
    (this.Yai = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MatchTeamFlagChange,
        e,
      );
  }
  SyncSettleRewardItemList(e) {
    this.Wai.length = 0;
    for (const t of Object.keys(e))
      this.Wai.push([{ IncId: 0, ItemId: Number.parseInt(t) }, e[t]]);
  }
  GetSortedEntranceInstanceIdList(e) {
    e =
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
        e,
      )?.InstanceDungeonList;
    if (e) {
      const t = [];
      for (const n of e) this.CheckInstanceCanChallenge(n) && t.push(n);
      return t;
    }
  }
  GetSortedByTitleEntranceInstanceIdList(e) {
    const t =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel
        .EntranceInstanceIdList;
    if (t) {
      let n;
      const r = new Map();
      for (const a of t)
        (n =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
            a,
          ).Title),
          r.set(a, n);
      return r;
    }
  }
  CheckInstanceFinished(e) {
    let t;
    var e =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        e,
      ).EnterControlId;
    return (
      !!e &&
      ((t = this.GetInstanceData(e).ChallengedTimes),
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetCountConfig(e)
        .EnterCount <= t)
    );
  }
  CheckInstanceCanChallenge(e) {
    var e =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        e,
      ).EnterControlId;
    return !e || !(e = this.GetInstanceData(e)) || e.CanChallenge;
  }
  CheckInstanceLevelTooLow(e) {
    const t =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        e,
      )?.DropVisionLimit;
    return (
      !!t &&
      !!(e =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(
          e,
        )) &&
      ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel > e[1] + t
    );
  }
  CheckInstanceCanReward(e) {
    var e =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        e,
      ).EnterControlId;
    return !e || !(e = this.GetInstanceData(e)) || e.CanReward;
  }
  CheckInstanceUnlock(e) {
    let t;
    const n =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(e);
    if (n)
      switch (n[0]) {
        case 1:
          return (
            ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(0) >=
            n[1]
          );
        case 2:
          return (
            ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel >= n[1]
          );
        case 3:
          return ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
            n[1],
          ) === 3
            ? !0
            : !!(t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(n[1]))
                ?.IsProgressing &&
                (t.GetNode(n[2])?.IsSuccess ?? !1);
        case 4:
          return (
            ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(
              n[1],
            ) ?? !1
          );
        case 5:
          return ModelManager_1.ModelManager.ActivityModel.GetActivityLevelUnlockState(
            n[1],
            n[2],
          );
        default:
          return !0;
      }
    return !0;
  }
  get EntranceEntityId() {
    return this.E0;
  }
  set EntranceEntityId(e) {
    this.E0 = e;
  }
  GetInstanceDungeonReward(e) {
    var t =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceRewardId(
        e,
      );
    var n =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceFirstRewardId(
        e,
      );
    const r = n && n > 0;
    const a = t && t > 0;
    var e = ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(e);
    var n =
      ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
        n,
      ) ?? [];
    var t =
      ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
        t,
      ) ?? [];
    return r && a ? (e ? [t, !1] : [n.concat(t), !1]) : a ? [t, !1] : [n, e];
  }
  IsMowingInstanceDungeon() {
    let e = this.SelectInstanceId;
    return (
      !!(e =
        ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
          ? ModelManager_1.ModelManager.CreatureModel.GetInstanceId()
          : e) &&
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
        ?.InstSubType === AdventureDefine_1.EDungeonSubType.Mowing
    );
  }
}
exports.InstanceDungeonEntranceModel = InstanceDungeonEntranceModel;
// # sourceMappingURL=InstanceDungeonEntranceModel.js.map
