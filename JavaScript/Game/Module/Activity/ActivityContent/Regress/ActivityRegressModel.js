"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressModel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityRegressDefine_1 = require("./ActivityRegressDefine"),
  ActivityRegressQuestionnaireItemData_1 = require("./Questionnaire/ActivityRegressQuestionnaireItemData"),
  ActivityRegressTaskDefine_1 = require("./Task/ActivityRegressTaskDefine");
class ActivityRegressModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Mda = 0),
      (this.Rfa = !1),
      (this.AlreadyStartView = !1),
      (this.TT1 = new Map()),
      (this.bT1 = new Map()),
      (this.RT1 = new Map()),
      (this.EntryEndTimeStamp = void 0),
      (this.OI1 = 0),
      (this.LastUnGetRewardLevelPlayId = 0),
      (this.Qh1 = void 0),
      (this.Kh1 = void 0),
      (this.Vb1 = !1);
  }
  get ActivityId() {
    return this.Mda;
  }
  set ActivityId(e) {
    this.Mda = e;
  }
  get ActivityRecallForbidStart() {
    return this.Rfa;
  }
  set ActivityRecallForbidStart(e) {
    this.Rfa !== e &&
      e &&
      UiManager_1.UiManager.IsViewOpen("ActivityRegressStartupView") &&
      UiManager_1.UiManager.CloseView("ActivityRegressStartupView"),
      (this.Rfa = e);
  }
  get Grade() {
    return this.ActivityData.Grade;
  }
  OnInit() {
    return (
      (this.OI1 =
        3 * TimeUtil_1.TimeUtil.Hour * TimeUtil_1.TimeUtil.OneDayHourCount),
      this.nv1(),
      !0
    );
  }
  OnClear() {
    return (this.Mda = 0), !(this.Rfa = !1);
  }
  get ActivityData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      this.ActivityId,
    );
  }
  get CheckIfInShowTime() {
    return this.ActivityData.CheckIfInShowTime();
  }
  get IsActivityOpen() {
    return !!this.ActivityData && this.ActivityData.IsActivityOpen();
  }
  HasSignRewardCanClaimed() {
    return this.ActivityData.HasSignRewardCanClaimed();
  }
  TodayFirstShowSign() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey
        .ActivityRegressSignLastDailyFirstShowTimeStamp,
      0,
    );
    return 0 === e || e <= TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp();
  }
  SetSignFirstShowTime() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey
        .ActivityRegressSignLastDailyFirstShowTimeStamp,
      TimeUtil_1.TimeUtil.GetServerTimeStamp(),
    );
  }
  SetupSignRewardConfig() {
    this.Qh1 =
      ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressSignRewards(
        this.ActivityId,
        this.Grade,
      );
  }
  GetLatestSignRewardItemInfo() {
    var t =
      ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressSignRewards(
        this.ActivityId,
        this.Grade,
      );
    if (void 0 !== t)
      for (let e = t.length - 1; 0 <= e; e--) {
        var i = t[e],
          r = e + 1;
        if (this.CheckSignRewardState(r, 1))
          return this.GetSignRewardPreviewItemInfo(i);
      }
    return { ItemInfo: void 0, ItemCount: 0, RewardState: 0 };
  }
  GetSignRewardConfigByIndex(e) {
    if (void 0 === this.Qh1)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          63,
          "回归活动->未初始化签到奖励配置!",
          ["activityId:", this.ActivityId],
          ["grade:", this.Grade],
        );
    else {
      if (!(e < 0 || e >= this.Qh1.length)) return this.Qh1[e];
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          63,
          "回归活动->获取签到配置的索引越界",
          ["activityId:", this.ActivityId],
          ["grade:", this.Grade],
          ["index:", e],
        );
    }
  }
  ClearSignRewardConfig() {
    this.Qh1 = void 0;
  }
  GetSignRewardPreviewItemInfo(e) {
    var [t, i] = this.GetSignRewardPreviewReward(e),
      r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
    return r
      ? {
          ItemInfo: r,
          ItemCount: i,
          RewardState: this.GetSignRewardState(e.SignDayNum),
        }
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ActivityRecall",
            63,
            "回流活动-ActivityRecallModel.GetSignRewardPreviewItemInfo()->",
            ["签到奖励的掉落包预览道具配置不存在, itemId:", t],
            ["itemConfig:", r],
          ),
        { ItemCount: 0, RewardState: 0 });
  }
  GetSignRewardLocalTextKeyByState(e) {
    switch (e) {
      case 0:
        return "RecallActivity_Sign_Lock";
      case 1:
        return "RecallActivity_Sign_Get";
      case 2:
        return "RecallActivity_Sign_Finish";
      default:
        return "RecallActivity_Sign_Lock";
    }
  }
  GetSignRewardPreviewReward(e) {
    return this.GetDropPreviewRewardTupleForPreview(e.SignReward);
  }
  GetDropPreviewRewardTupleForPreview(e) {
    var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e);
    if (t && 0 < t.DropPreview.size) {
      t = t.DropPreview;
      let [i, r] = [0, 0];
      return (
        t.forEach((e, t) => {
          0 === i && ((i = t), (r = e));
        }),
        [i, r]
      );
    }
    return (
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          63,
          "回归活动->掉落包预览道具不存在",
          ["dropId:", e],
        ),
      [void 0, 0]
    );
  }
  GetDropPreviewRewardItemListForPreview(e) {
    var t,
      i,
      r = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e),
      a = [];
    if (r && 0 < r.DropPreview.size)
      for ([t, i] of r.DropPreview) {
        var o = [{ IncId: 0, ItemId: t }, i];
        a.push(o);
      }
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          63,
          "回归活动->掉落包预览道具不存在",
          ["dropId:", e],
        );
    return a;
  }
  CheckSignRewardState(e, t) {
    return this.ActivityData.GetSignRewardState(e) === t;
  }
  GetSignRewardState(e) {
    return this.ActivityData.GetSignRewardState(e);
  }
  GetLastestRegressBaseConfigList(e) {
    let t =
      ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBaseConfigListByType(
        e,
      ).filter((e) => this.CheckIfEntryOpen(e)[0]);
    return t.sort((e, t) => t.Id - e.Id), (t = t.slice(0, 3));
  }
  IsRegressEntrance(e) {
    return 1 === e || 0 === e || 2 === e || 3 === e;
  }
  CheckIfEntryOpen(e) {
    var t,
      i,
      e = e.GachaId;
    return 0 < e
      ? void 0 !== (i = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e))
        ? ((t = TimeUtil_1.TimeUtil.GetServerTime()),
          (e = this.GetValidGachaPool(e)),
          (i = i.GetPoolEndTimeByPoolInfo(e) - t),
          [!MathUtils_1.MathUtils.IsNearlyZero(i, 0.1), i])
        : [!1, 0]
      : [!0, void 0];
  }
  GetValidGachaPool(e) {
    for (const i of ModelManager_1.ModelManager.GachaModel.GachaInfoArray)
      if (ModelManager_1.ModelManager.GachaModel.CheckGachaValid(i)) {
        var t = i.UsePoolId,
          t = 0 < t ? i.GetPoolInfo(t) : i.GetFirstValidPool();
        if (t && i.Id === e) return t;
      }
  }
  GetRegressBaseRewardPreviewItemList(e) {
    return this.GetDropPreviewRewardItemListForPreview(e.RewardPreview);
  }
  GetDoubleDropRestTimes(e) {
    return this.ActivityData.IsActivityOpen()
      ? 1 === e
        ? this.GetDoubleDropMaxTimes(e) -
          this.ActivityData.GetBossDoubleDropCount()
        : 2 === e
          ? this.GetDoubleDropMaxTimes(e) -
            this.ActivityData.GetWeekDoubleDropCount()
          : 0
      : 0;
  }
  HasDoubleDropRestTimes() {
    return this.GetDoubleDropRestTimes(2) + this.GetDoubleDropRestTimes(1);
  }
  GetDoubleDropMaxTimes(e) {
    var t;
    return this.ActivityData.IsActivityOpen()
      ? ((t =
          ConfigManager_1.ConfigManager.ActivityRegressConfig.GetDoubleDropConfig(
            this.Grade,
          )),
        1 === e ? t.BossDoubleTimes : 2 === e ? t.WeekDoubleTimes : 0)
      : 0;
  }
  ShouldShowDoubleDropRedDot() {
    if (this.ActivityData?.IsActivityOpen()) {
      if (this.ActivityData.CheckDoubleDropFirstRedDot()) return !0;
      var e = TimeUtil_1.TimeUtil.GetServerTime(),
        e = this.ActivityData.EndOpenTime - e;
      if (e <= this.OI1)
        if (0 < this.HasDoubleDropRestTimes())
          return (
            (e = TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp()),
            LocalStorage_1.LocalStorage.GetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey
                .ActivityRegressDoubleDropReminderLastShowTime,
              0,
            ) < e
          );
    }
    return !1;
  }
  MarkDoubleDropReminderShown() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey
        .ActivityRegressDoubleDropReminderLastShowTime,
      TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp(),
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RecallActivityInfoUpdate,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.ActivityId,
      );
  }
  nv1() {
    var e =
      ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllDungeonDetection();
    if (e)
      for (const a of e)
        if (21 === a.Secondary || 7 === a.Secondary) {
          var t =
            ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
              a.DungeonId,
            );
          if (void 0 !== t) {
            var t = t.InstanceDungeonList,
              i = this.Qb1(a.Secondary);
            for (const o of t) i.add(o);
            this.Kb1(a.Secondary).add(a.DungeonId),
              this.Xb1(a.Id, 0, a.Secondary);
          }
        }
    e =
      ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllSilentAreaDetection();
    if (e)
      for (const n of e)
        if (21 === n.Secondary || 7 === n.Secondary) {
          var r = this.RT1.get(n.Secondary) ?? new Set();
          for (const s of n.LevelPlayList) r.add(s);
          this.RT1.set(n.Secondary, r), this.Xb1(n.Id, 1, n.Secondary);
        }
  }
  Qb1(e) {
    var t = this.TT1.get(e) ?? new Set();
    return this.TT1.set(e, t), t;
  }
  Kb1(e) {
    var t = this.bT1.get(e) ?? new Set();
    return this.bT1.set(e, t), t;
  }
  Xb1(e, t, i) {
    var e =
        ConfigManager_1.ConfigManager.AdventureModuleConfig.GetPreOpenDetectionConfListByDetectionId(
          e,
          t,
        ),
      r = this.Qb1(i),
      a = this.Kb1(i);
    for (const s of e)
      if (void 0 !== s) {
        if (0 !== s.DungeonEntranceId) {
          var o = s.DungeonEntranceId,
            n =
              ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
                o,
              );
          if (void 0 !== n) {
            for (const g of n.InstanceDungeonList) r.add(g);
            a.add(o);
          }
        }
        0 !== s.InstanceID && ((n = s.InstanceID), r.add(n));
      }
  }
  DungeonHasDoubleDropTimes(e, t) {
    var i;
    return (
      !(this.HasDoubleDropRestTimes() <= 0) &&
      ((i = this.TT1.get(t)),
      (t = this.bT1.get(t)),
      (i = i?.has(e) ?? !1),
      (t = t?.has(e) ?? !1),
      i || t)
    );
  }
  LevelPlayHasDoubleDropTimes(e, t) {
    return !(this.HasDoubleDropRestTimes() <= 0 || !this.RT1.get(t)?.has(e));
  }
  GetDungeonDoubleDropTuple(e) {
    return this.DungeonHasDoubleDropTimes(e, 21)
      ? ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(
          21,
        )
      : this.DungeonHasDoubleDropTimes(e, 7)
        ? ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(
            7,
          )
        : [!1, 0, 0, "Reward_doubling_end", "PrefabTextItem_2334179570_Text"];
  }
  GetLevelPlayDoubleDropTuple(e) {
    return this.LevelPlayHasDoubleDropTimes(e, 21)
      ? ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(
          21,
        )
      : this.LevelPlayHasDoubleDropTimes(e, 7)
        ? ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(
            7,
          )
        : [!1, 0, 0, "Reward_doubling_end", "PrefabTextItem_2334179570_Text"];
  }
  GetDetectionDoubleDropTuple(e) {
    let t = 0,
      i = 0;
    return (
      7 === e &&
        ((t =
          ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropRestTimes(
            2,
          )),
        (i =
          ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropMaxTimes(
            2,
          ))),
      21 === e &&
        ((t =
          ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropRestTimes(
            1,
          )),
        (i =
          ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropMaxTimes(
            1,
          ))),
      [
        0 < t,
        t,
        i,
        0 < t ? "Reward_doubling_time" : "Reward_doubling_end",
        "PrefabTextItem_2334179570_Text",
      ]
    );
  }
  CalculateRegressCultivateReachTaskCount(e) {
    let t = 0;
    for (const r of e) {
      var i = r.Config.Id;
      0 !==
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(
          i,
        ) && ++t;
    }
    return t;
  }
  GetRegressCultivateLoopSvDataList() {
    var e = this.ActivityData.GetRegressTaskListByType(2),
      t = [];
    if (e)
      for (const r of e) {
        var i = { Config: r };
        t.push(i);
      }
    return (
      t.sort((e, t) => {
        var i =
            ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(
              e.Config.Id,
            ),
          r =
            ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(
              t.Config.Id,
            );
        return 1 === i && 1 !== r
          ? -1
          : (1 === r && 1 !== i) || (2 === i && 2 !== r)
            ? 1
            : 2 === r && 2 !== i
              ? -1
              : e.Config.Id - t.Config.Id;
      }),
      t
    );
  }
  GetRegressCultivateTaskRewardItemDataList(e) {
    var [e, t] = this.GetDropPreviewRewardTupleForPreview(e.TargetReward),
      i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
    return (
      i ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ActivityRecall",
            63,
            "回流活动-ActivityRecallModel.GetRegressCultivateTaskRewardItemDataList()->",
            ["问卷调查奖励的掉落包预览道具配置不存在, itemId:", e],
            ["itemConfig:", i],
          )),
      [{ IncId: 0, ItemId: e ?? 0 }, t]
    );
  }
  GetQuestionRewardPreviewItemInfo(e) {
    var [t, i] = this.GetDropPreviewRewardTupleForPreview(e.Reward),
      r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
    return r
      ? {
          ItemInfo: r,
          ItemCount: i,
          RewardState: this.ActivityData.GetQuestionnaireRewardState(e.Id),
        }
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ActivityRecall",
            63,
            "回流活动-ActivityRecallModel.GetQuestionRewardPreviewItemInfo()->",
            ["问卷调查奖励的掉落包预览道具配置不存在, itemId:", t],
            ["itemConfig:", r],
          ),
        { ItemCount: 0, RewardState: 0 });
  }
  GetRegressQuestionnaireRewardDataList(e) {
    var t =
        ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(
          e,
        ),
      i = [],
      r =
        new ActivityRegressQuestionnaireItemData_1.ActivityRegressQuestionnaireItemData();
    return (
      (r.Type = e),
      (r.ItemData = this.GetQuestionRewardPreviewItemInfo(t)),
      i.push(r),
      i
    );
  }
  GetRegressMainTaskScoreRewardGridDataArr() {
    var e = [];
    for (const i of ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(
      this.Grade,
    ) ?? []) {
      var t =
        new ActivityRegressDefine_1.ActivityRegressTaskScoreRewardGridData();
      (t.Config = i),
        (t.RewardState =
          ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskScoreRewardState(
            i,
          )),
        e.push(t);
    }
    return e;
  }
  GetRegressMainTaskGridDataGroupByTypeAndSortedArr() {
    var e = [];
    return this.Xh1(e, 0), this.Xh1(e, 1), e;
  }
  Yh1(e) {
    e.sort((e, t) => {
      return (
        this.ActivityData.GetTaskSortPriority(e.Id) -
        this.ActivityData.GetTaskSortPriority(t.Id)
      );
    });
  }
  Xh1(e, t) {
    var i = this.ActivityData.GetRegressTaskListByType(t);
    if (void 0 !== i) {
      var r = new ActivityRegressTaskDefine_1.ActivityRegressTaskDynamicData();
      (r.ItemType = 0), (r.TaskType = t), e.push(r), this.Yh1(i);
      for (const o of i) {
        var a =
          new ActivityRegressTaskDefine_1.ActivityRegressTaskDynamicData();
        (a.ItemType = 1), (a.TaskType = t), (a.Config = o), e.push(a);
      }
    }
  }
  GetRegressTaskRewardItemInfo(e) {
    var [t, i] = this.GetDropPreviewRewardTupleForPreview(e.TargetReward),
      r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
    return r
      ? {
          ItemInfo: r,
          ItemCount: i,
          RewardState: this.ActivityData.GetTaskRewardState(e.Id),
        }
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ActivityRecall",
            63,
            "回流活动-ActivityRegressModel.GetRegressTaskRewardItemInfo()->",
            ["回归任务的奖励掉落包预览道具不存在, itemId:", t],
            ["itemConfig:", r],
          ),
        { ItemCount: 0, RewardState: 0 });
  }
  GetRegressScoreRewardInfoList(e) {
    var t = e.Drop,
      t =
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
          t,
        ).DropPreview,
      i = [];
    if (0 < t.size)
      for (var [r, a] of t) {
        var o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(r);
        void 0 !== o
          ? i.length < 2 &&
            i.push({
              ItemInfo: o,
              ItemCount: a,
              RewardState: this.ActivityData.GetRegressTaskScoreRewardState(e),
            })
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "ActivityRecall",
              63,
              "回流活动-ActivityRecallModel.GetRegressScoreRewardInfoList()->回归任务的积分奖励的掉落包预览道具不存在",
              ["itemId:", r],
              ["itemCount:", a],
              ["RegressBonusReward", e.Id],
            );
      }
    else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "ActivityRecall",
          63,
          "回流活动-ActivityRecallModel.GetRegressScoreRewardInfoList()->回归任务的积分奖励配置异常，请检查积分奖励|RegressBonusReward配置!",
        );
    return i;
  }
  GetFirstUnFinishMainQuestId() {
    return ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(1)
      ?.Id;
  }
  GetFirstShowRoleQuest() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByType(3);
    e.sort((e, t) => {
      var i =
          ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
            e.MainTypeId,
          ),
        r = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
          t.MainTypeId,
        );
      return i && r
        ? i.SortValue !== r.SortValue
          ? i.SortValue - r.SortValue
          : e.Id - t.Id
        : 0;
    });
    for (const t of e) if (t.CanShowInUiPanel()) return t;
  }
  get ActivityRecallFirstShow() {
    var e, t;
    return (
      void 0 === this.Kh1 &&
        ((e = LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .ActivityRecallWatchFirstShowTime,
        )),
        (t = this.ActivityData.EndShowTime),
        (this.Kh1 = void 0 === e || e < t)),
      this.Kh1
    );
  }
  set ActivityRecallFirstShow(e) {
    var t;
    this.Kh1 !== e &&
      (e ||
        ((t = this.ActivityData.EndShowTime),
        LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .ActivityRecallWatchFirstShowTime,
          t,
        )),
      (this.Kh1 = e));
  }
  SetFirstShowChecked() {
    this.ActivityRecallFirstShow &&
      !this.Vb1 &&
      (this.ActivityData.ResetShopRemindRedDot(),
      this.ActivityData.ResetQuestionnaireRedDot(),
      this.ActivityData.ResetDoubleDropFirstRedDot(),
      (this.Vb1 = !0)),
      (this.ActivityRecallFirstShow = !1);
  }
  get IsActivityRecallReady() {
    return 0 !== this.ActivityId && void 0 !== this.ActivityData;
  }
  IsMainLineTaskFinish(e) {
    let t = !0;
    for (const r of e.ArgId) {
      var i = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(r);
      t = t && i;
    }
    return t;
  }
  GetFirstUnFinishTask(e) {
    for (const i of e.ArgId) {
      var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i);
      if (0 !== t && 3 !== t) return i;
    }
  }
  GetGachaRoleId(e) {
    return this.GetValidGachaPool(e).PreviewIdList[0];
  }
  GetGachaTrialRoleId(e) {
    e = this.GetGachaRoleId(e);
    return ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e)
      .TrialId;
  }
  GetRoleConfigByGachaId(e) {
    e = this.GetGachaRoleId(e);
    return ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e);
  }
  GetShopGoodsMaxDiscount() {
    var [e, t] = this.ActivityData.GetShopIdAndTabIndex(),
      e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(e, t);
    let i = 0;
    if (void 0 !== e)
      for (const r of e) r.HasDiscount() && (i = Math.max(i, r.GetDiscount()));
    return i;
  }
}
exports.ActivityRegressModel = ActivityRegressModel;
//# sourceMappingURL=ActivityRegressModel.js.map
