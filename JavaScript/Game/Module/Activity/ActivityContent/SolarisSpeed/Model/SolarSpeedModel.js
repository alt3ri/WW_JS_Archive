"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SolarSpeedModel = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../../../../Core/Framework/ModelBase"),
  LocalStorage_1 = require("../../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  SolarSpeedDefine_1 = require("../SolarSpeedDefine"),
  SolarSpeedConfigContext_1 = require("./SolarSpeedConfigContext"),
  SolarSpeedProtocolContext_1 = require("./SolarSpeedProtocolContext"),
  SolarSpeedUiContext_1 = require("./SolarSpeedUiContext");
var Proto_ActivityTaskState = Protocol_1.Aki.Protocol.I$s;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ActivityControllerHolder_1 = require("../../../ActivityControllerHolder"),
  SolarSpeedRolePanel_1 = require("../View/SolarSpeedRolePanel");
class SolarSpeedModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.UVa = void 0),
      (this.xVa = void 0),
      (this.PVa = void 0);
  }
  OnInit() {
    return (
      (this.UVa = new SolarSpeedConfigContext_1.SolarSpeedConfigContext(this)),
      (this.xVa = new SolarSpeedProtocolContext_1.SolarSpeedProtocolContext(
        this,
      )),
      (this.PVa = new SolarSpeedUiContext_1.SolarSpeedUiContext()),
      !0
    );
  }
  OnClear() {
    return this.UVa.Dispose(), this.xVa.Dispose(), this.PVa.Dispose(), !0;
  }
  get CurrentActivityId() {
    return this.xVa.Id;
  }
  get ActivityData() {
    return this.xVa;
  }
  get ActivityTitleTextId() {
    return this.xVa.LocalConfig?.Title ?? "";
  }
  get ActivityIconPath() {
    return this.xVa.LocalConfig?.TabResource ?? "";
  }
  get InstanceEntranceIconPath() {
    return (
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
        SolarSpeedDefine_1.SOLAR_SPEED_INSTANCE_ENTRANCE_ID,
      )?.TitleSprite ?? ""
    );
  }
  get CurrentChosenTabInRewardView() {
    return this.PVa.CurrentChosenTabInRewardView;
  }
  get HasLevelRedDot() {
    for (var [e] of this.UVa.CurrentCfgCache)
      if (this.HasRedDotById(e)) return !0;
    return !1;
  }
  get HasRewardRedDot() {
    for (var [e] of this.UVa.CurrentRewardCache)
      if (
        this.xVa.GetTaskStateById(e) ===
        Proto_ActivityTaskState.Proto_ActivityTaskFinish
      )
        return !0;
    return !1;
  }
  get TotalRewardCount() {
    return this.UVa.CurrentRewardCache.size;
  }
  get CurrentCompletedCount() {
    let e = 0;
    for (var [t] of this.UVa.CurrentRewardCache) {
      t = this.xVa.GetTaskStateById(t);
      void 0 !== t &&
        t > Proto_ActivityTaskState.Proto_ActivityTaskRunning &&
        ++e;
    }
    return e;
  }
  get DefaultLevelIdInRewardView() {
    return (
      (this.PVa.CurrentChosenTabInRewardView = 1),
      this.PVa.CurrentChosenTabInRewardView
    );
  }
  GetInfoPicturePathByInstanceId(e) {
    return this.UVa.GetInfoPicturePathByInstanceId(e);
  }
  GetIconPathInInstanceSeriesItemByInstanceId(e) {
    var e = this.UVa.GetLevelIdByInstanceId(e);
    if (void 0 !== e)
      return (e = this.xVa.GetRankingById(e)), this.GetMedalPathByRank(e);
  }
  GetHistoryHighScoreInSettleView() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return this.GetHistoryHighScoreByInstanceId(e) ?? 0;
  }
  GetHistoryRankByInstanceId(e) {
    var t = this.UVa.GetLevelIdByInstanceId(e);
    if (void 0 !== t) return this.xVa.GetRankingById(t);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "SolarSpeed",
        64,
        "不能通过instanceId找到levelId，策划检查配置",
        ["instanceId", e],
      );
  }
  GetHistoryHighScoreByInstanceId(e) {
    var t = this.UVa.GetLevelIdByInstanceId(e);
    if (void 0 !== t) return this.xVa.GetScoreById(t);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "SolarSpeed",
        64,
        "不能通过instanceId找到levelId，策划检查配置",
        ["instanceId", e],
      );
  }
  GetHistoryLapRecordByInstanceId(e) {
    var t = this.UVa.GetLevelIdByInstanceId(e);
    if (void 0 !== t) return this.xVa.GetLapRecord(t);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "SolarSpeed",
        64,
        "不能通过instanceId找到levelId，策划检查配置",
        ["instanceId", e],
      );
  }
  GetMedalPathByRank(e) {
    if (!(e < 1 || e > SolarSpeedDefine_1.medalTexPathMap.length))
      return SolarSpeedDefine_1.medalTexPathMap[e - 1];
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("SolarSpeed", 64, "rank值超出奖牌资源索引范围", [
        "rank",
        e,
      ]);
  }
  GetInstanceSubtitleTextIdByInstanceId(e) {
    e = this.UVa.GetLevelIdByInstanceId(e);
    if (void 0 !== e)
      return this.IsUnlockById(e)
        ? 0 === this.xVa.GetRankingById(e)
          ? SolarSpeedDefine_1.SOLAR_SPEED_NO_RECORD_TEXT_ID
          : SolarSpeedDefine_1.SOLAR_SPEED_MOST_RECORD_TEXT_ID
        : SolarSpeedDefine_1.SOLAR_SPEED_UNLOCK_AFTER_DAYS;
  }
  GetInstanceSubtitleArgsByInstanceId(e) {
    var e = this.UVa.GetLevelIdByInstanceId(e);
    if (void 0 !== e)
      return this.IsUnlockById(e)
        ? 0 === this.xVa.GetRankingById(e)
          ? void 0
          : [this.xVa.GetScoreById(e).toString()]
        : void 0 ===
            (e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(
              this.xVa.GetStartTime(e) - TimeUtil_1.TimeUtil.GetServerTime(),
            ).CountDownText)
          ? void 0
          : [e];
  }
  GetInstanceUnlockTextIdByInstanceId(e) {
    var t = this.UVa.GetLevelIdByInstanceId(e);
    if (void 0 !== t)
      return this.IsUnlockById(t)
        ? ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockConditionGroupHintText(
            e,
          )
        : SolarSpeedDefine_1.SOLAR_SPEED_UNLOCK_AFTER_DAYS;
  }
  GetInstanceUnlockArgsByInstanceId(e) {
    var e = this.UVa.GetLevelIdByInstanceId(e);
    return void 0 === e ||
      this.IsUnlockById(e) ||
      void 0 ===
        (e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(
          this.xVa.GetStartTime(e) - TimeUtil_1.TimeUtil.GetServerTime(),
        ).CountDownText)
      ? void 0
      : [e];
  }
  IsUnlockByInstanceId(e) {
    e = this.UVa.GetLevelIdByInstanceId(e);
    return void 0 !== e && this.IsUnlockById(e);
  }
  IsClickedById(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.SolarSpeedInstanceClicked,
    );
    return void 0 !== t && (t.get(e) ?? !1);
  }
  IsUnlockById(e) {
    return this.xVa.GetStartTime(e) < TimeUtil_1.TimeUtil.GetServerTime();
  }
  HasRedDotById(e) {
    return !this.IsClickedById(e) && this.IsUnlockById(e);
  }
  HasRedDotByInstanceId(e) {
    e = this.UVa.GetLevelIdByInstanceId(e);
    return void 0 !== e && this.HasRedDotById(e);
  }
  SetCurrentChosenTabInRewardView(e) {
    this.PVa.CurrentChosenTabInRewardView = e;
  }
  SyncTeamParkourTaskNotify(e) {
    this.xVa.ParseTeamParkourTaskNotify(e);
  }
  SyncTeamParkourSettleNotify(e) {
    this.xVa.ParseTeamParkourSettleNotify(e);
  }
  SyncInstanceClicked(t) {
    t = this.UVa.GetLevelIdByInstanceId(t);
    if (void 0 !== t && this.IsUnlockById(t)) {
      let e = LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.SolarSpeedInstanceClicked,
      );
      (e = void 0 === e ? new Map() : e).has(t) ||
        (e.set(t, !0),
        LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.SolarSpeedInstanceClicked,
          e,
        ));
    }
  }
  SyncAfterRewardedById(e) {
    this.xVa.SetTaskStateRewardedById(e);
  }
  BuildSolarSpeedRewardViewDataById(e) {
    return {
      TitleTextId: this.ActivityTitleTextId,
      TitleIconPath: this.InstanceEntranceIconPath,
      Score: this.xVa.GetScoreById(e).toString(),
      RewardPanelData: {
        TabDataList: this.T3_(e),
        RewardDataList: this.b3_(e),
      },
    };
  }
  L3_(e) {
    for (const t of this.UVa.SortedSettleCfgCache)
      switch (t.Id) {
        case 1:
          if (e.a3_ && e.s3_ < t.Args) return t;
          break;
        case 2:
          if (e.r3_ === t.Args) return t;
          break;
        case 4:
          if (1 !== e.r3_ && e.a3_) return t;
          break;
        case 6:
          if (e._3_ > t.Args && !e.a3_) return t;
          break;
        case 7:
          return t;
      }
  }
  D6_(e) {
    e = this.UVa.CurrentCfgCache.get(e)?.TaskList;
    if (void 0 !== e)
      for (const t of e)
        if (
          this.xVa.GetTaskStateById(t) ===
          Proto_ActivityTaskState.Proto_ActivityTaskFinish
        )
          return !0;
    return !1;
  }
  B6_() {
    for (const e of SolarSpeedDefine_1.bonusRewardList)
      if (
        this.xVa.GetTaskStateById(e) ===
        Proto_ActivityTaskState.Proto_ActivityTaskFinish
      )
        return !0;
    return !1;
  }
  BuildSolarSpeedResultViewData() {
    var e,
      t,
      r = [];
    for ([, e] of this.xVa.PlayerSettleMsgCache) {
      var i = e.W5n,
        o = e.r3_,
        a = o - 1,
        n = ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(i),
        s = n?.IsSelf ?? !1,
        d = n ? n.PlayerNumber - 1 : 0,
        l = this.L3_(e),
        o = {
          Rank: o,
          PlayerId: i,
          IsAddButtonAvailable:
            !s && !ModelManager_1.ModelManager.FriendModel.IsMyFriend(i),
          IsSelf: s,
          BgPath: SolarSpeedDefine_1.rankBgPathMap[a],
          MedalTexturePath: SolarSpeedDefine_1.medalTexPathMap[a],
          MedalColorHex: SolarSpeedDefine_1.medalColorHex[a],
          FxColorHex: SolarSpeedDefine_1.fxColorHex[a],
          PlayerIndexIconPath: (s
            ? SolarSpeedDefine_1.playerIndexSelfIconMap
            : SolarSpeedDefine_1.playerIndexIconMap)[d],
          NameText: n?.PlayerName ?? "",
          DescTextId: l?.Content ?? "",
          TitleTextId: l?.Title ?? "",
          IconData: {
            IconPath:
              void 0 === n
                ? ""
                : ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(
                    n.HeadId,
                    !1,
                  ).GetRoleHeadIconCircle(),
          },
        };
      r.push(o);
    }
    return (
      r.sort((e, t) => e.Rank - t.Rank),
      1 < r.length && ((t = r[0]), (r[0] = r[1]), (r[1] = t)),
      {
        RoleDataList: r,
        PanelType: SolarSpeedRolePanel_1.SolarSpeedRolePanel,
        ConfirmClick: () => {
          ActivityControllerHolder_1.ActivityControllerHolder.ActivitySolarSpeedController.HandleClickNextInResultView();
        },
      }
    );
  }
  T3_(e) {
    var t,
      r = [],
      i = this.UVa;
    for ([t] of this.UVa.CurrentCfgCache) {
      const o = {
        LevelId: t,
        RomeNumberPath: i.GetRomePathById(t) ?? "",
        TitleTextId: i.GetTitleTextIdById(t),
        IsChosen: t === e,
        IsRedDot: this.D6_(t),
      };
      r.push(o);
    }
    const o = {
      LevelId: SolarSpeedDefine_1.SOLAR_SPEED_BONUS_LEVEL_ID,
      RomeNumberPath: SolarSpeedDefine_1.SOLAR_SPEED_BONUS_LEVEL_ICON_PATH,
      TitleTextId:
        SolarSpeedDefine_1.SOLAR_SPEED_BONUS_REWARD_TEXT_ID_IN_REWARD,
      IsChosen: SolarSpeedDefine_1.SOLAR_SPEED_BONUS_LEVEL_ID === e,
      IsRedDot: this.B6_(),
    };
    return r.push(o), r;
  }
  b3_(e) {
    var t = [],
      r = this.UVa;
    for (const o of r.GetTaskListById(e)) {
      var i = {
        RewardId: o,
        TitleTextId: r.GetRewardTitleTextId(o) ?? "",
        ProgressTextId: SolarSpeedDefine_1.SOLAR_SPEED_REWARD_PROGRESS_TEXT_ID,
        ProgressTextArgs: [
          this.xVa.GetCurrentProgressById(o).toString(),
          this.xVa.GetCurrentProgressTargetById(o).toString(),
        ],
        ItemsData: r.GetRewardItemDataListById(o),
        ButtonTextId: SolarSpeedDefine_1.SOLAR_SPEED_REWARD_BUTTON_TEXT_ID,
        ButtonActive:
          this.xVa.GetTaskStateById(o) ===
          Proto_ActivityTaskState.Proto_ActivityTaskFinish,
        RightActive:
          this.xVa.GetTaskStateById(o) ===
          Proto_ActivityTaskState.Proto_ActivityTaskRunning,
        DoneSpriteActive:
          this.xVa.GetTaskStateById(o) ===
          Proto_ActivityTaskState.Proto_ActivityTaskTaken,
      };
      t.push(i);
    }
    return t.sort((e, t) => e.RewardId - t.RewardId), t;
  }
  BuildActivitySubViewData() {
    return {
      RewardTextId:
        SolarSpeedDefine_1.SOLAR_SPEED_REWARD_TITLE_TEXT_ID_IN_SUBVIEW,
      ButtonTextId:
        SolarSpeedDefine_1.SOLAR_SPEED_CONFIRM_BUTTON_TEXT_ID_IN_SUBVIEW,
      RewardRedDotStateGetter: () => this.HasRewardRedDot,
      ConfirmRedDotStateGetter: () => this.HasLevelRedDot,
      RewardProgressCurrentGetter: () => this.CurrentCompletedCount.toString(),
      RewardProgressTextId:
        SolarSpeedDefine_1.SOLAR_SPEED_REWARD_PROGRESS_TEXT_ID_IN_SUBVIEW,
      RewardProgressTotal: this.TotalRewardCount.toString(),
    };
  }
  BuildSettleReachTargetData() {
    var e = this.xVa.CurrentRankPointsCache ?? 0,
      t = this.xVa.CurrentDistancePointsCache ?? 0,
      r = e + t;
    return {
      TargetReached: [
        {
          Target: [e.toString()],
          DescriptionTextId:
            SolarSpeedDefine_1.SOLAR_SPEED_RANK_SCORE_TEXT_ID_IN_SETTLE,
          IsReached: !0,
        },
        {
          Target: [t.toString()],
          DescriptionTextId:
            SolarSpeedDefine_1.SOLAR_SPEED_DISTANCE_SCORE_TEXT_ID_IN_SETTLE,
          IsReached: !0,
        },
      ],
      IfNewRecord: r > this.GetHistoryHighScoreInSettleView(),
      FullScore: r,
      RecordTextId: SolarSpeedDefine_1.SOLAR_SPEED_RECORD_TEXT_ID_IN_SETTLE,
    };
  }
}
exports.SolarSpeedModel = SolarSpeedModel;
//# sourceMappingURL=SolarSpeedModel.js.map
